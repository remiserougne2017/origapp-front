import React, {useState,useEffect,useRef} from 'react';
import { StyleSheet, Text, View,TextInput, ImageBackground,AsyncStorage,Image,TouchableOpacity} from 'react-native';
import { Button,Input,Icon,Card,Divider,Badge} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import OverlayContent from "../componentsNav/overlay-book"
import { set } from 'react-native-reanimated';
import Video from 'react-native-video';


function contentMedia(props) { 

//VARIABLES
var player = useRef(null);  
const [dataContent,setDataContent] = useState({content: {title:"",media:[{type:''}]}})
console.log("Hello content media",props.contentMediaData)
// LOAD BOOK FROM DB
    useEffect( ()=> {
        async function openContent() {
            console.log("data body:",props.contentMediaData)
            var resContentData = await fetch(`http://10.2.5.178:3000/books/open-content`, { 
                    method: 'POST',
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    body: `idBook=${props.contentMediaData.idBook}&idContent=${props.contentMediaData.idContent}`
                  }
            );
            var resContentDataJson = await resContentData.json();
            console.log('response fetch',resContentDataJson)
            setDataContent(resContentDataJson.returnedContent)
      } 

        openContent();
      },[])

      console.log('datacontent',dataContent.content)

// Creation des éléments médias 
// if(dataContent.media == undefined) {
//     dataContent.media =[]
// }
var displayMedia = dataContent.content.media.map((med, k) => {
    console.log("med",med.type);
    var displayBlocMedia;    
    switch (med.type) {
        case 'video': 
        console.log("source", med.source)
        displayBlocMedia = 
            <View>
                <Text>Hello video</Text>
                {/* <Video source={{uri: "https://vimeo.com/395110689"}}   // Can be a URL or a local file.
                    ref={ref => (player = ref)}                                      // Store reference
                    // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    // onError={this.videoError}               // Callback when video cannot be loaded
                    // style={styles.backgroundVideo} 
                    />   */}
            </View> 
        break; 

        case 'audio': 
        displayBlocMedia = <Text>Hello audio</Text>    
        break;

        case 'image': 
        console.log(med.source);
        if(med.source.search('http') == -1) {
            med.source = `https://www.${med.source}`
        }
        console.log("after modify",med.source)
        displayBlocMedia = 
            <View>
                <Image 
                    style={{width: "100%", height: 300, marginTop:20}}
                    source= {{ uri: med.source }}
                />
                <Text>{med.title}</Text>

            </View>
        break;
    
        case 'text':
        displayBlocMedia = 
            <View style ={{marginTop:50}}>
                <Text style={{fontSize:20,marginTop:20,margin:10,textAlign:'center',textAlign:'justify'}}>{med.title}</Text>
                <Text style={{margin:10,textAlign:'justify'}}>{med.texte}</Text>

        </View>
        break;
        default:
        displayBlocMedia = <Text>Hello default</Text>


    }
    return (
        displayBlocMedia
    )

    })
// RETURN GLOBAL DE LA PAGE

    return (
    <ScrollView>
        <View style ={{marginTop:60}}>
            <Icon 
                name= "arrowleft" type='antdesign'  size= {40}
                onPress={() => console.log("star this book")}
            />
            <View>
                <Text>Insert Breadcrumbs</Text>
            </View>
            <View>
                <Text style={{fontSize:25,marginTop:20,marginBottom:10,textAlign:'center'}}>{dataContent.content.title}</Text>
            </View>
            <Text>Hello media</Text>
            {displayMedia}

        </View>
    </ScrollView>

    );
  }


// GET USER TOKEN
function mapDispatchToProps(dispatch) {
    return {
        storeOverlayInformation: function(obj) { 
          dispatch( {
              type: 'open-overlay',
              overlayData : obj 
            } ) 
      },
    }
  }


function mapStateToProps(state) {
return { 
    token: state.token,
    overlayData:state.overlayData,
    contentMediaData:state.contentMediaData
}
}


export default connect(
    mapStateToProps, 
    mapDispatchToProps
    )(contentMedia);
    
