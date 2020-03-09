import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput, ImageBackground,AsyncStorage,Image,TouchableOpacity} from 'react-native';
import { Button,Input,Icon,Card,Divider,Badge} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import { set, color } from 'react-native-reanimated';
import { withNavigation,withNavigationFocus } from 'react-navigation';
import { Assets } from 'react-navigation-stack';
import OverlayRating from './overlay-rating';
import Ip from './Ip'; // A enlever en production !
import colorImport from './color'

function BookContent(props) { 
    const ip="192.168.1.28"

//VARIABLES
    var token = props.token //var token = props.token
    const publisher = {publisher: "Les Editions du Sabot Rouge"}
    const dataComments = [
        {
            book: "Le Ara de Rosa",
            date: '11111111111',
            rating: 2,
            text: "Bof ce livre",
            idUser: 'user1'
        },
        {
            book: "Le Ara de Rosa",
            date: '11111111111',
            rating: 5,
            text: "Super ce livre. IL est vraiment génia let puis c'est bien pour les enfants.énia let puis c'est bien pour les enfantsénia let puis c'est bien pour les enfants.énia let puis c'est bien pour les enfantsénia let puis c'est bien pour les enfantsénia let puis c'est bien pour les enfants ",
            idUser: 'user1'
        }
    ]
    const [idBook,setIdBook] = useState(props.navigation.state.params.idBook)
    const [arrayDataBook,setArrayDataBook]= useState({contents:[]});
    const [overlayRatingVisible, setOverlayRatingVisible]=useState(false)
    console.log("star this book",idBook, overlayRatingVisible);
// LOAD BOOK FROM DB
    useEffect( ()=> {
        async function openBook() {
            var bookData = await fetch(`${Ip()}:3000/books/open-book`, { 
                    method: 'POST',
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    body: `idBook=${idBook}&token=${token}`
                  }
            );
            var bookDataJson = await bookData.json();
            setArrayDataBook(bookDataJson.dataBook);
            // console.log("ARRAY  USABLE DATA",bookDataJson)
      }
        openBook();
      },[])

// CARD CONTENT CREATION  
let arrayColor = ['#a5af2a','#fda329','#24c6ae'];

let cardDisplay = arrayDataBook.contents.sort(function(objA,objB) {return objA.pageNum - objB.pageNum;}).map((obj,i) => {
        let urlImageContent;
        if(obj.imageContent == undefined) {
                urlImageContent = arrayDataBook.coverImage
        } else { urlImageContent = obj.imageContent}
        var badgeColor;
        if(i%3==0) {
            badgeColor = '#a5af2a'
        } else if(i%2==1) {
            badgeColor = '#fda329'
        } else if(i%2==0){
            badgeColor = '#24c6ae'
        }


        return (
    <TouchableOpacity
        onPress={() =>{props.storeContentInformation({idBook:arrayDataBook.idBook,idContent:obj.idContent});props.navigation.navigate('contentMediaPage');}}
        >
        <View
            style={{width:'100%',marginBottom:10,borderRadius:10, backgroundColor:'#FDFDFD'}}
            >

            <View style ={{width:'100%'}}>
                <View style = {{backgroundColor:badgeColor, position:'absolute', top:20, width:60,zIndex:7,left:0,justifyContent:'center',alignItems:'center',height:30,borderBottomRightRadius:10,borderTopRightRadius:10}}>
                    <Text style ={{color:'white'}}>page {obj.pageNum}</Text>
                </View>
                <View style ={{position: 'absolute',top:300,marginLeft:'auto',marginBottom:5}}>
                </View>
                <Image 

                        style={{ height: 240,borderRadius:10}}
                        source= {{uri: urlImageContent}}
                        
                    />
                <View style ={{width:'80%', position: 'absolute', bottom: 20, backgroundColor:badgeColor,height:30,alignItems:'center',justifyContent:'center',borderBottomRightRadius:10,borderTopRightRadius:10}}>
                <Text style ={{fontSize:16,color:"white"}}>
                    {obj.title.toUpperCase()}
                </Text>
                </View>


            </View>
            {/* <Divider style={{ backgroundColor: '#6B6262', width:"100%", marginTop:15}} /> */}
            <View style = {{display:"flex",flexDirection:'row', marginTop:10}}>
                <Icon 
                    name= 'download' type='antdesign'  size= {20} margin={5} marginRight='auto'
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
                                <Icon name= {iconType} type={library}  size= {20} margin={5}/>
                        );
                    })
                }
                </View>                   
            </View>
        </View>
    </TouchableOpacity>
        )
    })

// RETURN GLOBAL DE LA PAGE
    return (
    <ScrollView>     
                <View  style = {{ flex: 1, alignItems: 'center', justifyContent: 'center',marginLeft:20, marginRight:20}}>
                    <View style = {{marginTop:60}}>
                    <Text onPress={() =>{setOverlayRatingVisible(true);
                    }}
                        style={{fontStyle:"italic"}}
                        >Donnez votre avis...</Text>
                        <Image 
                            style={{width: 250, height: 300, marginTop:20}}
                            source= {{ uri: arrayDataBook.coverImage }}
                        />
                        <Text style ={{fontStyle:'italic'}}>{arrayDataBook.author}</Text>
                        <Text style ={{fontStyle:'italic'}}>{publisher.publisher}</Text>                        
                    </View>
                    <View style = {{alignItems:"center",justifyContent:"center"}}>
                        <Text style={{fontSize:25,marginTop:20,marginBottom:10,backgroundColor:colorImport('red'),padding:5,color:"white"}}>{arrayDataBook.title}</Text>
                        <Text>{arrayDataBook.description}</Text>
                    </View>
                </View>
                <View style = {{marginTop:20,marginLeft:20, marginRight:20}}>
                    <Text style={{fontSize:25,marginTop:20,marginBottom:10}}>Les contenus à découvrir</Text>
                    <View>
                        {cardDisplay}
                    </View>
                </View>
                {/* APPEL LE COMPOSANT OVERLAY */}
                {/* <OverlayContent/> */}
                <OverlayRating isVisible={overlayRatingVisible} idBook={idBook} />
                <View  style={{ flexDirection:"row",justifyContent:"center", alignItems:'center'}}>
                    <Divider 
                    style={{ backgroundColor: '#F9603E', width:"60%", marginTop:15}} 
                    />
                </View>
                <View style = {{marginTop:20,marginLeft:20, marginRight:20}}>
                    <Text style={{fontSize:25,marginTop:20,marginBottom:10}}>Les avis et commentaires</Text>
  
                </View>

    </ScrollView>

    );
  }

// GET USER TOKEN
function mapDispatchToProps(dispatch) {
    return {
        storeContentInformation: function(obj) { 
            dispatch( {
                type: 'open-content-information',
                contentData : obj 
              } ) 
        },
    }
  }

function mapStateToProps(state) {
return { 
    storeLibrairy: state.storeLibrairy,
    token: state.reducerToken
}
}

export default withNavigationFocus(connect(mapStateToProps,mapDispatchToProps)(BookContent))
