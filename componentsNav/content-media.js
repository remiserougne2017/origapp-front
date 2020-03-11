import React, {useState,useEffect,useRef} from 'react';
import { StyleSheet, Text, View,TextInput, ImageBackground,AsyncStorage,Image,TouchableOpacity,ScrollView} from 'react-native';
import { Button,Input,Icon,Card,Divider,Badge} from 'react-native-elements';
// import {  } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import { set, color } from 'react-native-reanimated';
// import Video from 'react-native-video';
import { Video } from 'expo-av';
import { WebView } from 'react-native-webview';
// import WebView from 'react-native-android-fullscreen-webview-video';
// import WebView from 'react-native-android-fullscreen-webview-video';
// import { AudioControls } from 'react-native-hue-player';
import { withNavigation } from 'react-navigation';
import Ip from './Ip' // A enlever en production !
import Audio from './audio'
import colorImport from './color';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

function contentMedia(props) { 

//VARIABLES
const [dataContent,setDataContent] = useState({content: {title:"",media:[{type:''}],title:""}})
const [position,setPosition]=useState(props.contentMediaData.position);
const [arrayIdContent,setArrayIdContent] = useState(props.contentMediaData.listAllIdContent);
// LOAD MEDIA CONTENT FROM DB
    useEffect( ()=> {
        async function openContent() {

            // console.log('OK Swipe is on, lets fetch ',props.contentMediaData.idContent,props.contentMediaData.idContent)
            var resContentData = await fetch(`${Ip()}:3000/books/open-content`, { 
                    method: 'POST',
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    body: `idBook=${props.contentMediaData.idBook}&idContent=${arrayIdContent[position]}`
                  }
            );
            var resContentDataJson = await resContentData.json();
            setDataContent(resContentDataJson.returnedContent)  
            // console.log("/////////////////////////////////////// DATA CONTENT",dataContent)     
      } 
        openContent();
      },[position])

      console.log(position)

//CREATION DES BLOCS JSX MEDIA  
var displayMedia = dataContent.content.media.map((med, k) => {
    // console.log("med",med.type);
    var displayBlocMedia;    
    switch (med.type) {
        case 'video': 
        var regExUrl = new RegExp("https?.*?\.mp4");
        if(regExUrl.test(med.source)==true) {
        displayBlocMedia = 
            <View style = {{flex:1,height:280}}>
                {/* MODULE expo AV */}
                 <Video
                    source={{uri: med.source}}
                    // source={require('../assets/testSample.mp4')}
                    useNativeControls = {true}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={{ width: '100%', height: 300 }}
                    />
                <Text style = {{marginLeft:15,fontStyle:'italic'}}>Vidéo : {med.title}</Text>

            </View> 
            } else {
                displayBlocMedia =
                <View style = {{flex:1,height:300}}>
                        <WebView
                        style={ {margin: 20} }
                        source={{ uri: med.source }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}   
                        />
                    <Text style = {{marginLeft:15,fontStyle:'italic'}}>Vidéo : {med.title}</Text>
                </View>
            }

        break; 

        case 'audio':    
        displayBlocMedia = 
        <View>
        <Audio duration={med.duration} title={med.title} source={med.source}/>
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

    var displayListMedia = 
    <View 
        style ={{height:'100%'}}>
        <ScrollView
            onScroll = {()=> setBorderWidth(2)}
            automaticallyAdjustContentInsets={true}
            >
            <View style = {{height:'auto'}}>{displayMedia}</View>
        </ScrollView>
    </View>

// Shorten title: 
if(dataContent.title !== undefined) {
    var titleShort
    if(dataContent.title.length>79) {
        titleShort = `${dataContent.title.substring(0,80)}...`;
    } else 
    {
        titleShort = dataContent.title
    }
}


// DISPLAY border TITLE ON SCROLL:
const [borderWidth,setBorderWidth] = useState(0);



// Swipe
function onSwipeLeft() {
    if(position<props.contentMediaData.listAllIdContent.length-1){
        setPosition(position+1);
    }

}

function onSwipeRight() {
    if(position>0) {
        setPosition(position-1);
    } else if (position == 0){
        props.navigation.navigate('BookContent')
        }

}

var bulletBreadCrumb = props.contentMediaData.listAllIdContent.map((obj, j) => {
    var bulletSize = 5
    if(j==position) {
            bulletSize = 10
    }
    return (
        <View style = {{height:bulletSize,width:bulletSize,backgroundColor:'#fda329',borderRadius:100,margin:15}}></View>
        )

    })


// RETURN GLOBAL DE LA PAGE

    return (
        <GestureRecognizer
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
            >
            <View style = {{width:'100%'}}>
                <View style = {{flexDirection:"row",justifyContent:'center',alignItems:'center',marginTop:40}}>
                     {bulletBreadCrumb}
                </View>
                <View style ={{marginTop:10, display:"flex", flexDirection:'row', alignItems:'center', height:15}}>
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
                <View style = {{width:'100%'}}>
                        <Text style={{
                                padding:5,color:"black",marginBottom:10,fontSize:25,marginTop:20,marginLeft:10,marginRight:10,textAlign:'center',
                                borderBottomColor:'#E7E5E5',borderBottomWidth:borderWidth,borderRadius:10, }}>{dataContent.content.title}</Text>
                </View>

                {displayListMedia}

            </View>
        </GestureRecognizer>

    );
  }

function mapStateToProps(state) {
return { 
    token: state.reducerToken,
    contentMediaData:state.contentMediaData
}
}


export default withNavigation(connect(
    mapStateToProps, 
    null
    )(contentMedia));
    
