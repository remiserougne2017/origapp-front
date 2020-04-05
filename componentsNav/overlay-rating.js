import React,{useState} from 'react';
import { View, Text, TextInput,KeyboardAvoidingView, Keyboard,ImageBackground } from 'react-native';
import { Card,Overlay, Button, Icon } from 'react-native-elements';
import {Rating} from "react-native-ratings";
import color    from './color';
import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';
import Ip from './Ip'

const RatingPage = (props) => {
  // console.log("IsVisible overlay component?",props.isVisible)
    const ip="192.168.1.28"
    const[userComment,setUserComment]=useState('')
    const [isVisible,setIsvisible]=useState(props.isVisible)
    const [userRating,setUserRating]=useState()
  
  const  ratingCompleted = (rating)=> {
        console.log("Rating is: " + rating)
        setUserRating(rating)
      }
     
    const sendComments = async ()=>{
      console.log("envoyer comment",props.token,props.idBook,userRating)
      var comment =  await fetch(`${Ip()}/books/comments`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `comment=${userComment}&token=${props.token}&idBook=${props.idBook}&rating=${userRating}`
          })
          // setIsvisible(false);
          props.parentRatingFunction(false)
          console.log("")
        };

      const onClickCancel =()=>{
        console.log("PRESS annuler");
        setIsvisible(false);
        setUserComment("");
        Keyboard.dismiss();
        props.parentRatingFunction(false)
      }

 return (
         <Overlay isVisible={props.isVisible} fullScreen={true}>   
          <View style={{flex:1, justifyContent:"center", alignItems:"center", width:"100%"}}>
          <Text style={{fontSize:20,marginTop:30, marginBottom:10, marginRight:40,marginLeft:40}}>Glissez votre note!</Text>
            <View style={{width:"90%",justifyContent:"center", backgroundColor:"white",borderRadius:10 }}>
                <Rating
                    type='star'
                    startingValue
                    ratingCount={5}
                    imageSize={30}
                    onFinishRating={ratingCompleted}
                    style={{marginTop:10, marginBottom:10}}
                    />
            </View>
              <View style={{flex:2,width:"90%",borderBottomWidth:1,borderTopWidth:1,
              marginTop:25, marginBottom:20, backgroundColor:"white",borderRadius:10}}>
                <TextInput
                  style={{marginLeft:10, marginTop:10}}
                  multiline={true}
                  onChangeText={(text) => setUserComment(text)}
                  value={userComment}
                  placeholder = "Rédigez votre avis..."
                  />
                         
              </View>
            <View style={{flex:1,flexDirection:"row",marginTop:50}}>
              <Button 
                buttonStyle={{backgroundColor:"transparent"}}
                titleStyle={{color:"black",textDecorationLine:'underline', fontWeight:"300"}}
                containerStyle={{marginRight:10,marginBottom:40}}
                onPress={()=>{onClickCancel()}}
                title="Annuler" />
              <Button 
                buttonStyle={{backgroundColor:color("blue")}}
              containerStyle={{marginBottom:40}}
              onPress={()=>{console.log("PRESS envoyer");sendComments()}}
              title="Envoyer" />
            </View>
          </View>
          
        </Overlay>
 )
}

function mapStateToProps(state) {
  return { 
      token: state.reducerToken,
  }
  }
  export default withNavigation(connect(mapStateToProps,null)(RatingPage))