import React,{useState} from 'react';
import { View, Text, Image } from 'react-native'
import { Card,Rating,CheckBox  } from 'react-native-elements'
import {connect} from 'react-redux';
import {showMessage, hideMessage } from "react-native-flash-message";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import color from './color';
import Ip from './Ip'; // A enlever en production !

const Book = (props) => {
  

//Function d'appel route lastRead

const lastRead = () => {

  console.log('last read')
}

//booleen pour la checkBox d'ajout à la bibli
const [isCheck, setIsCheck] = useState(props.inLibrairy)

//Function appel route addLibrairy
const addLibrairy = async (id,bool) => {
  console.log("Fetch addlibrairy",bool)
    var responseFetch = await fetch(`${Ip()}:3000/home/addLibrairy/${id}/${bool}/${props.token}`)
    var resp = await responseFetch.json();
    console.log("retour route librairy",resp)
    if(resp){
      setIsCheck(bool)
      
      props.manageLibrairy(id,bool)
      showMessage({
          message: resp.mess,
          type: resp.type,
          icon:"auto",
          backgroundColor:"#8FB2C9"
        });
    }
  }
return (
      <Card 
        containerStyle={{width:"45%",padding:2,backgroundColor:"white", marginLeft:"1%", marginRight:"1%"}}
        >
          <TouchableOpacity
            onPress={() =>{props.navigation.navigate('BookContent',{idBook:props.id}), lastRead()}}
                              >
          <Image
              style={{width:"100%",height:250}}
              resizeMode="cover"
              source={{ uri: props.image }}
          />
          </TouchableOpacity>
          <CheckBox 
              onPress={() =>{addLibrairy(props.id,!props.inLibrairy);
                console.log("ONPRESS",props.inLibrairy)}}
              checked={isCheck}
              checkedColor="#F9603E"
              containerStyle={{position: "absolute",
                              right: -30,
                              top: -23}}
              />

      <View style={{flexDirection:"column", alignItems:"flex-start", padding:10}}>
          <Text>{props.editors}{props.years}</Text>
          <Text>{props.authors} {props.illustrators}</Text>
          <Rating
          style={{marginTop:5}}
              imageSize={15}
              readonly
              startingValue={props.rating}
              />
      </View>
      </Card>
      );
};

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
  
  export default withNavigation(connect(mapStateToProps,mapDispatchToProps)(Book))