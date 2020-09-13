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

  const [position,setPosition]= useState(1)
  const [duration,setDuration] = useState(1)
  const[isPlaying,setIsPlaying] = useState(false)
 var progress = 0
  var source = {uri:props.source}

  const playbackObject = new Audio.Sound();
  const loadSound = async () => {
    await playbackObject.loadAsync(source);
    var state =  await playbackObject.getStatusAsync()
    setDuration(state.durationMillis)
  } 
  loadSound()

    // //fonction pour récuperer la position de l'objet audio toutes les 500ms (par défaut)
    // const _onPlaybackStatusUpdate = async (e)=>{
    //   // console.log("update STATUT",e)
    //   console.log("ETAT INIT",init)
    //   setPosition(e.positionMillis)
    // };

    // //function ecouter statut media son > progress bar
    // var myVar 
    // const stateSound =async ()=>{
    //   var state =  await playbackObject.getStatusAsync()
    //   console.log("stateSound?",state.isPlaying)
    //   setPosition(state.positionMillis)
    //   // setDuration(state.durationMillis)

    //   setIsPlaying(state.isPlaying)
    // } 

  if(props.isFocused==false){
    const unloadSound = async () => {
      await playbackObject.unloadAsync();
    var state =  await playbackObject.getStatusAsync()

    }
    unloadSound()
  }
  
  // myVar  = setInterval(stateSound, 500);
  const playPauseSound = (bool)=>{
    progress=position/duration

    if(bool){
      playbackObject.playAsync();
   
    }else{
      playbackObject.setStatusAsync({ shouldPlay: false })
      setIsPlaying(false)
      // clearInterval(stateSound)
    }
    // playbackObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate) 
  //  myVar()
  }     

  // const pauseSound = ()=>{
  //   // playbackObject.pauseAsync();
  //   // playbackObject.setStatusAsync({ shouldPlay: false })
  //   // clearInterval(myVar)
  // }               

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
                <TouchableOpacity onPress={()=>{playPauseSound(true); setIsPlaying(true)}}>
                    <Image source={require("../assets/icons/play-round-button.png")}
                    style={styles.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{playPauseSound(false); setIsPlaying(false)}}> 
                    <Image source={require('../assets/icons/pause.png')}
                    style={styles.image}/>
                </TouchableOpacity>
                {/* <AudioBar progress={progress!=undefined?progress:0}/> */}
            </View>
            <Text style={{marginHorizontal:5,fontStyle:"italic",fontSize:14}}>{props.title}</Text>
         </View>   
    )
}

export default withNavigationFocus(AudioPlay)
 
