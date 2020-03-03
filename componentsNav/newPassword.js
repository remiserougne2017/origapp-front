import React, {useState} from 'react';
import {View, TextInput, Text, Button, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
//import {TextField, FilledTextField, OutlinedTextField} from 'react-native-material-textfield'; // Module pour gérer les inputs
//import {Button, Input, Text} from 'react-native-elements';

export default function newPassword(props) {
  
    return(
       <ImageBackground source={require('../assets/origami.png')} style={styles.container}>
            <View>

                <View style={{ flexDirection:"row", marginBottom:50}}>
                    <Image
                        style={{width: 100, height: 100}}
                        source={require('../assets/logoOrigapp.png')}
                        />
                    <Text style={{ marginTop:25,marginLeft:5, fontSize:32, fontWeight:"500"}} >OrigApp</Text>
                </View>
                    
                <Text>Lien nouveau mdp</Text>
            
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
