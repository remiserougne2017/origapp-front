import React,{useState} from 'react';
import { View, Text, Image } from 'react-native'
import { Card,Rating,CheckBox  } from 'react-native-elements'
import {connect} from 'react-redux';
const Book = (props) => {

    //booleen pour la checkBox d'ajout à la bibli
const [isCheck, setIsCheck] = useState(props.inLibrairy)

console.log("check?",isCheck, props.storeLibrairy)

//Function appel route addLibrairy
const addLibrairy = async (id,bool) => {
    console.log("function addLibr, isCheck?",bool, id)

    var responseFetch = await fetch(`http://192.168.43.90:3000/home/addLibrairy/${id}/${bool}`)
    var resp = await responseFetch.json();
    console.log("retour addLibrairy",resp)

    setIsCheck(!bool)
    props.manageLibrairy(id,bool)
}

return (
            <Card containerStyle={{width:"45%",padding:2,backgroundColor:"white", marginLeft:"1%", marginRight:"1%"}}>
                <Image
                    style={{width:"100%",height:250}}
                    resizeMode="cover"
                    source={{ uri: props.image }}
                />
                <CheckBox 
                    onPress={() =>{addLibrairy(props.id,!isCheck);console.log("onPRess")}}
                    checked={props.inLibrairy}
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
  }

  
  
  export default connect(null,mapDispatchToProps)(Book)