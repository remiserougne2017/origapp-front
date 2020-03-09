import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput, ImageBackground,AsyncStorage,Image,TouchableOpacity} from 'react-native';
import { Button,Input,Icon,Card,Divider,Badge} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import { set, color } from 'react-native-reanimated';
import { withNavigationFocus } from 'react-navigation';
import { Assets } from 'react-navigation-stack';
import OverlayRating from './overlay-rating';
import Ip from './Ip'; // A enlever en production !

function BookContent(props) { 
    
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
            //console.log("ARRAY  USABLE DATA",bookDataJson)
      }
        openBook();
      },[])

console.log('livre', props.navigation.state.params.idBook,idBook)
// CARD CONTENT CREATION  
let cardDisplay = arrayDataBook.contents.map((obj,i) => {
        return (
    <TouchableOpacity
        onPress={() =>{props.storeContentInformation({idBook:arrayDataBook.idBook,idContent:obj.idContent});props.navigation.navigate('contentMediaPage');}}
        >
        <View
            style={{width:'100%', padding:10,marginBottom:10,borderRadius:10, backgroundColor:'#FDFDFD'}}
            >

            <View style ={{width:'100%'}}>

                <View style ={{marginLeft:'auto',marginBottom:5}}>
                <Badge value={<Text style={{marginRight:'auto',color: 'white',  paddingLeft:7,paddingRight:7,paddingTop:9, paddingBottom:12}}>page {obj.pageNum}</Text>}
                    badgeStyle={{backgroundColor:"grey"}}
                />
                </View>
                <Image 

                        style={{ height: 240,borderRadius:10}}
                        source= {{uri: arrayDataBook.coverImage}}
                        
                    />
                <View style ={{width:'80%',marginTop:10, marginBottom:10, position: 'absolute', bottom: 0, left: 20, backgroundColor:'#F8ED49'}}>
                <Text style ={{fontSize:16}}>
                    {obj.title}
                </Text>
                </View>


            </View>
            <Divider style={{ backgroundColor: '#6B6262', width:"100%", marginTop:15}} />
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

            <ImageBackground source={require('../assets/origami.png')} style={{width: '100%', height: '100%'}}>
            <OverlayRating isVisible={overlayRatingVisible} idBook={idBook} />
                    <View  style = {{ flex: 1, alignItems: 'center', justifyContent: 'center',marginLeft:20, marginRight:20}}>
                        <View style = {{marginTop:60}}>
                            <Image 
                                style={{width: 230, height: 280, marginTop:20}}
                                source= {{ uri: arrayDataBook.coverImage }}
                            />
                            <Icon 
                                    iconStyle={{position:'absolute',top:-300,right:-20}}
                                    name= "staro" type='antdesign'  size= {40}
                                    onPress={() => console.log("star this book")}
                                />
                            <Text>{arrayDataBook.author}</Text>
                            <Text>{publisher.publisher}</Text>                        
                        </View>
                        <View style = {{alignItems:"center"}}>
                            <Text style={{fontSize:25,marginTop:20,marginBottom:10}}>{arrayDataBook.title}</Text>
                            <Text >{arrayDataBook.description}</Text>
                        </View>
                    </View>
                    <View style = {{marginTop:20,marginLeft:20, marginRight:20}}>
                        <Text style={{fontSize:25,marginTop:20,marginBottom:10}}>Les contenus à découvrir</Text>
                        <View style = {{marginLeft:0}}>

                            {cardDisplay}

                        </View>

                    </View>
                    <View  style={{ flexDirection:"row",justifyContent:"center", alignItems:'center'}}>
                        <Divider 
                        style={{ backgroundColor: '#F9603E', width:"60%", marginTop:15}} 
                        />
                    </View>
            </ImageBackground>

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
    token: state.reducerToken,
}
}

export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(BookContent))
