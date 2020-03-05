import React, {useRef, useState, Component} from 'react';
import {Text, View, Button, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import { withNavigationFocus } from 'react-navigation';
import {connect} from 'react-redux';

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



if(props.isFocused && hasPermission) {
    console.log('CAMERA!')
    var Cam          
        Cam = <Camera style={{flex:1,justifyContent:"center",alignItems:"center"}}
            ratio="16:9"
            ref={ref => (camera = ref)}
            type={type} 
            ></Camera>
    return (
    <View style={{ flex: 1, alignItems:'center'}}>
        <View style={{height:100,width:"100%",backgroundColor:"red",justifyContent:"center",alignItems:'center'}}>
            <Text style={{marginTop:40, color:"white", fontSize:18,fontWeight:"700"}}>
                Scannez l'image de couverture
                </Text>
        </View>
        <View style={{flex:1,width: '100%', height: '100%'}}>
            {Cam}
            <Button title="Touch"></Button>
        </View>
    </View>
);
}else{  
    return (
    <ImageBackground source={require('../assets/origami.png')} style={{flex:1,width: '100%', height: '100%'}}>
        <View style={{ flex: 1, alignItems:'center'}}>
            <View style={{height:100,width:"100%",backgroundColor:"red",justifyContent:"center",alignItems:'center'}}>
                <Text style={{marginTop:40, color:"white", fontSize:18,fontWeight:"700"}}>
                    Scannez l'image de couverture
                    </Text>
            </View>
            <View style={{ flex: 1, justifyContent:"center",alignItems:'center'}}>
                <Button onPress={()=>askPermission()}title="Activer l'accès à la caméra"></Button>
            </View>
        </View>
    </ImageBackground>
        
        );
    }
    
}


export default withNavigationFocus(Scan)