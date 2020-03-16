import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, Button, ImageBackground, StyleSheet,
   TouchableOpacity, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {Input} from 'react-native-elements';
import {connect} from 'react-redux';
import Loader from './loader';
import { withNavigationFocus } from 'react-navigation';
import Ip from './Ip' // A enlever en production !


function SignUp(props) {
  
  const [signUpFirstName, setSignUpFirstName] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpPasswordMatch, setSignUpPasswordMatch] = useState('')
  const [errorMatch, setErrorMatch] = useState('')
  const [errorUserExistant, setErrorUserExistant] = useState('')
  const [errorChampVide, setErrorChampVide] = useState('')
  const [errorEmailInvalide, setErrorEmailInvalide] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [loader,setLoader]=useState(false);
  
  const [prenomExists, setPrenomExists]= useState(null)
  const [loading,setLoading]=useState(false);

  var tokenExists

  useEffect(() => {
    AsyncStorage.getItem("token", function(error, data) {

      tokenExists = data
      setLoading(true)
    });
    AsyncStorage.getItem("prenom", function(error, data) {
      console.log(data)
      setPrenomExists(data)

    });
}, [props.isFocused])

 
 var formSignUp
 console.log("TOKEN??",tokenExists)
 if(tokenExists == undefined){
  //<Loader bool={loader} text="Chargement"/>
 formSignUp = <View>
                <View style={{marginBottom:20}}>
                  <Input
                  //style = {{borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
                  placeholder=' Prénom'
                  onChangeText={(val) => setSignUpFirstName(val)}
                  value={signUpFirstName}
                  />
                { errorChampVide ? <Text style={{fontSize:12,color:'red'}}>{errorChampVide}</Text> : null }
                </View>

                <View style={{marginBottom:20}}>
                  <Input
                  //style = {{borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
                  placeholder=' Email'
                  onChangeText={(val) => setSignUpEmail(val.toLowerCase())}
                  value={signUpEmail}
                  />
                  { errorUserExistant ? <Text style={{fontSize:12,color:'red'}}>{errorUserExistant}</Text> : null }
                  { errorEmailInvalide ? <Text style={{fontSize:12,color:'red'}}>{errorEmailInvalide}</Text> : null}
                  { errorChampVide ? <Text style={{fontSize:12,color:'red'}}>{errorChampVide}</Text> : null }
                </View>

                <View style={{marginBottom:20}}>
                  <Input
                  //style = {{borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
                  placeholder=' Mot de passe'
                  secureTextEntry={true}
                  onChangeText={(val) => setSignUpPassword(val)}
                  value={signUpPassword}
                  />
                  { errorPassword ? <Text style={{fontSize:12,color:'red'}}>{errorPassword}</Text> : null }
                  { errorChampVide ? <Text style={{fontSize:12,color:'red'}}>{errorChampVide}</Text> : null }
                </View>

                <View >
                  <Input
                  //style = {{borderWidth : 1.0, borderColor: 'white',  borderRadius: 5, backgroundColor: 'white'}}
                  secureTextEntry={true}
                  placeholder=' Confirmation de mot de passe '
                  onChangeText={(val) => setSignUpPasswordMatch(val)}
                  value={signUpPasswordMatch}
                  />
                  { errorMatch ? <Text style={{fontSize:12,color:'red'}}>{errorMatch}</Text> : null }
              
                  <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
                  <Text style={{fontSize: 11, marginBottom: 18, textAlign: "right", fontStyle: "italic"}}>J'ai déjà un compte</Text>
                </TouchableOpacity>
                </View>

              
                <Button
                title='Inscription'
                color='#FF473A'
                onPress={() => clickSignUp(signUpFirstName, signUpEmail, signUpPassword, signUpPasswordMatch) }
                />  
              </View>
} else{
  console.log("ELSE!!!",tokenExists)
  formSignUp = 
  <View style={{flexDirection:"row"}}>
     <Button
      title='Bienvenue !'
      color='#FF473A'
      onPress={() =>{props.navigation.navigate('Home')}}
      />
  </View>
 
  props.addToken(tokenExists)
  props.addPrenom(prenomExists)
  props.navigation.navigate('Home')
}

    var clickSignUp = async (a, b, c, d) => {

      setSignUpFirstName('')
      setSignUpEmail('')
      setSignUpPassword('')
      setSignUpPasswordMatch('')
  
      setLoader(true)
  
      if(signUpPassword !== signUpPasswordMatch){
        setErrorMatch("Les mots de passe ne sont pas identiques")
  
      } else {
        const data = await fetch(`${Ip()}:3000/users/sign-up`, {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `firstName=${signUpFirstName}&email=${signUpEmail}&password=${signUpPassword}`
        })
        const response = await data.json()
        if(Object.keys(response).length != 0){
          setErrorEmailInvalide(response.error.emailNotValid)
          setErrorUserExistant(response.error.email)
          setErrorChampVide(response.error.emptyField)
          setErrorPassword(response.error.passwordNotValid)
        }
  
        if(response.result == true){
          console.log("??????",response.result)
          AsyncStorage.setItem("token", response.token)
          AsyncStorage.setItem("prenom", response.prenom)
          props.addToken(response.token)
          props.addPrenom(response.prenom)
          setLoader(false)
          props.navigation.navigate('Home')
        } else {
          console.log('pas de token')
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

              {formSignUp}

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

function mapStateToProps(state) {
    return { storeLibrairy: state.storeLibrairy,
             token: state.reducerToken
     }
  }
  export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(SignUp))
  
 