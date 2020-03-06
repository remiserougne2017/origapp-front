import React, { useState, useEffect } from 'react';
import {ScrollView, Text, View,Image,TouchableOpacity } from 'react-native';
import { Divider  } from 'react-native-elements';
import Books from './Books'
import {connect} from 'react-redux';
import FlashMessage from "react-native-flash-message";
import Carrousel from './Carrousel';
import { withNavigation } from 'react-navigation';
import color from './color';

function Library(props) {

  const [cataList,setCataList]=useState([]);
  const [errorMessage,setErrorMessage]=useState('')
  const [bestRated, setBestRated]=useState('')
  

  
   // Initialisation du composant
   useEffect(()=>{
    const catalogue = async() =>{
      
      console.log("WELCOME HOME")
      var responseFetch = await fetch(`http://10.2.5.202:3000/home/homePage/dTsvaJw2PQiOtTWxykt5KcWco87eeSp6`)
      var bookList = await responseFetch.json();
      setCataList(bookList.livreMin)
      setBestRated(bookList.livresMieuxNotes)
      
    };
    catalogue();
    
    
  },[])

  //RS creation du tableau de books pour afficher le catalogue
  var Book = cataList.map((e,i)=>{
   return(
    <Books id={e.id} key={i}  inLibrairy={e.inLibrairy} title={e.title} image={e.image} authors={e.authors} illustrators={e.illustrator} rating={e.rating} />
   )
  })

  return (
     <View style={{ flex: 1, width:"100%", backgroundColor:'#EEEEEE'}}>
       <View style={{ flexDirection:"row", marginTop:25}}>
       <Image
          style={{width: 40, height: 40, margin:5}}
          source={require('../assets/logoOrigapp.png')}
        />  
        <Text style={{ marginTop:15,marginLeft:5, fontSize:15, fontWeight:"500"}}>OrigApp</Text>
       </View>
        <View style={{ flexDirection:"row",justifyContent:"center", alignItems:'center', marginTop:10}}>
          
        <Text style={{fontSize:32, color:color("red")}}>Ma Bibliothèque</Text>
        
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
            <Carrousel data={bestRated}/>
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
                        backgroundColor:'#EEEEEE'}}>
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
                {errorMessage!=""?<Text>{errorMessage}</Text>:null}
                {Book}            
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
                        backgroundColor:'#EEEEEE'}}>
          <Text style={{color:"#F9603E"}}>Vous devriez aimer</Text>
          </View>

            <View style={{ flexDirection:"row",
                        justifyContent:"flex-start", 
                        alignItems:'center',
                        marginTop:10}}>
            <Carrousel data={bestRated}/>
          </View>
            </ScrollView>
           
          </ScrollView>   
          <FlashMessage position="top" />
    </View>    
  );
}

function mapStateToProps(state) {
  return { storeLibrairy: state.storeLibrairy,
   }
}
export default withNavigation(connect(mapStateToProps)(Library))
