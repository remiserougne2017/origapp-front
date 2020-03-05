import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {Text, View,TouchableOpacity, ImageBackground} from 'react-native';
import {Icon,Overlay,Badge,Card } from 'react-native-elements';
import { withNavigation } from 'react-navigation';



function OverlayContent(props) { 

    // console.log("PROPS OVERLAY",props.overlayData)

// VARIABLES
// const [arrayContent,setArrayContent] = useState([{pageNum:"",media:[]}]);
const [isVisibleOverlay,setIsVisibleOverlay] = useState(props.overlayData.toggle);
console.log(isVisibleOverlay)
console.log("hello props content",props.overlayData.content)

// GENERE LES ELEMENTS DE LA LIST
let displayContentCard = props.overlayData.content.map((obj,i) => {
    return( 
        <TouchableOpacity
            onPress={() =>{props.navigation.navigate('contentMediaPage');props.storeOverlayInformation({toggle:false, content:[]});props.storeContentInformation({idBook:props.overlayData.id,idContent:props.overlayData.content[i].idContent})}}
            >
                
                <Card   
                    title={obj.title}
                    containerStyle={{borderRadius:10}}
                >       
                <View style = {{display:"flex",flexDirection:'row'}}>
                    <Icon 
                        name= 'download' type='antdesign'  size= {30} margin={5} marginRight='auto'
                        onPress={() => console.log('hello download content')}

                    />
                    <View  style={{display:"flex",flexDirection:'row', marginLeft:'auto'}}>
                {
                    obj.media.map((med, k) => {
                    
                    let iconType;
                    let library;
                    switch (med.type) {
                        case 'video': 
                        iconType = 'video'
                        library = 'entypo'
                        break;
                    
                        case 'audio': 
                        iconType = 'md-headset'
                        library = 'ionicons'
                        break;
                    
                        case 'image': 
                        iconType = 'picture'
                        library = 'antdesign'
                        break;
                    
                        case 'text':
                        iconType = 'text'
                        library = 'entypo'
                        break;
                        default:
                        iconType = 'question'
                        iconType = 'antdesign'
                    }

                    
                    return (
                        <Icon name= {iconType} type={library}  size= {30} margin={5}/>
                    );
                    })
                }
                    </View>
                    
                </View>

            </Card>        
    </TouchableOpacity>
    )
})



// RETURN GLOBAL DE LA PAGE

    return (

    <Overlay 
        overlayStyle={{backgroundColor:"#D4D9DB"}}
        height= {"98%"}
        width={"98%"}
        isVisible={props.overlayData.toggle}
        >
            <ImageBackground source={require('../assets/background-content.png')} style={{flex:1,width:"100%",height:"100%"}}> 
        <View style = {{display:"flex",flexDirection:"row", width:'120%'}}>
            <Badge value={<Text style={{marginRight:'auto',color: 'white',  paddingLeft:7,paddingRight:7,paddingTop:9, paddingBottom:12}}>page {props.overlayData.nb}</Text>}
                badgeStyle={{backgroundColor:"grey"}}
            />
            <Icon 
                containerStyle={{marginLeft:'auto'}}
                name= "closecircleo" type='antdesign'  size= {20}
                onPress={() => props.storeOverlayInformation({toggle:false, content:[]})}
            />
        </View>
        <View style ={{justifyContent:'center', marginTop:20}}>
    <Text style={{fontSize:25,marginTop:20,marginBottom:10,textAlign:'center'}}>{props.overlayData.title}</Text>
        </View>
        <View>
            {displayContentCard}
        </View>
        </ImageBackground>        
    </Overlay>

    );
  }


function mapStateToProps(state) {
    return { 
        overlayData: state.overlayData,
    }
}
    

function mapDispatchToProps(dispatch) {
    return {
        storeOverlayInformation: function(obj) { 
          dispatch( {
              type: 'close-overlay',
              overlayData : obj 
            } ) 
      },
        storeContentInformation: function(obj) { 
        dispatch( {
            type: 'open-content-information',
            contentData : obj 
          } ) 
    },
  }
}
    
  




export default withNavigation(connect(
mapStateToProps, 
mapDispatchToProps
)(OverlayContent));




