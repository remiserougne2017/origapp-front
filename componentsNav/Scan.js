import React, {useRef, useState, Component} from 'react';
import {Text, View, ImageBackground,Image } from 'react-native';
import { Camera } from 'expo-camera';
import { withNavigationFocus } from 'react-navigation';
import { Button, Icon, Overlay  } from 'react-native-elements';
import color from './color';
import Icone from 'react-native-vector-icons/MaterialCommunityIcons';
import Ip from './Ip'; // A enlever en production !;
import Loader from './loader';

function Scan(props) {

var camera = useRef(null);
const [hasPermission, setHasPermission] = useState(null);
const [type, setType] = useState(Camera.Constants.Type.back);
const [flash, setFlash]=useState(Camera.Constants.FlashMode.off);
const [loader,setLoader]=useState(false);
const [isVisible, setIsVisible] = useState(false)


    //Permission demandée au click sur le bouton
const askPermission =async() => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        };
//console.log("type?",type)
console.log("PERMISSION?",props.isFocused,hasPermission)
//Fonction fetch pour poster photo au backend

const sendPicture = async (path)=>{
    //affiche le loader et le coupe si chrgt > à 4 secondes
    setTimeout(() => {
     setLoader(false)
   }, 4000);
    
    var data = new FormData();
    data.append('picture', {
      uri:path,
      type:"image/jpg",
      name: `ScanUser`
    });
    //console.log("PATH DATA",data)
    //envoi au backend pour enregistrer sur cloudinary
   var response = await fetch(`${Ip()}:3000/scan/`, {
      method: 'POST',
      body: data
    });  
     var responseAPI = await response.json()
     console.log(responseAPI)
     if(responseAPI != null){
        setLoader(false)
        props.navigation.navigate('BookContent',{idBook: responseAPI})
     } else if (responseAPI == null){
        setLoader(false)
        setIsVisible(true)
        console.log('12')
        console.log(isVisible)
        console.log('34')
        //alert('Livre inexistant')
     }
}


if(props.isFocused && hasPermission) {
    //console.log('CAMERA!')   
       var Cam = <Camera style={{flex:3,width:"100%"}}
            // ratio="16:9"
            ref={ref => (camera = ref)}
            type={type} flashMode={flash}
            >
            <Icone 
            onPress={() => {
            //console.log("Flash !", flash)
            setFlash(
            flash == Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
                );
            }}
            name='flash'
            type='MaterialCommunityIcons'
            color='white'
            size={24}
            style={{marginTop:30,marginLeft:25}}
            />
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:"auto",marginBottom:30}}>  
            <Image style={{width: 80, height: 80,position:"relative"}} 
                source={require('../assets/orange-1618917_1280.png')}>
            </Image>      
            <Button 
                buttonStyle={{width: "100%", justifyContent:"center",
                position:"absolute",right:10,top:-30,backgroundColor:"transparent",borderRadius:50, padding:30}}
                // containerStyle={{position:"absolute"}} 
                onPress={async () => {
                setLoader(true)
                if (camera) {
                    let photo = await camera.takePictureAsync({
                    quality : 0.7,
                    base64: true,
                        exif: true
                            }); 
                    //console.log("photo?",photo.uri)
                    sendPicture(photo.uri)
                        };
                    }}    
                />     
            </View>
            </Camera>
    return (
    <View style={{ flex: 1, alignItems:'center'}}>
        <Loader bool={loader} text="Recherche du livre"/>
        <View style={{height:100,width:"100%",backgroundColor:color("red"),justifyContent:"center",alignItems:'center'}}>
            <Text style={{marginTop:40, color:"white", fontSize:16,fontWeight:"700"}}>
             Photograhiez la couverture de votre ouvrage
            </Text>
        </View>
       {/* <View style={{flex:1,width:"100%"}}> */}

      
            {Cam}
    
           
        
        {/* <Overlay isVisible={isVisible} width="80%" height={250}>
                           <View style={{flex:5,justifyContent:"center",alignItems:"center"}}>
                                <View style={{flex:1,justifyContent:"center",alignItems:"center",marginTop:50}}>
                                    <Text style={{fontSize:16,textAlign:"center"}}>Aucune correspondance n'a été trouvée</Text>
                                </View>
                            </View>
                            <View style={{flex:1,flexDirection:"row",marginTop:"auto",
                                justifyContent:"space-between"}}>
                                <Button title="Retour au catalogue"
                                buttonStyle={{backgroundColor:color("blue")}}
                                titleStyle={{fontSize:12}}
                                onPress={()=>{setIsVisible(false);props.navigation.navigate('Home')}}></Button>
                                <Button 
                                buttonStyle={{backgroundColor:color("blue")}}
                                titleStyle={{fontSize:12}}
                                title="Reprendre une photo" onPress={()=>{setIsVisible(false)}}></Button>
                            </View> 
                        </Overlay> */}
        {/* </View> */}
    </View>
);
}else{  
    return (
    <ImageBackground source={require('../assets/origami_background.jpg')} style={{flex:1,width: '100%', height: '100%'}}>
        <View style={{ flex: 1, alignItems:'center'}}>
            <View style={{height:100,width:"100%",backgroundColor:color("red"),justifyContent:"center",alignItems:'center'}}>
                <Text style={{marginTop:40, color:"white", fontSize:16,fontWeight:"700"}}>
                    Photograhiez la couverture de votre ouvrage
                    </Text>
            </View>
            <View style={{ flex: 1, justifyContent:"center",alignItems:'center'}}>
                <Button onPress={()=>askPermission()}title="Activer l'accès à la caméra"
                 buttonStyle={{backgroundColor:color("blue")}}></Button>
            </View>
        </View>
    </ImageBackground>
        
        );
    }
    
}


export default withNavigationFocus(Scan)