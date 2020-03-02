import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput, ImageBackground,AsyncStorage } from 'react-native';
import { Button,Input,Icon } from 'react-native-elements';



function Library(props) { 



// RETURN GLOBAL DE LA PAGE

    return (
      <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Hello Library</Text>
          <Button
                onPress={() => props.navigation.navigate('Home')}
                style ={{ color:'red', marginTop:"5em"}}
                icon={{
                    name: "arrow-right",
                    size: 15,
                    color: "white"
                }}
                title="go search/home"
            />
      </View>
    );
  }


  



  export default Library;