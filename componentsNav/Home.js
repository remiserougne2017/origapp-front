import React, { useState, useEffect } from 'react';
import { StyleSheet,ScrollView, Text, View,Image } from 'react-native';
import { SearchBar, Badge,Divider  } from 'react-native-elements';
// import { Container, Row } from 'reactstrap';
import Books from './Books'
import { set } from 'react-native-reanimated';
import {connect} from 'react-redux';

function Home(props) {
  const [textSearch, setTextSearch] = useState("");
  const [cataList,setCataList]=useState([]);

  useEffect(()=>{
    const catalogue = async() =>{
      console.log("WELCOME HOME")
      var responseFetch = await fetch('http://192.168.43.90:3000/home/homePage/dTsvaJw2PQiOtTWxykt5KcWco87eeSp6')
      var bookList = await responseFetch.json();
      setCataList(bookList.livreMin)
      
    };
    catalogue();
    librairyToStore();
  },[])

  //pour charger le store Redux avec la biblio du user
 const librairyToStore= ()=>{
  var newCataList = cataList.map(e=>{
    if(e.inLibrairy){
      props.manageLibrairy(e.id,true)
    }
  })
 }
     
  console.log("STore librairy",props.storeLibrairy)
  //RS creation du tableau de books pour afficher le catalogue
  var Book = cataList.map((e,i)=>{
    
   return(
    <Books id={e.id} key={i} inLibrairy={e.inLibrairy} title={e.title} image={e.image} authors={e.authors} illustrators={e.illustrator} rating={e.rating} />
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
          <View style={{margin:10}}>
            <Badge value={<Text style={{color: 'white', paddingLeft:7,paddingRight:7,paddingTop:9, paddingBottom:12}}>Jeunesse</Text>}
              badgeStyle={{backgroundColor:"grey"}}
            />
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