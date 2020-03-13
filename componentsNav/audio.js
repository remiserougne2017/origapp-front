import React, {useState,useEffect,useRef} from 'react';
import {StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import { Button,Input,Card,Divider,Badge} from 'react-native-elements';
import { Audio } from 'expo-av';
import AudioBar from './audioBar'
import Ip from './Ip'
import { withNavigationFocus } from 'react-navigation';
// import TrackPlayer from 'react-native-track-player';

const AudioPlay = (props) =>{
  const [position,setPosition]= useState(0)
  const [duration,setDuration] = useState(props.duration)
  // const [progress,setProgress]=useState()

  var progress=position/duration

  // console.log("DURATION",position,duration,progress)

 const playAudio = async (bool) =>{
        const soundObject = new Audio.Sound();
        try {
            var uriSound= `${Ip()}:3000/${props.source}`

            await soundObject.loadAsync({ uri: uriSound});
            console.log(uriSound)
            if(bool){
            // console.log("MEC",bool, uriSound)
            await soundObject.playAsync();

            var init = await soundObject.getStatusAsync()
            // console.log("ETAT INIT",init)
            setDuration(init.durationMillis)
            var inProgress = init.isPlaying
            do {
              var state = await soundObject.getStatusAsync()
              inProgress=state.isPlaying              
              setPosition(state.positionMillis)
              // console.log(state.isPlaying)
            } while (inProgress==true);
            }else{
              console.log('AUDIO false ELSE')
            await soundObject.pauseAsync();
            }
          // Your sound is playing!
        } catch (error) {
          console.log(error)
          // An error occurred!
        };
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
                <TouchableOpacity onPress={()=>{playAudio(true);console.log('Lecture!')}}>
                    <Image source={require("../assets/icons/play-round-button.png")}
                    style={styles.image}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{playAudio(false);console.log('Stop!')}}> 
                    <Image source={require('../assets/icons/pause.png')}
                    style={styles.image}/>
                </TouchableOpacity>
                <AudioBar progress={progress}/>
            </View>
            <Text style={{marginHorizontal:5,fontStyle:"italic",fontSize:14}}>{props.title}</Text>
         </View>   
    )
}

export default withNavigationFocus(AudioPlay)
 
