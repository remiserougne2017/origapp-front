import React,{useState} from 'react';
import { View, Text, Image } from 'react-native'
import { Card,Rating,CheckBox,ListItem,Icon  } from 'react-native-elements'
import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';
import color from './color';
import Ip from './Ip'; // A enlever en production !

function Comments(props) { 
    var displayComment = props.data.map((obj, k) => {

        return (
            <View key = {k} style ={{marginBottom:5,borderRadius:10,flexDirection:'row',alignItems:'center',borderColor:"#ECECEC",borderWidth:1}}>
                 <View style = {{borderColor:'grey',borderWidth:1,borderRadius:100,margin:10}}>
                    <Icon 
                        name= 'user'
                        type= 'font-awesome'
                        size={30}
                        color= 'grey'
                        containerStyle={{marginLeft:10,marginRight:10}}
                    />
                 </View>
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