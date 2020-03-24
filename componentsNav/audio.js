import React, {useState,useEffect,useRef} from 'react';
import {StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import { Button,Input,Card,Divider,Badge} from 'react-native-elements';
import { Audio } from 'expo-av';
import AudioBar from './audioBar'
import Ip from './Ip'
import { withNavigationFocus } from 'react-navigation';
import { set } from 'react-native-reanimated';
// import TrackPlayer from 'react-native-track-player';

const AudioPlay = (props) =>{

  console.log("AUDIO ISFOCUSED?",props.isFocused)

  const [position,setPosition]= useState(0)
  const [duration,setDuration] = useState(1)
  const[isPlaying,setIsPlaying] = useState(false)
  var progress=position/duration
  var source = {uri:props.source}

 
  const soundObject = new Audio.Sound();
  
  if(soundObject && props.isFocused){
    const loadSound = async () => {
      await soundObject.loadAsync(source);
      var state =  await soundObject.getStatusAsync()
      console.log("ETAT SOUND",state)
      soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
    }
    loadSound()
  }
  console.log("PROGRESS?",progress)
  if(props.isFocused==false || progress==1){
 
    const unloadSound = async () => {
      await soundObject.unloadAsync();
    var state =  await soundObject.getStatusAsync()
    console.log("ETAT SOUND",state)
    }
    unloadSound()
  }

  //fonction pour récuperer la position de l'objet audio toutes les 500ms (par défaut)
  soundObject.setStatusAsync({ progressUpdateIntervalMillis: 1000 })
  const _onPlaybackStatusUpdate = async (e)=>{
    console.log("update STATUT",e)
    // console.log("ETAT INIT",init)
    setPosition(e.positionMillis)
    setDuration(e.durationMillis)
    // //stopper le son si le user change de page
    // props.isFocused==false? await soundObject.unloadAsync() :null
    // console.log("ISFOCUed",props.isFocused)
  };
 
 

  const playSound = ()=>{
    soundObject.playAsync();
   
  }     

  const pauseSound = ()=>{
    // soundObject.pauseAsync();
    soundObject.setStatusAsync({ shouldPlay: false })
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
           <View  style={{flex:1,flexDirection:"column",justifyContent:"center", alignItems:"flex-start",
                          marginHorizontal:10,marginBottom:10}}>
           <View style={{flexDirection:"row",justifyContent:"center", alignItems:"center",flexWrap:"wrap"}}>
                <TouchableOpacity onPress={()=>{playSound();console.log('Lecture!')}}>
                    <Image source={require("../assets/icons/play-round-button.png")}
                    style={styles.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{pauseSound();console.log('Stop!')}}> 
                    <Image source={require('../assets/icons/pause.png')}
                    style={styles.image}/>
                </TouchableOpacity>
                <AudioBar progress={duration!=undefined?progress:0}/>
            </View>
            <Text style={{marginHorizontal:5,fontStyle:"italic",fontSize:14}}>{props.title}</Text>
         </View>   
    )
}

export default withNavigationFocus(AudioPlay)
 
