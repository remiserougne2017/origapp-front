import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, Button, ImageBackground, StyleSheet,
   TouchableOpacity, ActivityIndicator,Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';
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
  const [error,setError] = useState({})
  const [errorMatch, setErrorMatch] = useState('')
  const [activity,setActivity]=useState(false)
  // const [errorUserExistant, setErrorUserExistant] = useState('')
  // const [errorChampVide, setErrorChampVide] = useState('')
  // const [errorEmailInvalide, setErrorEmailInvalide] = useState('')
  // const [errorPassword, setErrorPassword] = useState('')
  // const [loader,setLoader]=useState(false);
  
  // const [prenomExists, setPrenomExists]= useState(null)
  // const [loading,setLoading]=useState(false);

  var tokenExists

  useEffect(() => {
    AsyncStorage.getItem("prenom", function(error, data) {
      if(data!=undefined)
      props.addPrenom(data)
    });

    AsyncStorage.getItem("token", function(error, data) {
      tokenExists = data
      
      // setLoading(true)
      if(tokenExists != undefined){
        props.addToken(data)
        props.navigation.navigate('Home')
      }
    });

},[props.isFocused])

 
 var formSignUp
  //<Loader bool={loader} text="Chargement"/>
 formSignUp = <View>
                {activity?<ActivityIndicator size="large" color="#d6d6d6"/>:null }
                <View style={{marginBottom:20}}>
                  <Input
                  //style = {{borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
                  placeholder=' Prénom'
                  onChangeText={(val) =>{setSignUpFirstName(val);setError({})}}
                  value={signUpFirstName}
                  />
                { error.emptyField && signUpFirstName==""? <Text style={{fontSize:12,color:'red'}}>{error.emptyField}</Text> : null }
                </View>

                <View style={{marginBottom:20}}>
                  <Input
                  //style = {{borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
                  placeholder=' Email'
                  onChangeText={(val) =>{setSignUpEmail(val);setError({})}}
                  value={signUpEmail}
                  />
                  { error.userExistant ? <Text style={{fontSize:12,color:'red'}}>{error.userExistant}</Text> : null }
                  { error.invalidMail ? <Text style={{fontSize:12,color:'red'}}>{error.invalidMail}</Text> : null}
                  { error.emptyField && signUpEmail == "" ? <Text style={{fontSize:12,color:'red'}}>{error.emptyField}</Text> : null }
                </View>
                <View style={{marginBottom:20}}>
                  <Input
                  //style = {{borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
                  placeholder=' Mot de passe'
                  secureTextEntry={true}
                  onChangeText={(val) =>{setSignUpPassword(val);setError({})}}
                  value={signUpPassword}
                  />
                  { error.pwdError ? <Text style={{fontSize:12,color:'red'}}>{error.pwdError}</Text> : null }
                  { error.emptyField && signUpPassword =="" ? <Text style={{fontSize:12,color:'red'}}>{error.emptyField}</Text> : null }
                </View>

                <View >
                  <Input
                  //style = {{borderWidth : 1.0, borderColor: 'white',  borderRadius: 5, backgroundColor: 'white'}}
                  secureTextEntry={true}
                  placeholder=' Confirmation de mot de passe '
                  onChangeText={(val) =>{setSignUpPasswordMatch(val);setError({})}}
                  value={signUpPasswordMatch}
                  />
                  { errorMatch ? <Text style={{fontSize:12,color:'red'}}>{errorMatch}</Text> : null }
                  { error.emptyField && signUpPasswordMatch =="" ? <Text style={{fontSize:12,color:'red'}}>{error.emptyField}</Text> : null }
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
// } else{
  // console.log("ELSE!!!",tokenExists)
  // formSignUp = 
  // <View style={{flexDirection:"row"}}>
  //    <Button
  //     title='Bienvenue !'
  //     color='#FF473A'
  //     onPress={() =>{props.navigation.navigate('Home')}}
  //     />
  // </View>
 
//   props.addToken(tokenExists)
//   props.addPrenom(prenomExists)
//   props.navigation.navigate('Home')
// }

    var clickSignUp = async (a, b, c, d) => {
     
      if(signUpPassword !== signUpPasswordMatch){
        setErrorMatch("Les mots de passe ne sont pas identiques")
  
      } else {
          
          setActivity(true)
        const data = await fetch(`${Ip()}/users/sign-up`, {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `firstName=${signUpFirstName}&email=${signUpEmail}&password=${signUpPassword}`
        })
        const response = await data.json()
         
        if(response.result == true){
          AsyncStorage.setItem("token", response.token)
          AsyncStorage.setItem("prenom", response.prenom)
          props.addToken(response.token)
          props.addPrenom(response.prenom)
          props.navigation.navigate('Home')
          setSignUpPassword('')
          setSignUpPasswordMatch('')
          setSignUpFirstName('')
          setSignUpEmail('')
        } else {
         var errorBack ={
          invalidMail :response.error.emailNotValid,
          userExistant : response.error.email,
          emptyField : response.error.emptyField,
          pwdError: response.error.passwordNotValid
         }
        setError(errorBack)
        }
setActivity(false)
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
  
 