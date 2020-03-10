import React, {useState} from 'react';
import {View, TextInput, Text, Button, ImageBackground, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import {connect} from 'react-redux';
import Loader from './loader';
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


  var clickSignUp = async (a, b, c, d) => {

    setSignUpFirstName('')
    setSignUpEmail('')
    setSignUpPassword('')
    setSignUpPasswordMatch('')

    setLoader(true)
    /* setTimeout(() => {
     setLoader(false)
   }, 2000 ); */

    if(signUpPassword !== signUpPasswordMatch){
      setErrorMatch("Les mots de passe ne sont pas identiques")

    } else {
      console.log('mdp ok')
      const data = await fetch(`${Ip()}:3000/users/sign-up`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `firstName=${signUpFirstName}&email=${signUpEmail}&password=${signUpPassword}`
      })
      console.log('envoyé')
      const response = await data.json()
      if(Object.keys(response).length != 0){
        //Messages d'erreur depuis le Backend
        setErrorEmailInvalide(response.error.emailNotValid)
        setErrorUserExistant(response.error.email)
        setErrorChampVide(response.error.emptyField)
        setErrorPassword(response.error.passwordNotValid)
        console.log(response)
      }

      if(response.result == true){
        props.addToken(response.token)
        props.addPrenom(response.prenom)
        setLoader(false)
        props.navigation.navigate('Home')
      } else {
        console.log('pas de token')
      }
    }
  }
  
  console.log(errorMatch, errorChampVide, errorEmailInvalide)
    return(
      <ImageBackground source={require('../assets/origami.png')} style={styles.container}>
        <Loader bool={loader} text="Chargement"/>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View>
            <View style={{ flexDirection:"row", marginBottom:50}}>
              <Image
                  style={{width: 100, height: 100}}
                  source={require('../assets/logoOrigapp.png')}
                />
              <Text style={{ marginTop:25,marginLeft:5, fontSize:32, fontWeight:"500"}} >OrigApp</Text>
            </View>
            
            <View style={{marginBottom:20}}>
              <TextInput
              style = {{borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
              placeholder=' Prénom'
              onChangeText={(val) => setSignUpFirstName(val)}
              value={signUpFirstName}
              />
             { errorChampVide ? <Text style={{fontSize:12,color:'red'}}>{errorChampVide}</Text> : null }
            </View>

            <View style={{marginBottom:20}}>
              <TextInput
              style = {{borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
              placeholder=' Email'
              onChangeText={(val) => setSignUpEmail(val)}
              value={signUpEmail}
              />
              { errorUserExistant ? <Text style={{fontSize:12,color:'red'}}>{errorUserExistant}</Text> : null }
              { errorEmailInvalide ? <Text style={{fontSize:12,color:'red'}}>{errorEmailInvalide}</Text> : null}
              { errorChampVide ? <Text style={{fontSize:12,color:'red'}}>{errorChampVide}</Text> : null }
            </View>

            <View style={{marginBottom:20}}>
              <TextInput
              style = {{borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
              placeholder=' Mot de passe'
              secureTextEntry={true}
              onChangeText={(val) => setSignUpPassword(val)}
              value={signUpPassword}
              />
              { errorPassword ? <Text style={{fontSize:12,color:'red'}}>{errorPassword}</Text> : null }
              { errorChampVide ? <Text style={{fontSize:12,color:'red'}}>{errorChampVide}</Text> : null }
            </View>

            <View >
              <TextInput
              style = {{borderWidth : 1.0, borderColor: 'white',  borderRadius: 5, backgroundColor: 'white'}}
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
                <Button
             title='nav HomePage'
             color='#FF473A'
             onPress={() =>{props.navigation.navigate('Home');props.addToken("dTsvaJw2PQiOtTWxykt5KcWco87eeSp6")}}
            />
                <Button
             title='nav bookcontnt'
             color='#FF473A'
             onPress={() =>{props.navigation.navigate('BookContent');props.addToken("dTsvaJw2PQiOtTWxykt5KcWco87eeSp6")}}
            />
            <Button
             title='Paramètres'
             color='#FF473A'
             onPress={() =>{ props.navigation.navigate('Parameters');props.addToken("dTsvaJw2PQiOtTWxykt5KcWco87eeSp6");
             props.addPrenom("Rémi")}}
            />  

                <Button
             title='nav mediapage'
             color='#FF473A'
             onPress={() =>{props.navigation.navigate('contentMediaPage');props.addToken("dTsvaJw2PQiOtTWxykt5KcWco87eeSp6")}}
            />
             <Button
             title='RATING'
             color='#FF473A'
             onPress={() =>{props.navigation.navigate('RatingPage');props.addToken("dTsvaJw2PQiOtTWxykt5KcWco87eeSp6")}}
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
      },
      addPrenom: function(prenom){
        dispatch({type: 'addPrenom', prenom: prenom})
      }
    }
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(SignUp)