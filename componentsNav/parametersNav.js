import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput, Image, ImageBackground,AsyncStorage } from 'react-native';
import { Button,Input, Avatar, Icon, Header,Overlay} from 'react-native-elements';
/*  import Icon from 'react-native-vector-icons'; */
import {connect} from 'react-redux';
/* import { Ionicons } from '@expo/vector-icons'; */
import color from './color';
import Ip from './Ip'; // A enlever en production;
import {showMessage, hideMessage } from "react-native-flash-message";
import { Value } from 'react-native-reanimated';


function  Parameters(props) { 
  /// recup identité user du store
const [username, setUsername]= useState('')
const [isVisible,setIsVisible] =useState(false)
const [pwd1,setPwd1]=useState("")
const [pwd2,setPwd2]=useState("")
console.log(pwd1)
var clickLogOut = () => {
  console.log("func clickLogOUt")
  props.deleteToken()
  props.deletePrenom()
  props.navigation.navigate('SignIn') }

  useEffect(() => {
  const findUser = async () => {
    const dataUser = await fetch (`${Ip()}:3000/users/logout/${props.token}`);
    let resJson = await dataUser.json()
    setUsername(resJson.user)
  
  }
findUser()
console.log("useEffect")
},[])

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
          <Button title="Annuler" onPress={()=>{setIsVisible(false)}}></Button>
          <Button title="Envoyer" onPress={()=>{updatePwd()}}></Button>
        </View>       
      </Overlay>
    // </View>
  )
}


// RETURN GLOBAL DE LA PAGE

    return (
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
            titleStyle={{paddingRight:10}}
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
      <View style={{flex:2,flexDirection: 'row',justifyContent: "flex-start", alignItems:"center"}}>
      {/* <View style={{flexDirection: 'column', justifyContent: "flex-start", alignItems:"center"}}> */}
        <Icon 
              name= 'user'
             type= 'font-awesome'
             size={80}
             containerStyle={{marginLeft:10,marginRight:10}}
        />
        <View style={{flexDirection: 'column', justifyContent: "center", marginTop:20}}>
          <Text style={{fontSize:20, fontWeight:"700", marginLeft:0}}>{username}</Text>
          <Text style={{marginLeft: 0, fontSize:10}}
          onPress={()=>{console.log("chgt mdp R");setIsVisible(true)}}
          title="e">Changer mon mot de passe</Text>
        </View>
      </View> 
    {/* <View style={{flex:1,width:"100%"}}> */}
      <View style={{flex:3,flexDirection: 'column',width:"100%",height:"100%",flexWrap:"wrap",
       justifyContent:"flex-end",alignItems:"flex-start", marginTop: 100}}>     
        {/* <View style={{flexDirection:'row', justifyContent:"flex-start"}}> */}
          <Button
            icon={   
                  <Icon 
                  iconStyle={{ color: "black"}}
                  name="help-circle" type='feather'  color= "black" size= {20}
                  onPress={() => console.log("demande d'aide")}
                  />
            } 
              title="  Aide"
              type="transparent"
              titleStyle={{color: "black"}}
              style={{marginRight: 0, marginLeft: "auto"}}
              
            />
       
        <View style={{flexDirection:'row',justifyContent:"space-between"}}>
          <Button
            icon={   
                <Icon 
                iconStyle={{ color: "black"}}
                name="group" type='fontawesome'  color= "black" size= {20}
                onPress={() => console.log("voir les credits")}
                />
          } 
            
            title="  Credits"
            type="transparent"
            titleStyle={{color: "black"}}
            style={{marginRight: 0, marginLeft: "auto"}}
            
          /> 
          <Button
          containerStyle={{marginRight:"auto"}}
            icon={   
                <Icon 
                iconStyle={{iconRight: "true"}}
                name= "send" type='feather'  color= "black" size= {20}
                onPress={() => console.log("contact")}
                />
          } 
            title="  Nous contacter"
            type="transparent"
            titleStyle={{color: "black"}}            
          />
        </View>   
      </View>
    </View>
  </View> /// fin balise englobante
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





       }
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Parameters)