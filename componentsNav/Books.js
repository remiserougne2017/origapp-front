import React from 'react';
import { View, Text, Image } from 'react-native'
import { Card, Icon,Rating  } from 'react-native-elements'
// import {Col} from 'reactstrap';
// import { Rating, AirbnbRating } from 'react-native-elements';

const Book = (props) => {
// implemented without image with header
return (
    // <View style={{flex:1,flexDirection:"row"}}>
        <View style={{width:"50%"}}>
            <Card containerStyle={{width:"100%", backgroundColor:"white", padding :0, marginLeft:5, marginRight:0}}>
            <Image
                style={{width:"100%",height:250}}
                resizeMode="cover"
                source={{ uri: props.url }}
               
            />
             <Icon containerStyle={{position: "absolute",
                                    right: -10,
                                    top: -15}}
                name='ios-checkmark-circle'
                type='ionicon'
                color='#F9603E'
                />
            <View style={{flexDirection:"column", alignItems:"flex-start", padding:10}}>
                <Text>{props.editors}ed. Sabot Rouge 2020{props.years}</Text>
                <Text>author illustrator</Text>
                <Rating
                style={{marginTop:5}}
                    imageSize={15}
                    readonly
                    startingValue={2}
                    />
            </View>
            </Card>
        </View>      
      );
};

export default Book