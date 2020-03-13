import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput, Image, ImageBackground,AsyncStorage,TouchableOpacity} from 'react-native';
import { Button,Input, Avatar, Icon, Header,Overlay} from 'react-native-elements';
import {connect} from 'react-redux';
import color from './color';
import Ip from './Ip'; // A enlever en production;
import {showMessage, hideMessage } from "react-native-flash-message";


function  Parameters(props) { 
  /// recup identité user du store
const [username, setUsername]= useState(props.prenom)
const [isVisible,setIsVisible] =useState(false)
const [pwd1,setPwd1]=useState("")
const [pwd2,setPwd2]=useState("")
const [oContactVisible, setOContactVisible]=useState(false)
const [editableText, setEditableText] = useState(false)
const [newName, setNewName]=useState("")


console.log("PRenom",username,props.prenom)
//////////////////// CLICONTACT
var clickContact = () => {
  setOContactVisible(!oContactVisible);
   }

console.log("WHO",props.prenom,props.token)
//Function SendNEwName
const sendNewName = async ()=>{
  setEditableText(false)
  var response = await fetch(`${Ip()}:3000/users/updateUser/${props.token}`,{
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `name=${newName}`
  })
  var resp = await response.json()
  console.log("HEHE",resp)
  if(resp.result=='ok'){
    //reducer
    props.addPrenom(newName)
    //MAJ du hook
    setUsername(newName)
    //MAJ localStorage
    AsyncStorage.setItem("prenom",newName)
  }else{
    console.log("else")
  }
  showMessage({
    message: resp.mess,
    type: resp.type,
    icon:"auto",
    backgroundColor:"#8FB2C9"
  });
  
}

var clickLogOut = () => {
  AsyncStorage.removeItem("token")
  AsyncStorage.removeItem("prenom")
  console.log("func clickLogOUt")
  props.deleteToken()
  props.deletePrenom()
  props.navigation.navigate('SignIn') }

//Fetch update PWD
const updatePwd= async () =>{
  const dataUser = await fetch (`${Ip()}:3000/users/update/${props.token}`,
  {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `pwd1=${pwd1}&pwd2=${pwd2}`
  })
  let resp = await dataUser.json()
  console.log("ResultUpdate",resp)
   if(resp.result=="ok"){
    showMessage({
      message: resp.mess,
      type: resp.type,
      icon:"auto",
      backgroundColor:"#8FB2C9"
    });
   }else{
    showMessage({
      message: resp.mess,
      type:"info",
      icon:"auto",
      backgroundColor:"#8FB2C9"
    });
   };
   setIsVisible(false)
}
//Overlay update PWd

const OverlayUpdatePwd = (bool)=>{
console.log('Overlay updtae',bool)
  return(
    // <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Overlay height={350} isVisible={bool} containerStyle={{justifyContent:"center", alignItems:"center"}}>
        <View style={{flex:3,justifyContent:"flex-start",
         alignItems:"center",marginTop:50}}>
          <TextInput 
          placeholder="Saisir un nouveau mot de passe"
          onChangeText={(value)=>{setPwd1(value)}}
          style={{padding:10,borderBottomColor: '#000000',
          borderBottomWidth: 1}}
          // Value=
          />
          <TextInput 
          placeholder="Confirmation du mot de passe"
          onChangeText={(value)=>{setPwd2(value)}}
          style={{padding:10,marginTop:50,borderBottomColor: '#000000',
          borderBottomWidth: 1,}}/>
          </View>
        <View style={{flex:1,flexDirection:"row", justifyContent:"space-around"}}>
          <Button buttonStyle={{backgroundColor:color("blue")}}
          title="Annuler" onPress={()=>{setIsVisible(false)}}></Button>
          <Button buttonStyle={{backgroundColor:color("blue")}}
           title="Envoyer" onPress={()=>{updatePwd()}}></Button>
        </View>       
      </Overlay>
    // </View>
  )
}





const OverlayContact = (bool)=>{
  console.log('Overlay contact bool',bool)
  return(
    // <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Overlay height={170} isVisible={bool} containerStyle={{justifyContent:"center", alignItems:"center"}}>
        <View style={{flex:1,justifyContent:"flex-start",
         alignItems:"center",marginTop:50}}>
           <Text style={{marginBottom : 15}}>
             Contact : remiserougne@gmail.com
           </Text>                                              
           <Button
            onPress={() => { clickContact() ; 
              console.log("bouton ok c'est noté, overlay set à not visble")}
          }
            
            title="  C'est noté!"
            type="outline"
            titleStyle={{color: "black"}}
            style={{marginRight: 0, marginLeft: "auto" }}
           />
         </View>
      </Overlay>

  )}
// RETURN GLOBAL DE LA PAGE

    return (
      <TouchableOpacity style={{flex:1}}
      onPress={()=>{editableText?(setEditableText(false),setNewName(props.prenom)):null}}>
  <View style={{flex:1}}>
  
 <View style={{flex:2,width:"100%", backgrounColor: "white"}}>
      <Header
          statusBarProps={{ barStyle: 'light-content' }}
          barStyle="light-content" // or directly
          leftComponent={{ icon: 'settings', type:'feather', color:'#fff', size: 50 }}
          centerComponent={{ text: 'Paramètres', style: { color: '#fff', fontSize:25, fontWeight:"800" } }} ///
          containerStyle={{
            backgroundColor: color("red"),
            // marginTop:40,
            paddingBottom: 40,
            paddingLeft: 40,
            paddingTop: 40,
            paddingLeft: 40
          }}
        />  
        <View style={{flex:1,flexDirection: 'row', justifyContent: 'flex-end', alignItems:"flex-start"}}>
          <Button    
            // titleStyle={{paddingHorizontal:10}}
            title="  Se déconnecter"
            type="clear"
            titleStyle={{paddingRight:10, color: "black"}}
            style={{marginRight: 5, marginLeft: "auto"}}
            onPress={() => {clickLogOut()}}
            icon={   
              <Icon 
              name= "logout" type='antdesign'  color= "black" size= {20}
              iconContainerStyle={{marginLeft:10}}
              />
            }
            iconRight
            />
        </View>
       {OverlayUpdatePwd(isVisible)}                              
       {OverlayContact(oContactVisible)}
      <View style={{flex:2,flexDirection: 'row',justifyContent: "flex-start", alignItems:"center"}}>
      {/* <View style={{flexDirection: 'column', justifyContent: "flex-start", alignItems:"center"}}> */}
        <Icon 
              name= 'user'
             type= 'font-awesome'
             size={80}
             containerStyle={{marginLeft:10,marginRight:10}}
        />
        <View style={{flexDirection: 'column', justifyContent: "center", marginTop:20}}>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity  onPress={()=>{console.log("onPressEdit");setEditableText(true)}}>
            <TextInput 
            editable={editableText}
            style={{fontSize:20, fontWeight:"700", marginLeft:0,paddingHorizontal:10}}
            onChangeText={(value)=>{setNewName(value)}}
            value={newName}
            >
            </TextInput>
            </TouchableOpacity>
            {editableText==true?<Icon name="rightcircleo" type="antdesign"
            containerStyle={{marginLeft:30}}
            onPress={()=>{console.log('icon press');sendNewName()}}
            />:null}
          </View>         
          <Text style={{marginLeft: 0, fontSize:12,marginTop:10}}
          onPress={()=>{setIsVisible(true)}}
          >Changer mon mot de passe</Text>
        </View>
        
      </View> 
    {/* <View style={{flex:1,width:"100%"}}> */}
      <View style={{flex:3,flexDirection: 'column',width:"100%",height:"100%",flexWrap:"wrap",
       justifyContent:"flex-end",alignItems:"flex-start", marginTop: 100}}>     
        {/* <View style={{flexDirection:'row', justifyContent:"flex-start"}}> */}
          <Button  onPress={() => console.log("demande d'aide")}
            icon={   
                  <Icon name="help-circle" type='feather'
                  color= "black" size= {20}
                  />
            } 
              title="Aide"
              titleStyle={{color:"black",paddingLeft:5}}
              style={{marginRight: 0,marginLeft: "auto"}}
              buttonStyle={{backgroundColor:"transparent"}}
            />
       
        <View style={{flexDirection:'row',justifyContent:"space-between"}}>
          <Button
            icon={   
                <Icon 
                name="group" type='fontawesome' 
                color= "black" size= {20}
                onPress={() => console.log("voir les credits")}
                />
          } 
            
            title="Crédits"
            type="transparent"
            titleStyle={{paddingLeft:5,color: "black"}}
            style={{marginRight: 0, marginLeft: "auto"}}
            
          /> 
          
          <Button
          containerStyle={{marginRight:"auto"}}
            icon={   
                <Icon 
                iconRight
                name= "send" type='feather'  color= "black" size= {20}
                
                />
          } 
            title="Nous contacter"
            type="transparent"
            titleStyle={{color: "black",paddingLeft:5}}   
            onPress={() => { clickContact() ; console.log("contact")}}
          />
        </View>   
      </View>
    </View>
    
  </View> 
  {/* fin balise englobante */}
  </TouchableOpacity>
    );
  }

  function mapStateToProps(state){
    
    return {token:state.reducerToken, 
            prenom:state.reducerPrenom};
    }

  function mapDispatchToProps(dispatch){
    return {
          deleteToken: function(){
            dispatch({type: 'deleteToken'})
          },
          deletePrenom: function(){
            dispatch({type: 'deletePrenom'})
          },
          addPrenom: function(prenom){
            dispatch({type: 'addPrenom', prenom: prenom})
       }
  }};
  


export default connect(mapStateToProps,mapDispatchToProps)(Parameters)