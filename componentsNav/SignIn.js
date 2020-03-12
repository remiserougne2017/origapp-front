import React, {useState} from 'react';
import {View, Text, Button, ImageBackground, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {connect} from 'react-redux';
import {Input} from 'react-native-elements';
import Loader from './loader';
import color from './color';
import Ip from './Ip'; // a enlever en production !

function SignIn(props) {
  
  
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [errorChampVide, setErrorChampVide] = useState('')
  const [errorEmailInexistant, setErrorEmailInexistant] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [loader,setLoader]=useState(false);
  const [tokenExists, setTokenExists]= useState('');

  AsyncStorage.getItem("token", function(error, data) {
    //console.log(data)
    setTokenExists(data)
  })

  if(tokenExists){
    props.addToken(tokenExists)
    props.navigation.navigate('Home')
  } else {

    var clickSignIn = async (a, b) => {

      //console.log("signin"+a,b)
      setSignInEmail('')
      setSignInPassword('')
  
      setLoader(true)
      /* setTimeout(() => {
       setLoader(false)
     }, 2000 ); */
  
      const data = await fetch(`${Ip()}:3000/users/sign-in`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `email=${a}&password=${b}`
      })
  
      //console.log('envoyé')
      const response = await data.json()
      console.log("RESPONSE",response)
      if(Object.keys(response).length != 0){
        //Messages d'erreur depuis le Backend
        setErrorEmailInexistant(response.error.email)
        setErrorChampVide(response.error.emptyField)
        setErrorPassword(response.error.password)
        //console.log(response.error)
      }
  
      if(response.result == true){
        AsyncStorage.setItem("token", response.token)
        AsyncStorage.setItem("prenom", response.prenom)
        props.addToken(response.token)
        props.addPrenom(response.prenom)
        setSignInPassword('')
        //console.log(response.token)
        setLoader(false)
        props.navigation.navigate('Home')
      } else {
        //console.log('pas de token')
      }
    }

  }


  
    return(
      <ImageBackground source={require('../assets/origami_background.jpg')} style={styles.container}>
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
              <Input
              //style = {{borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
              placeholder=' Email'
              onChangeText={(val) => setSignInEmail(val.toLowerCase())}
              value={signInEmail}
              />
              { errorChampVide ? <Text style={{fontSize:12,color:'red'}}>{errorChampVide}</Text> : null }
              { errorEmailInexistant ? <Text style={{fontSize:12,color:'red'}}>{errorEmailInexistant}</Text> : null }
            </View>

            <View style={{marginBottom: 5}}>
              <Input
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
             color={color('red')}
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