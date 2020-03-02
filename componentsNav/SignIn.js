import React, {useState} from 'react';
import {View, TextInput, Text, Button, ImageBackground, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
//import {TextField, FilledTextField, OutlinedTextField} from 'react-native-material-textfield'; // Module pour gérer les inputs
//import {Button, Input, Text} from 'react-native-elements';

export default function SignUp(props) {
  

  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')


  var clickSignIn = async () => {

    console.log("signin")

      /* const data = await fetch('/sign-up', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `firstName=${signUpFirstName}&email=${signUpEmail}&password=${signUpPassword}`
      })
  
      const response = await data.json()
      console.log(response) */ 

      props.navigation.navigate('homeNav')
    }
  

  
  console.log(signUpEmail)
  console.log(signUpPassword)
  
    return(
      <ImageBackground source={require('../assets/origami.png')} style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View>
            <View style={{ flexDirection:"row", marginBottom:50}}>
              <Image
                  style={{width: 100, height: 100}}
                  source={require('../assets/logoOrigapp.png')}
                />
              <Text style={{ marginTop:25,marginLeft:5, fontSize:32, fontWeight:"500"}} >OrigApp</Text>
            </View>

            <TextInput
            style = {{marginBottom: 25, borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
            inputStyle={{marginLeft: 10}}
            placeholder=' Email'
            onChangeText={(val) => setSignUpEmail(val)}
            />

            <TextInput
            style = {{marginBottom: 5, borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
            inputStyle={{marginLeft: 10}}
            placeholder=' Mot de passe'
            onChangeText={(val) => setSignUpPassword(val)}
            />

            <TouchableOpacity onPress={() => props.navigation.navigate('newPassword')}>
              <Text style={{fontSize: 11, marginBottom: 20, textAlign: "right", fontStyle: "italic"}}>Mot de passe oublié ?</Text>
            </TouchableOpacity>

            <Button
             title='Inscription'
             color='#FF473A'
             onPress={() => clickSignIn()}
            />

            <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={{fontSize: 11, marginTop: 5, fontStyle: "italic"}}>Créer un compte</Text>
            </TouchableOpacity>
           
          </View>
        </KeyboardAvoidingView> 
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
