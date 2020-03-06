import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import {Card, Badge,ListItem, Button, Rating } from 'react-native-elements';
// npm install --save-dev @iconify/react @iconify/icons-feather
 import { Icon, InlineIcon } from '@iconify/react'; 
import checkCircle from '@iconify/icons-feather/check-circle';
import circleIcon from '@iconify/icons-feather/circle';


/* 
import {connect} from 'react-redux';
 */
function Book() {
    return(

     
    
  

<Card>

  <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
  <Image
          style={{width: 100, height: 100, margin:0}}
            
            
          source={require("./assets/couv.jpg")}
        />
  <Text style={{marginBottom: 10}}>
    Auteur
  </Text>
  <Icon icon={circleIcon} style={{ position: 'absolute', top: 50, right: 5 }}/>
  <Icon icon={checkCircle} />
  <Rating
            type='star'/>
         </View>   
</Card>

    ) 


}

export default Book
/* resizeMode="cover" */

/*  users.map((u, i) => { */

   /*  <Button
    icon={<Icon name='code' color='#ffffff' />}
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='VIEW NOW' /> */

        


    /* <Card >
  
         <View style={{padding:0, margin:0}}  > 
          <Image
            source="http://www.hokuspokuscreations-edition.com/scripts/files/580d1d9f478144.63004306/couverture_livre_muse-1.jpg" 
            style={{width: 200, height: 200, padding: 0, margin:0 }}
            /* style={styles.image} */
            
/* {("http://www.hokuspokuscreations-edition.com/scripts/files/580d1d9f478144.63004306/couverture_livre_muse-1.jpg")}> */
          