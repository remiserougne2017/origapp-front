import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {Text, View,TouchableOpacity, ImageBackground} from 'react-native';
import {Icon,Overlay,Badge,Card } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { withNavigationFocus } from 'react-navigation';



function OverlayContent(props) { 

    // console.log("PROPS OVERLAY",props.overlayData)

// VARIABLES
// const [arrayContent,setArrayContent] = useState([{pageNum:"",media:[]}]);
const [isVisibleOverlay,setIsVisibleOverlay] = useState('');
// console.log("isVIsible Overlay?",props.overlayData.toggle)
// console.log("hello props overlaydata",props.overlayData)

useEffect( ()=> {
    console.log("hello useeffect close overlay",props.overlayData.toggle)
    setIsVisibleOverlay(props.overlayData.toggle);


  },[props.overlayData.toggle])
//   console.log('PROPS OVERLAY DATA TOGGLE',props.overlayData);
  console.log("focus",props.isFocused)
  //   console.log("IS VISIBLE OVERLAY",isVisibleOverlay)

// GENERE LES ELEMENTS DE LA LIST
let displayContentCard = props.overlayData.content.map((obj,i) => {
    return( 
        <TouchableOpacity
            onPress={() =>{props.storeOverlayInformation(props.overlayData);props.storeContentInformation({idBook:props.overlayData.id,idContent:props.overlayData.content[i].idContent});props.navigation.navigate('contentMediaPage');}}
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
                    iconType = 'headphones'
                    library = 'feather'
                    break;
                
                    case 'image': 
                    iconType = 'picture'
                    library = 'antdesign'
                    break;
                
                    case 'text':
                    iconType = 'text'
                    library = 'entypo'
                    break;

                    case 'quote':
                    iconType = 'quote'
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
        isVisible={isVisibleOverlay}
        >
            <ImageBackground source={require('../assets/background-content.png')} style={{flex:1,width:"100%",height:"100%"}}> 
        <View style = {{display:"flex",flexDirection:"row", width:'120%'}}>
            <Badge value={<Text style={{marginRight:'auto',color: 'white',  paddingLeft:7,paddingRight:7,paddingTop:9, paddingBottom:12}}>page {props.overlayData.nb}</Text>}
                badgeStyle={{backgroundColor:"grey"}}
            />
            <Icon 
                containerStyle={{marginLeft:250}}
                name= "closecircleo" type='antdesign'  size= {20}
                onPress={() => {props.storeOverlayInformation(props.overlayData); console.log('PROP IN CLOSE',props.overlayData.toggle);props.navigation.navigate('BookContent');setIsVisibleOverlay(false)}}
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
    
  




export default withNavigationFocus(connect(
mapStateToProps, 
mapDispatchToProps
)(OverlayContent));




