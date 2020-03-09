import React, {useState,useEffect,useRef} from 'react';
import { StyleSheet, Text, View,TextInput, ImageBackground,AsyncStorage,Image,TouchableOpacity} from 'react-native';
import { Button,Input,Icon,Card,Divider,Badge} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import { set, color } from 'react-native-reanimated';
// import Video from 'react-native-video';
import { WebView } from 'react-native-webview';
// import WebView from 'react-native-android-fullscreen-webview-video';
// import WebView from 'react-native-android-fullscreen-webview-video';
// import { AudioControls } from 'react-native-hue-player';
import SoundPlayer from 'react-native-sound-player';
import { withNavigation } from 'react-navigation';
import Ip from './Ip' // A enlever en production !
import colorImport from './color';


function contentMedia(props) { 

//VARIABLES
var player = useRef(null);  
const [dataContent,setDataContent] = useState({content: {title:"",media:[{type:''}],title:""}})

// LOAD MEDIA CONTENT FROM DB
    useEffect( ()=> {
        async function openContent() {
            var resContentData = await fetch(`${Ip()}:3000/books/open-content`, { 
                    method: 'POST',
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    body: `idBook=${props.contentMediaData.idBook}&idContent=${props.contentMediaData.idContent}`
                  }
            );
            var resContentDataJson = await resContentData.json();
            setDataContent(resContentDataJson.returnedContent)       
      } 
        openContent();
      },[])


//CREATION DES BLOCS JSX MEDIA  
var displayMedia = dataContent.content.media.map((med, k) => {
    // console.log("med",med.type);
    var displayBlocMedia;    
    switch (med.type) {
        case 'video': 
        // console.log("source", med.source)
        displayBlocMedia = 
            <View style = {{height:280}}>
                {/* <Video source={{uri: '../assets/testSample.mp4'}}   // Can be a URL or a local file.
                    ref={ref => (player = ref)}                                      // Store reference
                    // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    // onError={this.videoError}               // Callback when video cannot be loaded
                    // style={styles.backgroundVideo} 
                    />   */}

                {/* <WebView
                    style={ {margin: 20} }
                    source={{ uri: med.source }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}   
                    /> */}
                <Text style = {{marginLeft:15,fontStyle:'italic'}}>Vidéo : {med.title}</Text>

            </View> 
        break; 

        case 'audio':        
        // try {
        //     // play the file tone.mp3
        //     SoundPlayer.playSoundFile('test', 'mp3')
        //     console.log("playing sound ?")
        //     // or play from url
        //     // SoundPlayer.playUrl('https://example.com/music.mp3')
        //   } catch (e) {
        //     console.log(`cannot play the sound file`, e)
        //   }
        displayBlocMedia = 
            <View>
                <Text>Hello audio </Text> 
              
                {/* <AudioControls
                    initialTrack={1} // starts on second audio file
                    playlist={playlistSample}
                /> */}
            </View>   
        break;

        case 'image': 
        // console.log(med.source);
        if(med.source.search('http') == -1) {
            med.source = `https://www.${med.source}`
        }
        // console.log("after modify",med.source)
        displayBlocMedia = 
            <View>
                <Image 
                    style={{width: "100%", height: 300, marginTop:20}}
                    source= {{ uri: med.source }}
                />
                <Text style = {{marginLeft:15 ,fontStyle:'italic'}}>Image : {med.title}</Text>

            </View>
        break;
    
        case 'text':
        displayBlocMedia = 
            <View style ={{marginTop:50}}>
                <Text style={{fontSize:20,marginTop:20,marginLeft:25,marginRight:25,marginBottom:10,textAlign:'center',textAlign:'justify'}}>{med.title}</Text>
                <Text style={{marginLeft:25,marginRight:25,textAlign:'justify'}}>{med.texte}</Text>

            </View>
        break;
    
        case 'quote':
        displayBlocMedia = 
            <View style ={{marginTop:50}}>
                <View style = {{flexDirection:'row',marginLeft:50,marginRight:50, justifyContent:'center'}}>
                    <Icon name= 'quote' type='entypo'  size= {30} margin={5} color= '#F9603E'/>
                    <Text style={{fontSize:22,textAlign:'justify', color:'#F9603E'}}>{med.texte}</Text>
                </View>
                <Text style={{fontSize:12,marginTop:20,marginLeft:70,marginRight:25,marginBottom:10,textAlign:'center',textAlign:'justify'}}>{med.title}</Text>
            </View>
        break;
        default:
        displayBlocMedia = <Text>Hello default</Text>


    }
    return (
        displayBlocMedia
    )

    })

// Shorten title: 
if(dataContent.title !== undefined) {
    var titleShort
    if(dataContent.title.length>79) {
        titleShort = `< ${dataContent.title.substring(0,80)}...`;
    } else 
    {
        titleShort = dataContent.title
    }
}


// DISPLAY border TITLE ON SCROLL:
const [borderWidth,setBorderWidth] = useState(0);



// RETURN GLOBAL DE LA PAGE

    return (
        <View>
                <View style ={{marginTop:60, display:"flex", flexDirection:'row', alignItems:'center', height:50}}>
                    <View style = {{flexDirection:'row', backgroundColor:'#fda329',position:'absolute',left:0,padding:5,borderTopRightRadius:10,borderBottomRightRadius:10,paddingRight:15}}>
                        <Icon 
                                name= 'back' type='antdesign'  size= {20} margin={5} marginLeft={20} color={'white'}
                                onPress={() => props.navigation.navigate('BookContent')}
                        />
                        <Text style = {{color: 'white',marginLeft:10}} onPress={() => props.navigation.navigate('BookContent')}>
                            {titleShort}
                        </Text>
                    </View>
                    <Text style = {{backgroundColor:'#fda329',position:'absolute',right:0,padding:5,borderTopLeftRadius:10,borderBottomLeftRadius:10,color:'white'}}>
                        page {dataContent.pageNum}
                    </Text>
                </View>
            <View>
                    <Text style={{backgroundColor:colorImport('red'),padding:5,color:"white",fontSize:25,marginTop:40,marginLeft:10,marginRight:10,textAlign:'center',borderBottomColor:'#E7E5E5',borderBottomWidth:borderWidth,borderRadius:10,marginBottom:30}}>{dataContent.content.title}</Text>
            </View>
            <ScrollView
                onScroll = {()=> setBorderWidth(2)}
                contentContainerStyle ={{height:3000}}>
                {displayMedia}
            </ScrollView>

        </View>

    );
  }




function mapStateToProps(state) {
return { 
    token: state.token,
    contentMediaData:state.contentMediaData
}
}


export default withNavigation(connect(
    mapStateToProps, 
    null
    )(contentMedia));
    
