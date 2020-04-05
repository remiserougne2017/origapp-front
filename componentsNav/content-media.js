import React, {useState,useEffect,useRef, createContext} from 'react';
import {SafeAreaView , FlatList,ScrollView,StyleSheet, Text, View,TextInput, ImageBackground,AsyncStorage,Image,TouchableOpacity} from 'react-native';
import { Button,Input,Icon,Card,Divider,Badge} from 'react-native-elements';
// import { ScrollView } from 'react-native-gesture-handler';
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
import style from '../stylesheet/stylesheet';



function contentMedia(props) { 

//VARIABLES
const [dataContent,setDataContent] = useState({content: {title:"",media:[{type:''}],title:""}})
const [position,setPosition]=useState(props.contentMediaData.position);
let arrayContent = props.contentMediaData.dataContentFromBook;
let badgeColor = props.contentMediaData.dataContentFromBook[position].color
// LOAD MEDIA CONTENT FROM DB
    useEffect( ()=> {
        async function openContent() {
            var resContentData = await fetch(`${Ip()}/books/open-content`, { 
                    method: 'POST',
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    body: `idBook=${props.contentMediaData.idBook}&idContent=${arrayContent[position].idContent}`
                  }
            );
            var resContentDataJson = await resContentData.json();
            setDataContent(resContentDataJson.returnedContent);
      } 
        openContent();
      },[position])

//CREATION DES BLOCS JSX MEDIA  
var displayMedia = dataContent.content.media.map((med, k) => {
    var displayBlocMedia;    
    switch (med.type) {
        case 'video': 
        var regExUrl = new RegExp("https?.*?\.mp4");
        if(regExUrl.test(med.source)==true) {
        displayBlocMedia = 
            <View style={{marginTop:10,marginBottom:10}}>               
                 <Video //module video AV
                    source={{uri: med.source}}
                    // source={require('../assets/testSample.mp4')}
                    useNativeControls = {true}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    isLooping
                    style={{ width: '100%', height: 300 }}
                    />
                <Text style = {{...style.mainParagraphText,marginLeft:15,fontStyle:'italic'}}>{med.title}</Text>
            </View> 
            } else {
                displayBlocMedia =
                <View style = {{height:280,marginTop:10 ,marginBottom:10}}>
                        <WebView //module webview
                        style={ {margin: 20} }
                        source={{ uri: med.source }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}   
                        />
                    <Text style = {{...style.mainParagraphText,marginLeft:15,fontStyle:'italic'}}>{med.title}</Text>
                </View>
            }
        break; 
        case 'audio':    
        console.log("AUDIO CASE",med)
        displayBlocMedia = 
            <View style={{flexDirection:"row",alignItems:"flex-start"}}>
                <Audio /*duration={med.duration}*/ title={med.title} source={med.source}/>
            </View>        
        break;
        case 'image': 
        if(med.source.search('http') == -1) {
            med.source = `https://www.${med.source}`
        }
        displayBlocMedia = 
            <View style={{marginTop:10 ,marginBottom:10}}>
                <Image 
                    style={{width: "100%", height: 400, marginTop:20}}
                    source= {{ uri: med.source }}
                />
                <Text style = {{...style.mainParagraphText,marginLeft:15 ,fontStyle:'italic'}}>{med.title}</Text>
            </View>
        break;  
        case 'text':
        displayBlocMedia = 
            <View style ={{marginTop:10 ,marginBottom:10}}>
                <Text style={{...style.mainParagraphText,fontSize:20,marginTop:20,marginLeft:25,marginRight:25,
                marginBottom:10,textAlign:'center',textAlign:'justify'}}>
                    {med.title}
                </Text>
                <Text style={{marginLeft:25,marginRight:25,textAlign:'justify'}}>{med.texte}</Text>
            </View>
        break;
        case 'quote':
        displayBlocMedia = 
            <View>
                <View style = {{flexDirection:'row',marginLeft:50,marginRight:50,
                 justifyContent:'center',marginTop:20}}>
                    <Icon name= 'quote' type='entypo'  size= {30} margin={5} color= '#F9603E'/>
                    <Text style={{...style.mainParagraphText,fontSize:22,textAlign:'justify', color:'#F9603E'}}>{med.texte}</Text>
                </View>
                <Text style={{...style.mainParagraphText,fontSize:12,marginTop:20,marginLeft:70,marginRight:25,
                    marginBottom:10,textAlign:'center',textAlign:'justify'}}>{med.title}</Text>
            </View>
        break;
        default:
        displayBlocMedia = <Text></Text>

}
    return (
        <View key={k} style = {{marginBottom:15}}>
            {displayBlocMedia}
        </View>
    )
    })

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
    if(position<props.contentMediaData.dataContentFromBook.length-1){
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

const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  }

var bulletBreadCrumb = props.contentMediaData.dataContentFromBook.map((obj, j) => {
    var bulletSize = 5
    if(j==position) {
            bulletSize = 10
    }
    return (
        <View key = {j} style = {{height:bulletSize,width:bulletSize,backgroundColor:badgeColor,borderRadius:100,margin:15}}></View>
        )

    })


// RETURN GLOBAL DE LA PAGE

    return (
        <GestureRecognizer
        config={config}
        style={{
            flex: 1,
            backgroundColor:"white"
          }}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
            >
        <View style={{marginTop:30}}>
        <ScrollView stickyHeaderIndices={[0,4]} >   
 
               <View style ={{marginTop:20, display:"flex", flexDirection:'row', alignItems:'center', height:37,backgroundColor:"white"}}>
                    <View style = {{flexDirection:'row', backgroundColor:badgeColor,position:'absolute',left:0,padding:5,
                                    borderTopRightRadius:10,borderBottomRightRadius:10,paddingRight:15,marginTop:5}}>
                        <Icon 
                                name= 'back' type='antdesign'  size= {20} margin={5} marginLeft={20} color={'white'}
                                onPress={() => props.navigation.navigate('BookContent')}
                        />
                        <Text style = {{color: 'white',marginLeft:10}} onPress={() => props.navigation.navigate('BookContent')}>
                            {titleShort}
                        </Text>
                    </View>
                    <View 
                    style = {{
                    justifyContent:'center',alignItems:'center',marginTop:5}}
                    >
                     {bulletBreadCrumb}
                    </View>
                    <Text style = {{backgroundColor:badgeColor,position:'absolute',right:0,padding:5,borderTopLeftRadius:10,
                    borderBottomLeftRadius:10,color:'white',marginTop:5}}>
                        {dataContent.pageNum}
                    </Text>
                </View>
                
                <View style = {{width:'100%'}}>
                    <ScrollView>
                            <Text style={{fontFamily:'Montserrat',padding:5,color:"black",marginBottom:10,fontSize:25,
                            marginTop:20,marginLeft:10,marginRight:10,textAlign:'center',borderBottomColor:'#E7E5E5',
                            borderBottomWidth:borderWidth,borderRadius:10}}>
                                {dataContent.content.title}
                            </Text>  
                    </ScrollView>   
                </View>
               
                <View style = {{flex:1}}>
                    <ScrollView>
                        {displayMedia}             
                    </ScrollView>    
                </View>    
                </ScrollView>       
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
    
