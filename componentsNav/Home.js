import React, { useState, useEffect } from 'react';
import { StyleSheet,ScrollView, Text, View,Image } from 'react-native';
import { SearchBar,Avatar, Badge, Icon, withBadge,Divider  } from 'react-native-elements';
import {Col} from 'reactstrap';
import Book from './Books'
import { set } from 'react-native-reanimated';

export default function Home() {
  const [textSearch, setTextSearch] = useState("");
  const [cataList,setCataList]=useState([]);


  useEffect(()=>{
    const catalogue = async()=>{
      var responseFetch = await fetch('http://10.2.5.203:3000/homePage')
      var bookList = await responseFetch.json();
      console.log(bookList)
      setCataList(bookList)
    };
  },[])

  //RS creation du tableau de books pour afficher le catalogue
  var book = cataList.map((e,i)=>{
   return(
    <Books title={e.title} url={e.url} author={e.author} illustrator={e.illustrator} />
   ) 

  })

  return (
     <View style={{ flex: 1, width:"100%"}}>
       <View style={{ flexDirection:"row"}}>
       <Image
          style={{width: 40, height: 40, margin:5}}
          source={require('../assets/logo.svg')}
        />
        <Text style={{ marginTop:15,marginLeft:5, fontSize:15, fontWeight:"500"}}>OrigApp</Text>
       </View>
        <View style={{ flexDirection:"row",justifyContent:"center", alignItems:'center', marginTop:10}}>
          <SearchBar 
          containerStyle={{width:'80%', borderRadius:20, backgroundColor:'none'}}
          inputContainerStyle={{backgroundColor:""}}
          lightTheme="true"
          placeholder="Recherche..."
          onChangeText={(value)=> setTextSearch(value)}
          value={textSearch}
        />
         <Image
          style={{width: 40, height: 40, marginLeft:10}}
          source={require('../assets/qr-scan.png')}
        />
        </View> 
        <View name="Tags" style={{ flexDirection:"row",justifyContent:"left", alignItems:'center', marginTop:10, marginLeft:18, width:"100%"}}>
          <Col sm="3">
            <Badge value={<Text style={{color: 'white', paddingLeft:7,paddingRight:7,paddingTop:9, paddingBottom:12}}>Jeunesse</Text>}
              badgeStyle={{backgroundColor:"grey"}}
            />
          </Col>
        </View>
        <View  style={{ flexDirection:"row",justifyContent:"center", alignItems:'center'}}>
          <Divider style={{ backgroundColor: '#F9603E', width:"60%", opacity:"50%", marginTop:15}} />
        </View>
        <View style={{ flexDirection:"row",justifyContent:"left", alignItems:'center', marginTop:10, marginLeft:18}}>
          <Text style={{color:"#F9603E"}}>Les mieux notés</Text>
        </View>
        <View style={{ flexDirection:"row",justifyContent:"left", alignItems:'center', marginTop:10, marginLeft:18}}>
          <Text style={{color:"#F9603E"}}>Catalogue</Text>
        </View>
        
        <ScrollView style={{width:"100%"}}>
          <Book/>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
