import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput, ImageBackground,AsyncStorage,Image,TouchableOpacity} from 'react-native';
import { Button,Input,Icon,Card,Divider,Badge} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import OverlayContent from "../componentsNav/overlay-book"
import { set } from 'react-native-reanimated';
import { Assets } from 'react-navigation-stack';
import { withNavigation } from 'react-navigation';
import OverlayRating from './overlay-rating';

function BookContent(props) { 
    const ip="192.168.1.28"

//VARIABLES
    var token = 'dTsvaJw2PQiOtTWxykt5KcWco87eeSp6' //var token = props.token
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
            var bookData = await fetch(`http://${ip}:3000/books/open-book`, { 
                    method: 'POST',
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    body: `idBook=${idBook}&token=${token}`
                  }
            );
            var bookDataJson = await bookData.json();
            setArrayDataBook(bookDataJson.dataBook);
      }
        openBook();
      },[])

// Construction d'un tableau splité pour génèrer les cards par page 
    var organisedContent = []
    let arrayPage = []
    for(let i=0;i<arrayDataBook.contents.length;i++){
        if(arrayPage.indexOf(arrayDataBook.contents[i].pageNum)==-1)
        { 
            arrayPage.push(arrayDataBook.contents[i].pageNum);
        }
    }
    for(let j=0;j<arrayPage.length;j++){
        let newArray = arrayDataBook.contents.filter(obj => obj.pageNum == arrayPage[j]);
        let containerArray = {
            pageNumber: arrayPage[j],
            allContents:newArray
        }
        organisedContent.push(containerArray)
    }
    
// OVERLAYlancer une fonction de reducer pour psser les infos a overlay-book
function openOverlay (nb,id,bool, arr,tit){
    let arrayContentSentToReducer
    for(let i = 0;i<arr.length;i++){
        if(arr[i].pageNumber == nb) {
            arrayContentSentToReducer = arr[i].allContents
        }
    }
    console.log("TITLE",tit)
    props.storeOverlayInformation({id:id,nb:nb,toggle:bool,content:arrayContentSentToReducer,title:tit})
}

// CARD CONTENT CREATION  
let cardDisplay = organisedContent.map((obj,i) => {
    let color; let colorFont;
    if(i%4==0) {color= '#F9603E';colorFont="white"
    }else if (i%3==0) {
        color= '#F4F4F4';colorFont="black"
    } else {color= '#F29782',colorFont="black"}
    let titleList = obj.allContents.map((e,j)=>{
        return (
            <View key={j} style = {{alignItems:"center"}}>
                <Text style={{marginBottom: 10, color:colorFont, textAlign:'center'}}>
                {e.title}
                </Text>
                <Divider style={{ backgroundColor: '#252525', width:"60%", marginTop:10, justifyContent:"center"}} />
            </View>
        )
    })

    return (
    <TouchableOpacity
        key={i}
        style = {{backgroundColor:color, margin:10,borderRadius:5,padding:5, width:'40%', justifyContent:'center'}}
        onPress = {()=> openOverlay(obj.pageNumber,idBook,true,organisedContent,arrayDataBook.title)}>
            <View>
                <Badge value={<Text style={{color: 'white', paddingLeft:7,paddingRight:7,paddingTop:9, paddingBottom:12,fontSize:9}} >page {obj.pageNumber}</Text>}
                    badgeStyle={{backgroundColor:"#252525"}}
                />
            <View style = {{justifyContent: 'center'}}>
                {titleList}
            </View>
            </View>
    </TouchableOpacity>
    )})

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
                    <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'row',flexWrap:'wrap'}}>
                        {cardDisplay}
                    </View>
                </View>
                {/* APPEL LE COMPOSANT OVERLAY */}
                <OverlayContent/>
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
    storeLibrairy: state.storeLibrairy,
    token: state.token
}
}

export default withNavigation(connect(null,mapDispatchToProps)(BookContent))
