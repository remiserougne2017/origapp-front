import React, {useState, useEffect} from 'react';
import { View, Text, Image } from 'react-native'
import { Card, ListItem, Button, Icon,Rating  } from 'react-native-elements'
import {Col} from 'reactstrap';

const Book = (props) => {
// implemented without image with header
return (
    // <View style={{flex:1,flexDirection:"row"}}>

        <Col xs="6">
            <Card containerStyle={{width:"100%", backgroundColor:"none", padding :0, marginLeft:5, marginRight:0}}>
            <Image
                style={{width:"100%",height:250}}
                resizeMode="cover"
                source={{ uri: props.url }}
            />
                <Text>{props.editors} {props.years}</Text>
                <Text>author illustrator</Text>
            <Rating 
                ratingBackgroundColor="none"
                count={5}
                ratingCount={5}
                imageSize={15}
            type='star'
            />
            </Card>
        </Col>
      );
}
export default Book;