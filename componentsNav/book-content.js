import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput, ImageBackground,AsyncStorage,Image,TouchableOpacity,ScrollView} from 'react-native';
import { Button,Input,Icon,Card,Divider,Badge, CheckBox, Tile} from 'react-native-elements';
// import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import { set, color } from 'react-native-reanimated';
import { withNavigation,withNavigationFocus } from 'react-navigation';
import OverlayRating from './overlay-rating';
import Ip from './Ip'; // A enlever en production !
import colorImport from './color';
import Comment from './comment';
import style from '../stylesheet/stylesheet';
import {showMessage, hideMessage } from "react-native-flash-message";

function BookContent(props) { 
    
//VARIABLES
    var token = props.token //var token = props.token
    const publisher = {publisher: "Les Editions du Sabot Rouge"}
    const [idBook,setIdBook] = useState(props.navigation.state.params.idBook)
    const [arrayDataBook,setArrayDataBook]= useState({contents:[]});
    const [overlayRatingVisible, setOverlayRatingVisible]=useState(false);
    const [commentData, setCommentData]=useState([]);
    const [isChecked, setIsChecked] = useState(false)
 
    
// LOAD BOOK FROM DB
    useEffect( ()=> {
        async function openBook() {
            console.log("BOOK DATA1",idBook)
            var bookData = await fetch(`${Ip()}:3000/books/open-book`, { 
                    method: 'POST',
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    body: `idBook=${idBook}&token=${token}`
                  }
            );
            var bookDataJson = await bookData.json();
            console.log("BOOK DATA2",idBook)
            setArrayDataBook(bookDataJson.dataBook);
            setCommentData(bookDataJson.userCom);
      }

      // Recherche du ID du livre dans Redux
        var isBook = props.storeLibrairy.findIndex(book => book === idBook)
        console.log(props.storeLibrairy[isBook])
        if(isBook != -1){
            setIsChecked(true)
        }

        openBook();
      },[overlayRatingVisible,props.storeLibrairy])

    //Function appel route addLibrairy
    const addLibrairy = async (id,bool) => {
      var responseFetch = await fetch(`${Ip()}:3000/home/addLibrairy/${id}/${bool}/${props.token}`)
      var resp = await responseFetch.json();
      //console.log("retour route librairy",resp)
      if(resp){
        setIsChecked(bool)
        props.manageLibrairy(id,bool)
        showMessage({
            message: resp.mess,
            type: resp.type,
            icon:"auto",
            backgroundColor:"#8FB2C9"
          });
      }
    }


// CARD CONTENT CREATION  
let dataContentToMediaPage = []
let cardDisplay = arrayDataBook.contents.sort(function(objA,objB) {return objA.pageNum - objB.pageNum;}).map((obj,i) => {
        var badgeColor;
        if(i%3==0) {
            badgeColor = '#a5af2a'
        } else if(i%2==1) {
            badgeColor = '#fda329'
        } else if(i%2==0){
            badgeColor = '#24c6ae'
        }
        dataContentToMediaPage.push({
            idContent:obj.idContent,
            color:badgeColor,
        });
        let urlImageContent;
        if((obj.imageContent == null)||(obj.imageContent == undefined)) {
                urlImageContent = arrayDataBook.coverImage
        } else { urlImageContent = obj.imageContent}


        return (
    <TouchableOpacity
        onPress={() =>{props.storeContentInformation({idBook:arrayDataBook.idBook,dataContentFromBook:dataContentToMediaPage,position:i});props.navigation.navigate('contentMediaPage');}}
        key = {i}
        >
        <View
            style={{width:'100%',marginBottom:10,paddingBottom:10,borderBottomWidth:1,borderColor:'#EAEAEA',borderTopWidth:1

        }}
            >

            <View style ={{width:'100%'}}>
                <View style = {{backgroundColor:badgeColor, position:'absolute', top:20, width:60,zIndex:7,left:0,justifyContent:'center',alignItems:'center',height:30,borderBottomRightRadius:10,borderTopRightRadius:10}}>
                    <Text style ={{color:'white'}}>page {obj.pageNum}</Text>
                </View>
                <View style ={{position: 'absolute',top:300,marginLeft:'auto',marginBottom:5}}>
                </View>
                <Image 
                        style={{ height: 240}}
                        source= {{uri: urlImageContent}}
                        
                    />
                <View style ={{width:'80%', position: 'absolute', bottom: 20, backgroundColor:badgeColor,height:30,
                alignItems:'center',justifyContent:'center',borderBottomRightRadius:30}}>
                <Text style ={{fontSize:16,color:"white"}}>
                    {obj.title.toUpperCase()}
                </Text>
                </View>
            </View>
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


    //Création d'une fonction parent pour gerer le booleen isVisible & overlayRating Visible 
    const parentRatingFunction = (bool)=>{
        console.log("BOOOOOOL",bool)
        setOverlayRatingVisible(bool)

    }
// RETURN GLOBAL DE LA PAGE
    return (
    <ScrollView stickyHeaderIndices={[1,3]} style ={{backgroundColor:"white"}}>     
                <View  style = {{ flex: 1, alignItems: 'center', justifyContent: 'center',paddingBottom:20,backgroundColor:"#d6d6d6"}}>
                    <View style = {{alignItems: 'center', justifyContent: 'center',marginTop:60}}>
                    <Image 
                            style={{width: 150, height: 150,borderRadius: 150,
                            marginTop:-15, borderStartWidth:1, borderEndWidth:1,borderRightWidth:1,
                            paddingBottom:0, marginBottom: 0,
                            borderLeftWidth:1, borderColor:"black"}}
                            source= {{ uri: arrayDataBook.coverImage }}
                        />  

                    <CheckBox
                            title={arrayDataBook.title}
                            iconRight
                            center
                            onPress={() =>{addLibrairy(idBook,!isChecked)}}
                            checked={isChecked}
                            checkedColor="#F9603E"
                            containerStyle={{backgroundColor:'#d6d6d6', borderWidth:0}}
                            />

                            <Text style ={{fontStyle:'italic',fontSize:12}}>{arrayDataBook.author}</Text>
                            <Text style ={{fontStyle:'italic',fontSize:12}}>{publisher.publisher}</Text>  
                            <Text style={{marginBottom: 10}}>{arrayDataBook.description}</Text>       
                        
                   
                            {/* <Card containerStyle={{marginTop:0}}>
                            
                           
                            <Text style ={{fontStyle:'italic',fontSize:12}}>{arrayDataBook.author}</Text>
                            <Text style ={{fontStyle:'italic',fontSize:12}}>{publisher.publisher}</Text>  
                            <Text style={{marginBottom: 10}}>
                            {arrayDataBook.description}
                            </Text>
                            </Card> */}
                    

                       {/* <Image 
                            style={{width: 150, height: 150,borderRadius: 150,
                            marginTop:-15, borderStartWidth:1, borderEndWidth:1,borderRightWidth:1,
                            borderLeftWidth:1, borderColor:"black"}}
                            source= {{ uri: arrayDataBook.coverImage }}
                        />
<<<<<<< HEAD
                        <View style={{flex:1, flexDirection: "row"}}>
                        <Text style={{fontSize:15/* ,textAlign:"center",paddingBottom:5, borderRadius:10 }}>
=======
                          <Text style={{...style.mainParagraphText,fontSize:15,textAlign:"center",paddingBottom:5, borderRadius:10}}>
>>>>>>> 9b2688c8c5343ded9411768d4efb66df60ee440d
                            {arrayDataBook.title}
                        </Text>
                        <CheckBox 
                            onPress={() =>{addLibrairy(idBook,!isChecked)}}
                            checked={isChecked}
                            checkedColor="#F9603E"
                        />
                         
                    </View>
                        
                        <View style={{alignItems:"flex-start"}}>
                            <Text style ={{...style.mainParagraphText,fontStyle:'italic',fontSize:12}}>{arrayDataBook.author}</Text>
                            <Text style ={{...style.mainParagraphText,fontStyle:'italic',fontSize:12}}>{publisher.publisher}</Text>  
                        </View> 
                        <View>            
                            <Text style={{textAlign:'center',marginTop:10,fontSize:14}}>{arrayDataBook.description}</Text>         
                            </View>*/}
                    </View> 
                </View>
              
                <View style = {{marginRight:20,backgroundColor:"white",width:"100%"}}>
                    <Text style={style.bookPageSectionTitle}>Les contenus à découvrir...</Text>
                </View>

                <ScrollView>
                    <View>
                        {cardDisplay}
                    </View>
                {/* APPEL LE COMPOSANT OVERLAY */}
                {/* <OverlayContent/> */}
                <OverlayRating isVisible={overlayRatingVisible} idBook={idBook} parentRatingFunction={parentRatingFunction}/>
                <View  style={{ flexDirection:"row",justifyContent:"center", alignItems:'center'}}>
                    <Divider 
                    style={{ backgroundColor: '#F9603E', width:"60%", marginTop:15,marginBottom:15}} 
                    />
                </View>
                </ScrollView>
                <View style = {{marginRight:20,backgroundColor:"white",width:"100%",paddingLeft:10}}>
                    <Text style={style.bookPageSectionTitle}>Les avis et commentaires</Text>
                    <View style = {{marginBottom:10,backgroundColor:colorImport('red'),width:140,borderRadius:10, marginLeft:'auto',marginRight:10}}>
                            <Text onPress={() =>{setOverlayRatingVisible(true)}} style={{fontStyle:"italic", padding:5,color:"white",textAlign:'center'}}>Partagez votre avis
                            </Text>    
                    </View>
                </View>
                <ScrollView>

                <View style = {{marginTop:20,marginLeft:20, marginRight:20}}>
                    <View >

                        <Comment 
                        data = {commentData}
                        />
                    </View>
  
                </View>
                </ScrollView>

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
        manageLibrairy: function(id,bool){
            dispatch({type: 'manageLibrairy',
            id: id,
            bool:bool})
          } 
    }
  }

function mapStateToProps(state) {
return { 
    storeLibrairy: state.storeLibrairy,
    token: state.reducerToken
}
}

export default withNavigationFocus(connect(mapStateToProps,mapDispatchToProps)(BookContent))
