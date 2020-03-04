import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput, Image, ImageBackground,AsyncStorage } from 'react-native';
import { Button,Input, Avatar, Icon, Header} from 'react-native-elements';
/*  import Icon from 'react-native-vector-icons'; */
import {connect} from 'react-redux';
/* import { Ionicons } from '@expo/vector-icons'; */

function Parameters() { 



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
                              centerComponent={{ text: '   Paramètres', style: { color: '#fff', fontSize:25, fontWeight:"800", fontStyle: "bold", marginTop:15, marginBottom:15 } }} ///
                              containerStyle={{
                                backgroundColor: '#990000',
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
                            onPress={() => console.log("star this book")}
                            />
                      }
                        
                        title="  Se déconnecter"
                        type="clear"
                        titleStyle={{color: "black"}}
                        style={{marginRight: 0, marginLeft: "auto"}}
                        /*  onPress={()=> socket.emit("sendMessage", currentMessage);
                        setCurrentMessage("") } */
                      />
            
              </View>
         

      <View style={{flexDirection: 'row', justifyContent: "flex-start"}}>
                 <Avatar 
                      
                      rounded
                      
                      overlayContainerStyle={{backgroundColor: 'clear'}}
                      icon={{name: 'user', type: 'font-awesome', color: 'black'}}
                      size= {200}
                      onPress={() => console.log("Works!")}
                      activeOpacity={0}
                    /*  containerStyle={{flex: 2, marginLeft: 20, marginTop: 115}} */
                 />

                    <View>
                    <Text style={{fontSize:25, fontWeight:"700", marginLeft:10, marginTop: 50}}>Jean</Text>
                    <Text style={{fontSize:25, fontWeight:"700", marginLeft:10}}>Dupont</Text>
                    <Button style={{marginLeft: 0}} type="clear" titleStyle={{color: "black", fontSize:10}} title="Changer mon mot de passe"></Button>
                    </View>
      </View>
      

      <View style={{flexDirection: 'row', justifyContent: "flex-start"}}>
                   <Button
                      icon={   
                            <Icon 
                            iconStyle={{ color: "black"}}
                            name="help-circle" type='feather'  color= "black" size= {20}
                            onPress={() => console.log("star this book")}
                            />
                      }
                        
                        title="  Aide"
                        type="clear"
                        titleStyle={{color: "black"}}
                        style={{marginRight: 0, marginLeft: "auto"}}
                        /*  onPress={()=> socket.emit("sendMessage", currentMessage);
                        setCurrentMessage("") } */
                      />

      </View>

      </View> 
          
      <View style={{flexDirection: 'column', justifyContent: "flex-end", marginTop: 100}}>     



                    <View style={{flexDirection:'row', justifyContent:"flex-start"}}>
                      <Button
                        title="A propos"
                        type="clear"
                        titleStyle={{color: "black"}}
                        style={{marginRight: 0, marginLeft: "auto"}}
                        /*  onPress={()=> socket.emit("sendMessage", currentMessage);
                        setCurrentMessage("") } */
                      />
                  </View>

                    <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                   <Button
                      icon={   
                            <Icon 
                            iconStyle={{ color: "black"}}
                            name="group" type='fontawesome'  color= "black" size= {20}
                            onPress={() => console.log("star this book")}
                            />
                      }
                        
                        title="  Credits"
                        type="clear"
                        titleStyle={{color: "black"}}
                        style={{marginRight: 0, marginLeft: "auto"}}
                        /*  onPress={()=> socket.emit("sendMessage", currentMessage);
                        setCurrentMessage("") } */
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
                        type="clear"
                        titleStyle={{color: "black"}}
                        style={{marginRight: 0, marginLeft: "auto"}}
                        /*  onPress={()=> socket.emit("sendMessage", currentMessage);
                        setCurrentMessage("") } */
                      />
                  </View>
                      
                       </View>


      </View> /// fin balise englobante
    );
  }


  



  export default Parameters;

  {/* <Icon 
                iconRight="true"
                name="log-out-outline"
                size={15}
                color="black"
              /> */}




              {/* <View style={{ flexDirection:"row",justifyContent:"center", alignItems:'center', marginTop:10}}> 
              </View>    //// */}