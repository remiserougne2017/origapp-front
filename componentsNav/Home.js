import React, { useState, useEffect } from 'react';
import { StyleSheet,ScrollView, Text, View,Image } from 'react-native';
import { SearchBar, Badge,Divider  } from 'react-native-elements';
// import { Container, Row } from 'reactstrap';
import Books from './Books'
import { set } from 'react-native-reanimated';
import {connect} from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

function Home(props) {
<<<<<<< HEAD
  
=======


>>>>>>> ab69b4c7bd93275357217e646eeb217430cf88a7
  const [textSearch, setTextSearch] = useState("");
  const [cataList,setCataList]=useState([]);
  const [tagsList,setTagsList]=useState([])
  const [selectedTags,setSelectedTags]=useState([])

  //pour charger le store Redux avec la biblio du user
  const librairyToStore= ()=>{
   var newCataList = cataList.map(e=>{
     if(e.inLibrairy){
       props.manageLibrairy(e.id,true)
     }
   })
  }
  
   // Initialisation du composant
   useEffect(()=>{
    const catalogue = async() =>{
      console.log("WELCOME HOME")
<<<<<<< HEAD
      var responseFetch = await fetch(`http://10.2.5.203:3000/home/homePage/dTsvaJw2PQiOtTWxykt5KcWco87eeSp6`)
      var bookList = await responseFetch.json();
      setCataList(bookList.livreMin)
      //recup tags
      var tagFetch = await fetch(`http://10.2.5.203:3000/home/homePage/tags`)
      var tags = await tagFetch.json();
      var tagsColor = tags.map(e=>{
        e.color="grey"
        return e
      })
      setTagsList(tags)
      
=======
      var responseFetch = await fetch(`http://10.2.5.178:3000/home/homePage/dTsvaJw2PQiOtTWxykt5KcWco87eeSp6`)
      var bookList = await responseFetch.json();
      setCataList(bookList.livreMin);
      console.log("booklist",bookList.livreMin)
>>>>>>> ab69b4c7bd93275357217e646eeb217430cf88a7
    };
    catalogue();
    librairyToStore();
    
  },[])

   useEffect(()=>{
     const rechercheText = async()=>{
       console.log("recherche en cours",textSearch)
       var responseFetch = await fetch('http://10.2.5.203:3000/home/searchText',{
        method: 'POST',
       headers: {'Content-Type':'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'http://10.2.5.203'},    
       body: `textSearch=${textSearch}`
      })
      //  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", "textSearch", textSearch)
       var resultatsearch = await responseFetch.json();
      console.log("ok pr le search",resultatsearch)
      setCataList(resultatsearch.resultMin)
      
    };
   rechercheText();
   },[textSearch])

  //RS creation du tableau de books pour afficher le catalogue
  var Book = cataList.map((e,i)=>{
   return(
    <Books id={e.id} key={i}  inLibrairy={e.inLibrairy} title={e.title} image={e.image} authors={e.authors} illustrators={e.illustrator} rating={e.rating} />
   ) 

  })
//RS fetch pour search tag
const fetchTag = async (tags)=>{
  var dataTag = JSON.stringify(tags)

  var responseFetch = await fetch(`http://10.2.5.203:3000/home/searchText`,{
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded','Access-Control-Allow-Origin':'http://10.2.5.203'},    
    body: `textSearch=${textSearch}&tagsSearch=${dataTag}&token="dTsvaJw2PQiOtTWxykt5KcWco87eeSp6"`});
    var resultatSearch = await responseFetch.json();
    console.log("fetchTag result",resultatSearch)
}
  //RS création des Tags
  const onPressTag=(tagId)=>{
    var newTag= [...tagsList]
    var index= newTag.map(f=>{
      if(tagId==f._id){
        f.color=="grey"?f.color="red":f.color="grey"
      }
      return f
    })
    setTagsList(index)
    fetchTag(index)
    };

  var Tags = tagsList.map((e,i)=>{
    return (
      <Badge key={i} 
      onPress={()=>{console.log("onPress Tags");onPressTag(e._id)}}
      value={<Text style={{color: 'white', paddingLeft:7,paddingRight:7,paddingTop:9, paddingBottom:12}}>{e.name}</Text>}
      badgeStyle={{backgroundColor: e.color, margin:3}}
    />
    )
  })

  return (
     <View style={{ flex: 1, width:"100%"}}>
       <View style={{ flexDirection:"row", marginTop:25}}>
       <Image
          style={{width: 40, height: 40, margin:5}}
          source={require('../assets/logoOrigapp.png')}
        />  
        <Text style={{ marginTop:15,marginLeft:5, fontSize:15, fontWeight:"500"}}>OrigApp</Text>
       </View>
        <View style={{ flexDirection:"row",justifyContent:"center", alignItems:'center', marginTop:10}}>
          <SearchBar 
          containerStyle={{width:'80%', borderRadius:20}}
         // inputContainerStyle={{backgroundColor:"none"}}
          lightTheme
          placeholder="Recherche..."
          onChangeText={(value)=> setTextSearch(value)}
          value={textSearch}
        />
         <Image
          style={{width: 40, height: 40, marginLeft:10}}
          source={require('../assets/qr-scan.png')}
        />
        </View>
          <View style={{flexDirection:"row", flexWrap:"wrap",margin:10}}>
            {Tags}
          </View>
        <View  style={{ flexDirection:"row",justifyContent:"center", alignItems:'center'}}>
          <Divider style={{ backgroundColor: '#F9603E', width:"60%", /*opacity:"50%"*/ marginTop:15}} />
        </View>
        <View style={{ flexDirection:"row",justifyContent:"flex-start", alignItems:'center', marginTop:10, marginLeft:18}}>
          <Text style={{color:"#F9603E"}}>Les mieux notés</Text>
        </View>
        <View style={{ flexDirection:"row",justifyContent:"flex-start", alignItems:'center', marginTop:10, marginLeft:18}}>
          <Text style={{color:"#F9603E"}}>Catalogue</Text>
        </View>   
      <ScrollView contentContainerStyle={{padding: 5}}>
          <View style={{
              flex: 1,
              flexDirection:"row",
              justifyContent:"space-around",
              flexWrap: 'wrap',
              margin:"auto"  
            }}>
            {Book}
          </View>
          </ScrollView>
          <FlashMessage position="top" />
    </View>    
  );
}
function mapDispatchToProps(dispatch){
  return {
    manageLibrairy: function(id,bool){
      dispatch({type: 'manageLibrairy',
      id: id,
      bool:bool})
    } 
  }
}
function mapStateToProps(state) {
  return { storeLibrairy: state.storeLibrairy,
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)