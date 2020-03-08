import React, { useState, useEffect } from 'react';
import { StyleSheet,ScrollView, Text, View,Image,TouchableOpacity } from 'react-native';
import { SearchBar, Badge,Divider  } from 'react-native-elements';
// import { Container, Row } from 'reactstrap';
import Books from './Books'
import { set } from 'react-native-reanimated';
import {connect} from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import Carrousel from './Carrousel';
import { withNavigation } from 'react-navigation';
import color from './color';
import Loader from './loader';
import Ip from './Ip';

function Home(props) {
  //test d'apport de couleur en variable
  console.log('COULEUr', color("red") )
  

  const [textSearch, setTextSearch] = useState("");
  const [cataList,setCataList]=useState([]);
  const [tagsList,setTagsList]=useState([])
  const [selectedTags,setSelectedTags]=useState([])
  const [errorMessage,setErrorMessage]=useState('')
  const[loader,setLoader]=useState(false)
  const [bestRated, setBestRated]=useState('')
  
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
     //affiche le loader et le coupe si chrgt > à 4 secondes
     setLoader(true)
     setTimeout(() => {
      setLoader(false)
    }, 4000);
    const catalogue = async() =>{
      // await fetch('http://10.2.5.203:3000/books/bdd') ATTENTION A UTLISEER POUR CHARGER BDD
      console.log("WELCOME HOME")
      var responseFetch = await fetch(`${Ip()}:3000/home/homePage/${props.reducerToken}`)
      var bookList = await responseFetch.json();
      setCataList(bookList.livreMin)
      setBestRated(bookList.livresMieuxNotes)

      //recup tags
      var tagFetch = await fetch(`${Ip()}:3000/home/homePage/tags`)
      var tags = await tagFetch.json();
      var tagsColor = tags.map(e=>{
        e.color="grey"
        return e
      })
      setTagsList(tags)
      //ferme le loader
      setLoader(false)
    };
    catalogue();
    librairyToStore();
    
  },[])

   useEffect(()=>{
     const rechercheText = async()=>{
       console.log("recherche en cours",textSearch)
       var responseFetch = await fetch(`${Ip()}:3000/home/searchtext/${props.reducerToken}`,{
        method: 'POST',
       headers: {'Content-Type':'application/x-www-form-urlencoded','Access-Control-Allow-Origin':`${Ip()}`},
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


  var responseFetch = await fetch(`${Ip()}:3000/home/searchTag`,{
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded','Access-Control-Allow-Origin':`${Ip()}`},    
    body: `textSearch=${textSearch}&tagsSearch=${dataTag}&token=${props.reducerToken}`});
    var resultatSearch = await responseFetch.json();
    console.log("TAGRESULT",await resultatSearch)
    if(resultatSearch.result == 'ok'){
      setErrorMessage('')
      setCataList(resultatSearch.resultMin)
    }else if(resultatSearch.result == "Aucune sélection")
    {
      setErrorMessage('')
      setCataList(resultatSearch.resultMin)

    }else{
      setErrorMessage(resultatSearch.result)
      setCataList([{}])
    }
    
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

  var Tags=[]
for (let i=0;i<tagsList.length;i++){
 Tags.push(
<Badge key={i} 
  onPress={()=>{console.log("onPress Tags");onPressTag(tagsList[i]._id)}}
  value={<Text style={{color: 'white', paddingLeft:7,paddingRight:7,paddingTop:9, paddingBottom:12}}>{tagsList[i].name}</Text>}
  badgeStyle={{backgroundColor: tagsList[i].color, margin:3}}
/>
 ) 
}
  // var Tags = tagsList.map((e,i)=>{
  //   return (
  //     <Badge key={i} 
  //     onPress={()=>{console.log("onPress Tags");onPressTag(e._id)}}
  //     value={<Text style={{color: 'white', paddingLeft:7,paddingRight:7,paddingTop:9, paddingBottom:12}}>{e.name}</Text>}
  //     badgeStyle={{backgroundColor: e.color, margin:3}}
  //   />
  //   )
  // })

  return (
    
     <View style={{ flex: 1, width:"100%", backgroundColor:'#EEEEEE'}}>
     <Loader bool={loader} text="Chargement du catalogue..."/> 
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
        <TouchableOpacity onPress={()=>{console.log("SCAN");props.navigation.navigate('Scan')}}>
          <Image
           
            style={{width: 40, height: 40, marginLeft:10}}
            source={require('../assets/qr-scan.png')}
          />
        </TouchableOpacity>
        
        </View>
          <View style={{flexDirection:"row", flexWrap:"wrap",margin:10}}>
            {Tags}
          </View>
        <View  style={{ flexDirection:"row",justifyContent:"center", alignItems:'center'}}>
          <Divider style={{ backgroundColor: '#F9603E', width:"60%", /*opacity:"50%"*/ marginTop:15}} />
        </View>

        <ScrollView stickyHeaderIndices={[2]}>

          <View style={{ flexDirection:"row",
                        justifyContent:"flex-start", 
                        alignItems:'center', 
                        marginTop:10, 
                        marginLeft:10}}>
            <Text style={{color:"#F9603E"}}>Les mieux notés</Text>
            
          </View>

          <View style={{ flexDirection:"row",
                        justifyContent:"flex-start", 
                        alignItems:'center',
                        marginTop:10}}>
            <Carrousel data={bestRated}/>
          </View>

          <View style={{ flexDirection:"row", 
                        justifyContent:"flex-start",
                        alignItems:'center',
                        marginTop:10,
                        marginLeft:10,
                        paddingBottom:5, 
                        backgroundColor:'#EEEEEE'}}>
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
                {errorMessage!=""?<Text>{errorMessage}</Text>:null}
                {Book}            
            </View>
            </ScrollView>
           
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
          reducerToken: state.reducerToken
   }
}
export default withNavigation(connect(mapStateToProps,mapDispatchToProps)(Home))
