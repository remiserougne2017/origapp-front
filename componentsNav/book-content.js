import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput, ImageBackground,AsyncStorage,Image,TouchableOpacity,ScrollView} from 'react-native';
import { Button,Input,Icon,Card,Divider,Badge, CheckBox, Tile} from 'react-native-elements';
// import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import { set, color } from 'react-native-reanimated';
import { withNavigation,withNavigationFocus, useTheme } from 'react-navigation';
import OverlayRating from './overlay-rating';
import Ip from './Ip'; // A enlever en production !
import colorImport from './color';
import Comment from './comment'
import { showMessage} from "react-native-flash-message";
import style from '../stylesheet/stylesheet'


function BookContent(props) { 
    
//VARIABLES
    var token = props.token //var token = props.token
    const publisher = {publisher: "Les Editions du Sabot Rouge"}
    // const [idBook,setIdBook] = useState(props.navigation.state.params.idBook)
    const [arrayDataBook,setArrayDataBook]= useState({contents:[]});
    const [overlayRatingVisible, setOverlayRatingVisible]=useState(false);
    const [commentData, setCommentData]=useState([]);
    const [isChecked, setIsChecked] = useState(false)
    const [idBook,setIdBook]=useState(props.navigation.state.params.idBook)


// LOAD BOOK FROM DB
    useEffect( ()=> {
        setIdBook(props.navigation.state.params.idBook)
        async function openBook() {
            var bookData = await fetch(`${Ip()}/books/open-book`, { 
                    method: 'POST',
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    body: `idBook=${props.navigation.state.params.idBook}&token=${token}`
                  }
            );
            var bookDataJson = await bookData.json();
            setArrayDataBook(bookDataJson.dataBook);
            setCommentData(bookDataJson.userCom);
            setIsChecked(bookDataJson.inLibrairy)
                }   
        openBook();
      },[props.storeLibrairy,props.isFocused,overlayRatingVisible])
      //overlayRatingVisible en ecoute pour afficher les comments en direct, 

    //Function appel route addLibrairy
    const addLibrairy = async (id,bool) => {    
      var responseFetch = await fetch(`${Ip()}/home/addLibrairy/${id}/${bool}/${props.token}`)
      var resp = await responseFetch.json();
      if(resp){
        // setIsChecked(bool);

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
        //image de la card content ImageContent ou image de couv si inexistante
        let urlImageContent;
        if((obj.imageContent == null)||(obj.imageContent == undefined)) {
                urlImageContent = arrayDataBook.coverImage
        } else { urlImageContent = obj.imageContent}


        return (
            //card contenu
    <TouchableOpacity
        onPress={() =>{props.storeContentInformation({idBook:arrayDataBook.idBook,dataContentFromBook:dataContentToMediaPage,position:i});props.navigation.navigate('contentMediaPage');}}
        key = {i}
        >
        <View
            style={{width:'100%',marginBottom:10,paddingBottom:10,borderBottomWidth:1,borderBottomColor:'#EAEAEA',
        }}>
            <View style ={{width:'100%'}}>
                <View style = {{backgroundColor:badgeColor, position:'absolute', top:20, width:60,zIndex:7,left:0,justifyContent:'center',alignItems:'center',height:30,borderBottomRightRadius:10,borderTopRightRadius:10}}>
                    <Text style ={{color:'white'}}>{obj.pageNum}</Text>
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
                />
                    <View  style={{display:"flex",flexDirection:'row', marginLeft:'auto'}}>
                        {
                            obj.media.map((med, k) => {
                            let iconType;
                            let type;
                            switch (med.type) {
                                case 'video': 
                                iconType = 'video'
                                type = 'entypo'
                                break;
                            
                                case 'audio': 
                                iconType = 'headphones'
                                type = 'feather'
                                break;
                            
                                case 'image': 
                                iconType = 'picture'
                                type = 'antdesign'
                                break;
                            
                                case 'text':
                                iconType = 'text'
                                type = 'entypo'
                                break;

                                case 'quote':
                                iconType = 'quote'
                                type = 'entypo'
                                break;

                                default:
                                iconType = 'question'
                                type = 'antdesign'
                            }
                            return (
                                <Icon key={k} name= {iconType} type={type}  size= {20} margin={5}/>
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
        setOverlayRatingVisible(bool)
    }

// RETURN GLOBAL DE LA PAGE - affichage de: Header cardDisplay et Comments
    return (
    <ScrollView stickyHeaderIndices={[1,3]} style ={{backgroundColor:"white"}}>     
        <View  style = {{ flex: 1, alignItems: 'center', justifyContent: 'center',paddingBottom:20,backgroundColor:"#d6d6d6"}}>
            <View style = {{width:"100%",alignItems: 'center', justifyContent: 'center',marginTop:60}}>
                 <View style={{width:"100%",alignItems:"flex-start",justifyContent:"flex-start"}}>   
                <Button
                    containerStyle={{marginLeft:10,margin:0}}
                    onPress={() =>{addLibrairy(props.navigation.state.params.idBook,!isChecked)}}
                    buttonStyle={{backgroundColor:colorImport("red"), borderWidth:0,borderRadius:20,margin:0}}
                    titleStyle={{fontSize:10}}
                    title={!isChecked?"Ajouter à mes favoris":"Supprimer de mes favoris"}
                />
                </View>
                <Image 
                    style={{width: 150, height: 150,borderRadius: 150,position:"relative",
                    marginTop:-15, borderStartWidth:1, borderEndWidth:1,borderRightWidth:1,
                    paddingBottom:0, marginBottom: 0,
                    borderLeftWidth:1, borderColor:"black"}}
                    source= {{ uri: arrayDataBook.coverImage }}
                 />  
                <Text style={{marginTop:10}}>{arrayDataBook.title}</Text>
                <Text style ={{fontStyle:'italic',fontSize:12}}>{arrayDataBook.author}</Text>
                <Text style ={{fontStyle:'italic',fontSize:12}}>{arrayDataBook.publisher}</Text>  
                <Text style={{marginBottom: 5,textAlign:'center',marginTop:10}}>{arrayDataBook.description}</Text> 
            </View> 
        </View>
        <View style = {{marginRight:20,backgroundColor:"white",width:"100%"}}>
            <Text style={style.bookPageSectionTitle}
            >Les contenus à découvrir...</Text>
        </View>

        <ScrollView>
            <View>
                {cardDisplay}
            </View>
        {/* APPEL LE COMPOSANT OVERLAY */}
        {/* <OverlayContent/> */}
        <OverlayRating isVisible={overlayRatingVisible} idBook={props.navigation.state.params.idBook} parentRatingFunction={parentRatingFunction}/>
        <View  style={{ flexDirection:"row",justifyContent:"center", alignItems:'center'}}>
            <Divider 
            style={{ backgroundColor: '#F9603E', width:"60%", marginTop:15,marginBottom:15}} 
            />
        </View>
        </ScrollView>
        <View style = {{marginRight:20,backgroundColor:"white",width:"100%"}}>
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
