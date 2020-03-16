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
import { withNavigationFocus } from 'react-navigation';
import color from './color';
import Loader from './loader';
import Ip from './Ip';
import style from '../stylesheet/stylesheet'

function Home(props) {
  

  const [textSearch, setTextSearch] = useState("");
  const [cataList,setCataList]=useState([]);
  const [tagsList,setTagsList]=useState([])
  const [errorMessage,setErrorMessage]=useState('')
  const [loader,setLoader]=useState(false)
  const [bestRated, setBestRated]=useState([])
  
  //pour charger le store Redux avec la biblio du user
  useEffect(()=>{
    console.log("HOM TOKEN?",props.token)
    const librairyToStore= ()=>{
    var NewCatalist = cataList.map(e=>{
      console.log("count True",e.inLibrairy)
       if(e.inLibrairy==true){
         props.manageLibrairy(e.id,true)
       }else{
         null
       }
     })
    };
    librairyToStore();
  },[cataList,props.isFocused]) //cataList obligatoire!
 
  
   // Initialisation du composant
   useEffect(()=>{
     //affiche le loader et le coupe si chrgt > à 4 secondes
     setLoader(true)
     setTimeout(() => {
      setLoader(false)
    }, 3000);
    const catalogue = async() =>{
      // await fetch('http://10.2.5.203:3000/books/bdd') ATTENTION A UTLISEER POUR CHARGER BDD
      var responseFetch = await fetch(`${Ip()}:3000/home/homePage/${props.token}`)
      var bookList = await responseFetch.json();
      setCataList(bookList.livreMin)
      
      // Chargement livres mieux notés
      var responseBestRated = await fetch(`${Ip()}:3000/lists/bestRated`)
      var bestRatedList = await responseBestRated.json();  
      setBestRated(bestRatedList)

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
  },[props.isFocused,props.storeLibrairy])//ou alors ? props.isFocused,props.storeLibrairy


   useEffect(()=>{
     const rechercheText = async()=>{
       var responseFetch = await fetch(`${Ip()}:3000/home/searchtext/${props.token}`,{
        method: 'POST',
       headers: {'Content-Type':'application/x-www-form-urlencoded','Access-Control-Allow-Origin':`${Ip()}`},
       body: `textSearch=${textSearch}`
      })
       var resultatsearch = await responseFetch.json();
      setCataList(resultatsearch.resultMin)
      
    };
   rechercheText();
   },[textSearch])
 

  //RS creation du tableau de books pour afficher le catalogue
  var Book = cataList.map((e,i)=>{
   return(
    <Books id={e.id} key={i} inLibrairy={e.inLibrairy} title={e.title} image={e.image} authors={e.authors} illustrators={e.illustrator} rating={e.rating} />
   )
  })

  //RS creation du catalogue avec une boucle


//RS fetch pour search tag
const fetchTag = async (tags)=>{
  var dataTag = JSON.stringify(tags)


  var responseFetch = await fetch(`${Ip()}:3000/home/searchTag`,{
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded','Access-Control-Allow-Origin':`${Ip()}`},    
    body: `textSearch=${textSearch}&tagsSearch=${dataTag}&token=${props.token}`});
    var resultatSearch = await responseFetch.json();
    console.log("TAGSEARCH",resultatSearch)
    if(resultatSearch.result == 'ok'){
      setErrorMessage('')
      setCataList(resultatSearch.resultMin)
    }else if(resultatSearch.result == "Aucune sélection")
    {
      setErrorMessage('')
      setCataList(resultatSearch.resultMin)

    }else{
      setErrorMessage(resultatSearch.result)
      setCataList([])
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
  onPress={()=>{onPressTag(tagsList[i]._id)}}
  value={<Text style={style.badgeText}>{tagsList[i].name}</Text>}
  badgeStyle={{backgroundColor: tagsList[i].color, margin:3}}
/>
 ) 
}
console.log('HOME isFOcused',props.isFocused)
  return (
    
     <View style={{ flex: 1, width:"100%", backgroundColor:'white'}}>
     {props.isFocused && loader?<Loader bool={loader} text="Chargement en cours..."/>:null}
       <View style={{ flexDirection:"row", marginTop:25}}>
       <Image
          style={{width: 40, height: 40, margin:5}}
          source={require('../assets/logoOrigapp.png')}
        /> 
          <Text style={{...style.logo,marginLeft:5}}>OrigApp</Text>
          <Text style={{...style.logo,marginLeft:'auto',marginRight:20}}>Hello {props.firstName}</Text>
       </View>
        <View style={{ flexDirection:"row",justifyContent:"center", alignItems:'center', marginTop:10}}>
          <SearchBar 
          containerStyle={{width:'80%', backgroundColor:"transparent"}}
         // inputContainerStyle={{backgroundColor:"none"}}
          lightTheme
          placeholder="Recherche..."
          onChangeText={(value)=> setTextSearch(value)}
          value={textSearch}
        />
        <TouchableOpacity onPress={()=>{props.navigation.navigate('Scan')}}>
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
            <Text style={style.secondaryTitle}>Les mieux notés</Text>
            
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
                        backgroundColor:'white'}}>
          <Text style={style.secondaryTitle}>Catalogue</Text>
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
           token: state.reducerToken,
           firstName: state.reducerPrenom
   }
}
export default withNavigationFocus(connect(mapStateToProps,mapDispatchToProps)(Home))
