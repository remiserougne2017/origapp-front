import React, { useState, useEffect } from 'react';
import { StyleSheet,ScrollView, Text, View,Image } from 'react-native';
import { SearchBar, Badge,Divider  } from 'react-native-elements';
// import { Container, Row } from 'reactstrap';
import Books from './Books'
import { set } from 'react-native-reanimated';

export default function Home(props) {
  const [textSearch, setTextSearch] = useState("");
  const [cataList,setCataList]=useState([{title: "Novo", url:"https://upload.wikimedia.org/wikipedia/commons/1/1f/Stories_for_summer_days_and_winter_nights.jpg",
                                            author:"Eloise B."},{title: "Novo", url:"https://upload.wikimedia.org/wikipedia/commons/1/1f/Stories_for_summer_days_and_winter_nights.jpg",
                                            author:"Eloise B."},{title: "Novo", url:"https://upload.wikimedia.org/wikipedia/commons/1/1f/Stories_for_summer_days_and_winter_nights.jpg",
                                            author:"Eloise B."},{title: "Novo", url:"https://upload.wikimedia.org/wikipedia/commons/1/1f/Stories_for_summer_days_and_winter_nights.jpg",
                                            author:"Eloise B."}]);

  // useEffect(()=>{
  //   const catalogue = async()=>{
  //     console.log("WELCOME HOME")
  //     var responseFetch = await fetch('http://10.2.5.203:3000/homePage')
  //     var bookList = await responseFetch.json();
  //     console.log("Hello init catalogiue",bookList)
  //     setCataList(bookList)
  //   };
  //   catalogue();
  // },[])

  //RS creation du tableau de books pour afficher le catalogue
  var Book = cataList.map((e,i)=>{
   return(
    <Books key={i} title={e.title} url={e.url} author={e.author} illustrator={e.illustrator} />
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
          inputContainerStyle={{backgroundColor:"none"}}
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
        <View style={{flex:1, padding:10}}>
        <ScrollView contentContainerStyle={{height:100, padding: 10, width:'100%'}}>
            <View style={{width:"100%"}}>
                {Book}
          </View>
        </ScrollView>
        </View>
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
