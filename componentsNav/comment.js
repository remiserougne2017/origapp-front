import React,{useState} from 'react';
import { View, Text, Image } from 'react-native'
import { Card,Rating,CheckBox,ListItem  } from 'react-native-elements'
import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';
import color from './color';
import Ip from './Ip'; // A enlever en production !

function Comments(props) { 
    var displayComment = props.data.map((obj, k) => {

        return (
            <View style ={{backgroundColor:'white',marginBottom:5,borderRadius:10,flexDirection:'row',alignItems:'center'}}>
                <Image 
                    style={{ height: 50,width:50,borderRadius:100,margin:20}}
                    source= {{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}       
                    />
                <View style = {{width:'80%'}}>
                <Text style = {{fontStyle:'italic'}}>{obj.userName}</Text>
                <Rating
                    style={{marginTop:5,marginRight:'auto'}}
                    imageSize={15}
                    readonly
                    startingValue={obj.rating}
                        />
                <Text style = {{width:'90%',marginBottom:10}}>{obj.com}</Text>
     
                </View>

          </View>
    )
        })

return (
            <View>
                {displayComment}
            </View>
      );
};


function mapStateToProps(state) {
    return { commentsData: state.contentComment,
     }
  }  
  
  export default withNavigation(connect(mapStateToProps,null)(Comments))