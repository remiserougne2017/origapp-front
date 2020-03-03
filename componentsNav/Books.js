import React,{useState} from 'react';
import { View, Text, Image } from 'react-native'
import { Card, Icon,Rating,CheckBox  } from 'react-native-elements'
// import {Col} from 'reactstrap';
// import { Rating, AirbnbRating } from 'react-native-elements';

const Book = (props) => {

    const [isCheck, setIsCheck]=useState(false)

    if(isCheck){

    }else{

    }

return (
            <Card containerStyle={{width:"45%",padding:2,backgroundColor:"white", marginLeft:"1%", marginRight:"1%"}}>
                <Image
                    style={{width:"100%",height:250}}
                    resizeMode="cover"
                    source={{ uri: props.url }}
                />
                <CheckBox 
                    onPress={() => setIsCheck(!isCheck)}
                    checked={isCheck}
                    checkedColor="#F9603E"
                    containerStyle={{position: "absolute",
                                    right: -30,
                                    top: -23}}
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
      );
};

export default Book