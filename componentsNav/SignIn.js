import React, {useState} from 'react';
import {View, TextInput, Text, Button, ImageBackground, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import {connect} from 'react-redux';

function SignIn(props) {
  

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [errorChampVide, setErrorChampVide] = useState('')
  const [errorEmailInexistant, setErrorEmailInexistant] = useState('')
  const [errorPassword, setErrorPassword] = useState('')


  var clickSignIn = async (a, b) => {

    console.log("signin"+a,b)
    /* setSignInEmail('')
    setSignInPassword('') */

    const data = await fetch('http://192.168.1.12:3000/users/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `email=${a}&password=${b}`
    })

    //console.log('envoyé')
    const response = await data.json()
    if(Object.keys(response).length != 0){
      //Messages d'erreur depuis le Backend
      setErrorEmailInexistant(response.error.email)
      setErrorChampVide(response.error.emptyField)
      setErrorPassword(response.error.password)
      console.log(response.error)
    }

    if(response.result == true){
      props.addToken(response.token)
      props.addPrenom(response.prenom)
      console.log(response.token)
      props.navigation.navigate('Home')
    } else {
      console.log('pas de token')
    }
  }

  
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

            <View style={{marginBottom: 25}}>
              <TextInput
              style = {{borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
              placeholder=' Email'
              onChangeText={(val) => setSignInEmail(val)}
              value={signInEmail}
              />
              { errorChampVide ? <Text style={{fontSize:12,color:'red'}}>{errorChampVide}</Text> : null }
              { errorEmailInexistant ? <Text style={{fontSize:12,color:'red'}}>{errorEmailInexistant}</Text> : null }
            </View>

            <View style={{marginBottom: 5}}>
              <TextInput
              style = {{borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
              placeholder=' Mot de passe'
              secureTextEntry={true}
              onChangeText={(val) => setSignInPassword(val)}
              value={signInPassword}
              />
              { errorChampVide ? <Text style={{fontSize:12,color:'red'}}>{errorChampVide}</Text> : null }
              { errorPassword ? <Text style={{fontSize:12,color:'red'}}>{errorPassword}</Text> : null }

              <TouchableOpacity onPress={() => props.navigation.navigate('newPassword')}>
              <Text style={{fontSize: 11, marginBottom: 20, textAlign: "right", fontStyle: "italic"}}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
            </View>

            

            <Button
             title='Connexion'
             color='#FF473A'
             onPress={() => {clickSignIn(signInEmail, signInPassword)}}
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
  )(SignIn)