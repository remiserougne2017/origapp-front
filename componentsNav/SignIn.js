import React, {useState, useEffect} from 'react';
import {View, Text, Button, ImageBackground, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {connect} from 'react-redux';
import {Input} from 'react-native-elements';
import Loader from './loader';
import color from './color';
import Ip from './Ip'; // a enlever en production !
import { withNavigationFocus } from 'react-navigation';

function SignIn(props) {
  
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [emptyMail, setEmptyMail] = useState('');
  const [emptyPwd, setEmptyPwd] = useState('');
  const [errorEmailInexistant, setErrorEmailInexistant] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [loader,setLoader]=useState(false);
  
  var tokenExists
  useEffect(()=>{
    props.deleteToken();
    AsyncStorage.getItem("token", function(error, data) {
    console.log("localSTORE!2",data)
    tokenExists = data
   })
 console.log("TokenExist",tokenExists)
  },[])

  //Function Sign-IN
  const clickSignIn = async (a,b) => {
    setSignInPassword('')
    var data = await fetch(`${Ip()}/users/sign-in`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `email=${a}&password=${b}`
    })

    //console.log('envoyé')
    var response = await data.json()
    console.log("RESPONSE SIGNIN!!!!",response)

    if(response.result == true){
      AsyncStorage.setItem("token", response.token)
      AsyncStorage.setItem("prenom", response.prenom)
      props.addToken(response.token)
      props.addPrenom(response.prenom)
      setSignInPassword('')
      //console.log(response.token)
      setLoader(false)
      props.navigation.navigate('Home')
    } else{
        //Messages d'erreur depuis le Backend
        setErrorEmailInexistant(response.error.email)
        setEmptyMail(response.error.emptyFieldMail)
        setEmptyPwd(response.error.emptyFieldPwd)
        setErrorPassword(response.error.password)
      }
  }

  if(tokenExists != undefined){
    console.log("TOKEN OK tu pars ",tokenExists)
    props.addToken(tokenExists)
    props.navigation.navigate('Home')
  }else{
    console.log("EXIST??? TU RESTES SUR SIGN",tokenExists)
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
              onChangeText={(val) =>{setSignInEmail(val.toLowerCase());setEmptyMail(""),setErrorEmailInexistant('')}}
              value={signInEmail}
              />
              { emptyMail ? <Text style={{fontSize:12,color:'red'}}>{emptyMail}</Text> : null }
              { errorEmailInexistant ? <Text style={{fontSize:12,color:'red'}}>{errorEmailInexistant}</Text> : null }
            </View>

            <View style={{marginBottom: 5}}>
              <Input
              style = {{borderWidth : 1.0, borderColor: 'white', borderRadius: 5, backgroundColor: 'white'}}
              placeholder=' Mot de passe'
              secureTextEntry={true}
              onChangeText={(val) => {setSignInPassword(val);setEmptyPwd('')}}
              value={signInPassword}
              />
              { emptyPwd ? <Text style={{fontSize:12,color:'red'}}>{emptyPwd}</Text> : null }
              { errorPassword ? <Text style={{fontSize:12,color:'red'}}>{errorPassword}</Text> : null }

              <TouchableOpacity onPress={() => props.navigation.navigate('newPassword')}>
              <Text style={{fontSize: 11, marginBottom: 20, textAlign: "right", fontStyle: "italic"}}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
            </View>
            <Button
             title='Connexion'
             color={color('red')}
             onPress={() => {console.log("AI JE CLICK");clickSignIn(signInEmail, signInPassword)}}
            />

            <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={{fontSize: 11, marginTop: 5, fontStyle: "italic"}}>Créer un compte</Text>
            </TouchableOpacity>
           
          </View>
        </KeyboardAvoidingView> 
      </ImageBackground>
    )
  }   
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      // resizeMode: 'cover',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  function mapDispatchToProps(dispatch){
    return {
      addToken: function(token){
        dispatch({type: 'addToken', token: token})
      },
      deleteToken: function(){
        dispatch({type: 'deleteToken'})
      },
      addPrenom: function(prenom){
        dispatch({type: 'addPrenom', prenom: prenom})
      }
    }
  };

  export default withNavigationFocus(connect(null,mapDispatchToProps)(SignIn));