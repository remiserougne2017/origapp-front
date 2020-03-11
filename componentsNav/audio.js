import React, {useState,useEffect,useRef} from 'react';
import {StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import { Button,Input,Card,Divider,Badge} from 'react-native-elements';
import { Audio } from 'expo-av';
import Ip from './Ip'
// import TrackPlayer from 'react-native-track-player';

const AudioPlay = (props) =>{
    
    const playAudio = async (bool) =>{
        const soundObject = new Audio.Sound();
        console.log('props',props.source);
        try {
            var uri= `${Ip()}:3000/${props.source}`
            console.log("HEO ",uri)
            await soundObject.loadAsync({ uri: `${Ip()}:3000/${props.source}`});
            console.log("HEO AUDIO", props.title, props.duration,uri)
            if(bool){
            await soundObject.playAsync();
            }else{
            await soundObject.pauseAsync();   
            }
          // Your sound is playing!
        } catch (error) {
          // An error occurred!
        }    
    }
    

    var styles = StyleSheet.create({
            image: {
          width: 30,
          height: 30,
          margin:5
        },
      });
   
    return(
        // <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start", alignItems:"center",width:"100%"}}>
            <View style={{flexDirection:"row",justifyContent:"center", alignItems:"center",flexWrap:"wrap"}}>
                <TouchableOpacity onPress={()=>{playAudio(true);console.log('Lecture!')}}>
                    <Image source={require("../assets/icons/play-round-button.png")}
                    style={styles.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{playAudio(false);console.log('Stop!')}}> 
                    <Image source={require('../assets/icons/pause.png')}
                    style={styles.image}/>
                </TouchableOpacity>
                <Text style={{marginRight:10}}>{props.title}</Text>
                <Text>{props.duration}</Text>
            </View>
        // </View>
        
    )

    
// Creates the player
// TrackPlayer.setupPlayer().then(async () => {

//     // Adds a track to the queue
//     // await TrackPlayer.add({
//     // id: 'trackId',
//     // url: require('../assets/test.mp3'),
//     // title: 'Track Title',
//     // artist: 'Track Artist',
//     // artwork: require('../assets/splash.png')
//     // });
    
//     // Starts playing it
//     // TrackPlayer.play(); 
//     });        
// return (
//     <View>
//         <Icon type="AntDesign" name="playcircleo"
//         onPress={()=>{console.log("PLAY MUSIC");}}
//         />
//         <Text>Hello audios</Text>      
//     </View>
//     );
}

export default AudioPlay
 
