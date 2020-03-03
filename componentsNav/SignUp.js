import React, {useState} from 'react';
import {View, TextInput, Text, Button, ImageBackground, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
//import {TextField, FilledTextField, OutlinedTextField} from 'react-native-material-textfield'; // Module pour gérer les inputs
import {connect} from 'react-redux';

function SignUp(props) {
  
  const [signUpFirstName, setSignUpFirstName] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpPasswordMatch, setSignUpPasswordMatch] = useState('')


  var clickSignUp = async () => {

    if(signUpPassword !== signUpPasswordMatch){
      alert("Les mots de passe ne sont pas identiques")

    } else {
      console.log('mdp ok')
      const data = await fetch('http://192.168.0.11:3000/users/sign-up', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `firstName=${signUpFirstName}&email=${signUpEmail}&password=${signUpPassword}`
      })
      console.log('envoyé')
      const response = await data.json()
      console.log(response)

      if(response.result == true){
        props.addToken(response.token)
      } else {
        console.log('pas de token')
      }

      props.navigation.navigate('homeNav')
    }
  }

  console.log(signUpFirstName)
  console.log(signUpEmail)
  console.log(signUpPassword)
  console.log(signUpPasswordMatch)
  
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
            placeholder=' Prénom'
            onChangeText={(val) => setSignUpFirstName(val)}
            />

            <TextInput
            style = {{marginBottom: 25, borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
            inputStyle={{marginLeft: 10}}
            placeholder=' Email'
            onChangeText={(val) => setSignUpEmail(val)}
            />

            <TextInput
            style = {{marginBottom: 25, borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
            inputStyle={{marginLeft: 10}}
            placeholder=' Mot de passe'
            onChangeText={(val) => setSignUpPassword(val)}
            />

            <TextInput
            style = {{marginBottom: 5, borderWidth : 1.0, borderColor: 'white',  borderRadius: 5, backgroundColor: 'white'}}
            inputStyle={{marginLeft: 10}}
            placeholder=' Confirmation de mot de passe '
            onChangeText={(val) => setSignUpPasswordMatch(val)}
            />

            <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
              <Text style={{fontSize: 11, marginBottom: 20, textAlign: "right", fontStyle: "italic"}}>J'ai déjà un compte</Text>
            </TouchableOpacity>

           
            <Button
             title='Inscription'
             color='#FF473A'
             onPress={() => clickSignUp() }
            />
            
          
      
                
                <Button
             title='nav HomePage'
             color='#FF473A'
             onPress={() => navigation.navigate('Home')}
            />
           
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

function mapDispatchToProps(dispatch){
    return {
      addToken: function(token){
        dispatch({type: 'addToken', token: token})
      }
    }
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(SignUp)