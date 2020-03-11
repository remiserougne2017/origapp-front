import React, { useState, useEffect } from 'react';
import {ScrollView, Text, View,Image,TouchableOpacity } from 'react-native';
import { Divider  } from 'react-native-elements';
import Books from './Books'
import {connect} from 'react-redux';
import FlashMessage from "react-native-flash-message";
import Carrousel from './Carrousel';
import { withNavigation } from 'react-navigation';
import color from './color';
import Ip from './Ip'; // A enlever en production !



function Library(props) {

  const [mesLivres,setMesLivres]=useState([]);
  const [lastRead,setLastRead]=useState([]);
  const [errorMessage,setErrorMessage]=useState('')
  const [suggestBooks, setSuggestBooks]=useState([]);
  
   // Initialisation du composant
   useEffect(()=>{
    const maBibliotheque = async() =>{
      var responseFetch = await fetch(`${Ip()}:3000/home/myLibrary/${props.token}`)
      var responseLivres = await responseFetch.json();
      console.log("REponse librairy",responseLivres)
       setMesLivres(responseLivres)
    };  
    maBibliotheque();  
  },[props.storeLibrairy])

  // Initialisation Last Reads
  useEffect(()=>{
    const lastReads = async() =>{

      //console.log("librairy")
      var responseFetch = await fetch(`${Ip()}:3000/lists/lastRead/${props.token}`)
      var responseLastReads = await responseFetch.json();
      setLastRead(responseLastReads)
      
    };  

    lastReads();  
  },[])

  //// Initialisation Suggestions
  useEffect(()=>{
    const suggest = async() =>{
      var suggestFetch = await fetch(`${Ip()}:3000/home/suggest/${props.token}`)
      var Suggestions = await suggestFetch.json();
      setSuggestBooks(Suggestions.mySuggest)      
    };

    suggest();
  },[])

  //Création du tableau pour afficher la bibliothèque
  var Book = mesLivres.map((e,i)=>{
   return(
    <Books id={e.id} key={i}
           inLibrairy={e.inLibrairy}
           title={e.title}
           image={e.image}
           authors={e.authors}
           illustrators={e.illustrator}
           rating={e.rating} />
          )
  })

  //Création du tableau pour afficher les dernières lectures
  var latestBooks = lastRead.map((e,i)=>{
    return({
      id:e._id,
      key:i,
      //inLibrairy={e.inLibrairy}
      title:e.title,
      image:e.image,
      authors:e.authors,
      illustrators:e.illustrator,
      rating:e.rating
    })
  })
///////////////////////////////////////////////////////////////////  mySuggest ou suggestBooks
  var Suggest = suggestBooks.map((e,i)=>{
  
    return({
      //inLibrairy={e.inLibrairy}
      key:i,
      title:e.title,
      image:e.image,
      authors:e.authors,
      illustrators:e.illustrator,
      rating:e.rating
    })
  })
/////////////////////////////////////////////////////////
  return (
     <View style={{ flex: 1, width:"100%", backgroundColor:'white'}}>
       <View style={{ flexDirection:"row", marginTop:25}}>
       <Image
          style={{width: 40, height: 40, margin:5}}
          source={require('../assets/logoOrigapp.png')}
        />  
        <Text style={{ marginTop:15,marginLeft:5, fontSize:15, fontWeight:"500"}}>OrigApp</Text>
       </View>
        <View style={{ flexDirection:"row",justifyContent:"center", alignItems:'center', marginTop:10}}>
          
        <Text style={{fontSize:32, color:color("red")}}>Bibliothèque</Text>
        
        </View>

        <ScrollView stickyHeaderIndices={[3]}>

          <View style={{ flexDirection:"row",
                        justifyContent:"flex-start", 
                        alignItems:'center', 
                        marginTop:10, 
                        marginLeft:10}}>
            <Text style={{color:"#F9603E"}}>Mes dernières lectures</Text>
         </View>

         <View style={{ flexDirection:"row",
                        justifyContent:"flex-start", 
                        alignItems:'center',
                        marginTop:10}}>
            <Carrousel data={latestBooks}/>
          </View>

         <View  style={{ flexDirection:"row",justifyContent:"center", alignItems:'center'}}>
          <Divider style={{ backgroundColor: '#F9603E', width:"60%", /*opacity:"50%"*/ marginTop:15}} />
        </View>

          <View style={{ flexDirection:"row", 
                        justifyContent:"flex-start",
                        alignItems:'center',
                        marginTop:10,
                        marginLeft:10,
                        paddingBottom:5, 
                        backgroundColor:'white'}}>
          <Text style={{color:"#F9603E"}}>Mes livres</Text>
          </View>   
          
          <ScrollView contentContainerStyle={{padding: 5}}>
            <View style={{
                flex: 1,
                flexDirection:"row",
                justifyContent:"space-around",
                flexWrap: 'wrap',
                margin:"auto"  
              }}>
                {mesLivres.length==0?(<Text>Aucun livre dans votre bibliothèque</Text>):Book}      
            </View>

            <View  style={{ flexDirection:"row",justifyContent:"center", alignItems:'center'}}>
              <Divider style={{ backgroundColor: '#F9603E', width:"60%", /*opacity:"50%"*/ marginTop:15}} />
            </View>

            <View style={{ flexDirection:"row", 
                        justifyContent:"flex-start",
                        alignItems:'center',
                        marginTop:10,
                        marginLeft:8,
                        //paddingBottom:5, 
                        backgroundColor:'white'}}>
          <Text style={{color:"#F9603E"}}>Vous devriez aimer</Text>
          </View>

            <View style={{ flexDirection:"row",
                        justifyContent:"flex-start", 
                        alignItems:'center',
                        marginTop:10}}>
            <Carrousel data={Suggest}/>
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
};

function mapStateToProps(state) {
  return { storeLibrairy: state.storeLibrairy,
          token: state.reducerToken
   }
}
export default withNavigation(connect(mapStateToProps)(Library))
