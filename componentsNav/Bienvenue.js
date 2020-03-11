import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, Button, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {connect} from 'react-redux';

function Bienvenue(props) {

  useEffect(() => {
    AsyncStorage.getItem("token", function(error, data) {
      console.log(data, 'bienvenue')
      props.addToken(data)
      props.navigation.navigate('Home')
    })
}, [])
  
    return(
       <ImageBackground source={require('../assets/origami.png')} style={styles.container}>
            <View>

                <View style={{ flexDirection:"row", marginBottom:50}}>
                    <Image
                        style={{width: 80, height: 80}}
                        source={require('../assets/logoOrigapp.png')}
                        />
                    <Text style={{ marginTop:25,marginLeft:5, fontSize:32, fontWeight:"500"}} >OrigApp</Text>
                </View>
                    
                <Text style={{fontSize:28}}>Bienvenue!</Text>
            
            </View> 
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      resizeMode: 'cover',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  function mapDispatchToProps(dispatch){
    return {
      addToken: function(token){
        dispatch({type: 'addToken', token: token})
      },
      addPrenom: function(prenom){
        dispatch({type: 'addPrenom', prenom: prenom})
      }
    }
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(Bienvenue)
