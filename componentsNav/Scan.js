import React, {useRef, useState, Component} from 'react';
import {Text, View, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import { withNavigationFocus } from 'react-navigation';
import { Button, Icon  } from 'react-native-elements';
import color from './color'

function Scan(props) {
    
var camera = useRef(null);
const [hasPermission, setHasPermission] = useState(null);
const [type, setType] = useState(Camera.Constants.Type.back);

    //Permission demandée au click sur le bouton
const askPermission =async() => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        };

console.log("type?",type)
console.log("PERMISSION?",props.isFocused,hasPermission)
//Fonction fetch pour poster photo au backend

const sendPicture = async (path)=>{
    
    var data = new FormData();
    data.append('picture', {
      uri:path,
      type:"image/jpg",
      name: `ScanUser`
    });
    console.log("PATH DATA",data)
    //envoi au backend pour enregistrer sur cloudinary
   var response = await fetch("http://10.2.5.203:3000/home/scan",
    {
      method: 'POST',
      body: data
    });  
  
     var res = await response.json()
     console.log("reponse du fetch",res)
       
  }

if(props.isFocused && hasPermission) {
    console.log('CAMERA!')
    var Cam          
        Cam = <Camera style={{flex:1,justifyContent:"center",alignItems:"center"}}
            // ratio="16:9"
            ref={ref => (camera = ref)}
            type={type} 
            ></Camera>
    return (
    <View style={{ flex: 1, alignItems:'center'}}>
        <View style={{height:100,width:"100%",backgroundColor:color("red"),justifyContent:"center",alignItems:'center'}}>
            <Text style={{marginTop:40, color:"white", fontSize:18,fontWeight:"700"}}>
                Scannez l'image de couverture
                </Text>
        </View>
        <View style={{flex:1,width: '100%', height: '100%'}}>
            {Cam}
            <Button  
        onPress={async () => {
        
            if (camera) {
            let photo = await camera.takePictureAsync({
              quality : 0.7,
              base64: true,
              exif: true
                }); 
            console.log("photo?",photo.uri)
            sendPicture(photo.uri)

            };
        }}
          title="Déclencher" buttonStyle={{width: "100%", justifyContent:"center", backgroundColor:color("blue")}}
          containerStyle={{width:"40%", position: "absolute", bottom:50, right:100}}
        icon={
            <Icon
            name="save"
            size={24}
            color="white"
            />}/>           
        </View>
    </View>
);
}else{  
    return (
    <ImageBackground source={require('../assets/origami.png')} style={{flex:1,width: '100%', height: '100%'}}>
        <View style={{ flex: 1, alignItems:'center'}}>
            <View style={{height:100,width:"100%",backgroundColor:color("red"),justifyContent:"center",alignItems:'center'}}>
                <Text style={{marginTop:40, color:"white", fontSize:18,fontWeight:"700"}}>
                    Scannez l'image de couverture
                    </Text>
            </View>
            <View style={{ flex: 1, justifyContent:"center",alignItems:'center'}}>
                <Button onPress={()=>askPermission()}title="Activer l'accès à la caméra" buttonStyle={{backgroundColor:color("blue")}}></Button>
            </View>
        </View>
    </ImageBackground>
        
        );
    }
    
}


export default withNavigationFocus(Scan)