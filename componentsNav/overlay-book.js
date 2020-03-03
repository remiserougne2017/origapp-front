import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput, ImageBackground,AsyncStorage } from 'react-native';
import { Button,Input,Icon,Overlay,Badge,Card } from 'react-native-elements';



function OverlayContent() { 


// RETURN GLOBAL DE LA PAGE

    return (
    <Overlay 
        height= {"98%"}
        width={"98%"}
        isVisible={true}
        >
        <View style = {{display:"flex",flexDirection:"row", width:'100%'}}>
            <Badge value={<Text style={{marginRight:'auto',color: 'white',  paddingLeft:7,paddingRight:7,paddingTop:9, paddingBottom:12}}>Page XXX</Text>}
                badgeStyle={{backgroundColor:"grey"}}
            />
            <Icon 
                containerStyle={{marginLeft:'auto'}}
                name= "closecircleo" type='antdesign'  size= {20}
                onPress={() => console.log("star this book")}
            />
        </View>
        <View>
            <Text>Bonjour Overlay 2</Text>
        </View>
        <View>
            <Card
                title='HELLO WORLD'
            >
                <Text style={{marginBottom: 10}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
            </Card>

        </View>

    </Overlay>
    );
  }


  



  export default OverlayContent;