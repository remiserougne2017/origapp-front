import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput, Image, ImageBackground,AsyncStorage } from 'react-native';
import { Button,Input, Avatar, Icon, Header} from 'react-native-elements';
/*  import Icon from 'react-native-vector-icons'; */
import {connect} from 'react-redux';
/* import { Ionicons } from '@expo/vector-icons'; */
import color from './color'


 

function  Parameters(props) { 

  /// recup identité user du store
const [username, setUsername]= useState('')

var clickLogOut = () => {
  console.log("func clickLogOUt")
  props.deleteToken()
  props.deletePrenom()
  props.navigation.navigate('SignIn') }

console.log("HELLOOOOOOOOOO TOKEN PARAMETRE",props.token)
  useEffect(() => {
  const findUser = async () => {
    const dataUser = await fetch ('http://192.168.1.12:3000/users/params', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `token=${props.token}`
    });
    let resJson = await dataUser.json()
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", resJson)
    setUsername(resJson.user)
  
  }
findUser()
console.log("useEffect")
},[])

console.log("token user recupere dans store", props.token)
   console.log("NAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAME", username)
// RETURN GLOBAL DE LA PAGE

    return (
      
 <View style={{ flex: 1, width:"100%", backgrounColor: "white", justifyContent: "space-between"}}>
    
                 <View style={{ flexDirection:"row", marginTop:25, backgrounColor: "white"}}>
                 <Image
                 style={{width: 40, height: 40, margin:5}}
                 source={require('../assets/logoOrigapp.png')}
                  />  
                  {/* ORIGAPP */}
                 <Text style={{ marginTop:15,marginLeft:5, fontSize:15, fontWeight:"500"}}>OrigApp</Text>
                  </View>  
                  


                  <View>
                          <Header
                              statusBarProps={{ barStyle: 'light-content' }}
                              barStyle="light-content" // or directly
                              leftComponent={{ icon: 'settings', type:'feather', color:'#fff', size: 50 }}
                              centerComponent={{ text: '   Paramètres', style: { color: '#fff', fontSize:25, fontWeight:"800", fontStyle: "normal", marginTop:15, marginBottom:15 } }} ///
                              containerStyle={{
                                backgroundColor: color("red"),
                                paddingBottom: 40,
                                paddingLeft: 40,
                                paddingTop: 40,
                                paddingLeft: 40
                              }}
                            />


                  </View>
     
      <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
  
                    <Button
                      icon={   
                            <Icon 
                            iconStyle={{iconRight: "true"}}
                            name= "logout" type='antdesign'  color= "black" size= {20}
                            
                            />
                      }
                        
                        title="  Se déconnecter"
                        type="clear"
                        titleStyle={{color: "black"}}
                        style={{marginRight: 0, marginLeft: "auto"}}
                        onPress={() => {
                            console.log("deconnection d'un user");
                            clickLogOut()}}
                      />
            
              </View>
         

      <View style={{flexDirection: 'row', justifyContent: "flex-start"}}>
                 <Avatar 
                      
                      rounded
                      
                      overlayContainerStyle={{backgroundColor: 'transparent'}}
                      icon={{name: 'user', type: 'font-awesome', color: 'black'}}
                      size= {200}
                     
                      activeOpacity={0}
                    /*  containerStyle={{flex: 2, marginLeft: 20, marginTop: 115}} */
                 />

                    <View>
                    <Text style={{fontSize:25, fontWeight:"700", marginLeft:10, marginTop: 50}}>Compte : </Text>
                    <Text style={{fontSize:25, fontWeight:"700", marginLeft:10}}>{username}</Text>
                    <Button style={{marginLeft: 0}} type="transparent" titleStyle={{color: "black", fontSize:10}} title="Changer mon mot de passe"></Button>
                    </View>
      </View>
      

      <View style={{flexDirection: 'row', justifyContent: "flex-start"}}>
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

      </View>

      </View> 
          
      <View style={{flexDirection: 'column', justifyContent: "flex-end", marginTop: 100}}>     



                    <View style={{flexDirection:'row', justifyContent:"flex-start"}}>
                      <Button
                        title="A propos"
                        type="transparent"
                        titleStyle={{color: "black"}}
                        style={{marginRight: 0, marginLeft: "auto"}}
                        
                      />
                  </View>

                    <View style={{flexDirection:'row', justifyContent:"space-between"}}>
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
                       icon={   
                            <Icon 
                            iconStyle={{iconRight: "true"}}
                            name= "send" type='feather'  color= "black" size= {20}
                            onPress={() => console.log("star this book")}
                            />
                      } 
                        
                        title="  Nous contacter"
                        type="transparent"
                        titleStyle={{color: "black"}}
                        style={{marginRight: 0, marginLeft: "auto"}}
                       
                      />
                  </View>
                      
                       </View>


      </View> /// fin balise englobante
    );
  }

  function mapStateToProps(state){
    
    return {token:state.reducerToken, prenom:state.reducerPrenom};
  
  }



  function mapDispatchToProps(dispatch){
    return {


          deleteToken: function(){

            dispatch({type: 'deleteToken'})
          },

          deletePrenom: function(){

            dispatch({type: 'deletePrenom'})
          }



       }
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Parameters)