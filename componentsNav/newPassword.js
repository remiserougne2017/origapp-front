import React, {useState} from 'react';
import {View, TextInput, Text, Button, ImageBackground, StyleSheet, TouchableOpacity, Image,AsyncStorage } from 'react-native';
import { useTheme } from 'react-navigation';
import { set } from 'react-native-reanimated';
import { withNavigation } from 'react-navigation';
import {connect} from 'react-redux';
import color from './color';
import Ip from './Ip'; // A enlever en production;
//import {TextField, FilledTextField, OutlinedTextField} from 'react-native-material-textfield'; // Module pour gérer les inputs
//import {Button, Input, Text} from 'react-native-elements';

function newPassword(props) {

  const [placeholder,setPlaceholder]=useState('email')
  const [inputValue,setInputValue]=useState('')
  const [email,setEmail]=useState(' ');
  const [error,setError]=useState('')
  const [step,setStep]=useState(0)
  const [isOk,setIsOk] =useState(false)
  const text0="Saisissez l'e-mail de votre compte"
  const text1="Saisissez le code que vous avez reçu dans votre boîte mail"
  const text2="Saisissez votre nouveau mot de passe"


  const nextForm = async (step)=>{
 
        if(step==0){
            setEmail(inputValue)
   
            var codeTmpBack = await fetch(`${Ip()}/users/newPwd/${step}`,
            {
              method: 'POST',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              body: `email=${inputValue}`
            })
            var resultJson = await codeTmpBack.json()
        
            if(resultJson.result=='ok'){
                setPlaceholder("code")
                setInputValue('')
                setStep(step+1)
            }else{
                setError(resultJson.result)
            }
        }else if(step==1){
            var checkCode = await fetch(`${Ip()}/users/newPwd/${step}`,
            {
              method: 'POST',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              body: `code=${inputValue}&email=${email}`
            })
            var resultJson = await checkCode.json()
    
            if (resultJson.result =='ok'){
                setStep(step+1)
                setInputValue('')
                setPlaceholder("nouveau mot de passe")
            }else{
                setError(resultJson.result)
            }
        }else if(step==2){
            var newP = await fetch(`${Ip()}/users/newPwd/${step}`,
            {
              method: 'POST',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              body: `pwd=${inputValue}&email=${email}`
            })
            var resultJson = await newP.json()
    
            if(resultJson.result !='ko'){
                AsyncStorage.setItem("token", resultJson.token)
                props.addToken(resultJson.token)
                props.addPrenom(resultJson.firstName)
                props.navigation.navigate('Home')
            }else{
                setError(resultJson.error)
            }
        }
    }
    return(
       <ImageBackground source={require('../assets/origami.png')} style={styles.container}>
            <View style={{ flexDirection:"column",width:'80%', marginBottom:50,}}>

                <View style={{ flexDirection:"row", marginBottom:50}}>
                    <Image
                        style={{width: 100, height: 100}}
                        source={require('../assets/logoOrigapp.png')}
                        />
                    <Text style={{ marginTop:25,marginLeft:5, fontSize:32, fontWeight:"500"}} >OrigApp</Text>
                </View>
                    
                <Text style={{textAlign:'center', fontWeight:'bold',marginBottom:20}}>Réinitialisation du mot de passe</Text>   
                <Text style={{padding:5}}>{step==0?text0:step==1?text1:step==2?text2:null}</Text>  
                <TextInput 
                    placeholder={placeholder}
                    placeholderTextColor='black'
                    value={inputValue}
                    onChangeText={(value)=>{setInputValue(value);setError('')}}
                    style={{borderBottomColor: '#000000',borderBottomWidth: 1,marginTop:10,paddingHorizontal:5}}
                />
                {setError!=""?<Text style={{padding:5,marginBottom:20,color:'red'}}>{error}</Text>:null}
                <Button color={color('red')} title='Valider' onPress={()=>{nextForm(step)}} ></Button>
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

  function mapDispatchToProps(dispatch){
    return {
      addToken: function(token){
        dispatch({type: 'addToken', token: token})
      },
      addPrenom: function(prenom){
        dispatch({type: 'addPrenom', prenom: prenom})
      }
    }
  };

 

    export default withNavigation(connect(null,mapDispatchToProps)(newPassword))