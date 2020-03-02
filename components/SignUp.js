import React from 'react';
import { View, TextInput, Text, Button, ImageBackground, StyleSheet } from 'react-native';
//import {Button, Input, Text} from 'react-native-elements';

export default function SignUp() {

    return(
       <ImageBackground source={require('../assets/origami.png')} style={styles.container}>
           <View>
            <TextInput
            style = {{marginBottom: 25, borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
            inputStyle={{marginLeft: 10}}
            placeholder=' Prénom'
            
            />

            <TextInput
            style = {{marginBottom: 25, borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
            inputStyle={{marginLeft: 10}}
            placeholder=' Email'
            
            />

            <TextInput
            style = {{marginBottom: 25, borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
            inputStyle={{marginLeft: 10}}
            placeholder=' Mot de passe'
            />

            <TextInput
            style = {{marginBottom: 25, borderWidth : 1.0, borderColor: 'white',  borderRadius: 5, backgroundColor: 'white'}}
            inputStyle={{marginLeft: 10}}
            placeholder=' Confirmation de mot de passe '
            />

            <Text>J'ai déjà un compte</Text>

            <Button
             title='Inscription'
             color='#FF473A'
            />
            </View> 
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //resizeMode: 'cover',
      width: 500,
      height: 850,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });