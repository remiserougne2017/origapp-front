import React, { useState } from 'react';
import { StyleSheet,ScrollView, Text, View,Image } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function Home() {
  const [textSearch, setTextSearch] = useState("")

  return (
     <View style={{ flex: 1}}>
       <View style={{ flexDirection:"row"}}>
       <Image
          style={{width: 40, height: 40, margin:5}}
          source={require('./assets/logo.svg')}
        />
        <Text style={{ marginTop:15,marginLeft:5, fontSize:15, fontWeight:"500"}}>OrigApp</Text>
       </View>
        <View>
          <SearchBar
          placeholder="Recherche..."
          onChangeText={(value)=> setTextSearch(value)}
          value={textSearch}
        />
        </View>
       
            
            <ScrollView style={{width:"100%"}}>
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
