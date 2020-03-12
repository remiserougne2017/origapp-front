import React, {useRef, useState, useEffect} from 'react';
import {Text, View, SafeAreaView, Image } from 'react-native';
import {Rating} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

function Carrousel(props) {

    const[activeIndex, setActiveIndex] = useState('')
    const [carrouselList,setCarrouselList]=useState([]);

    console.log("PROPS DATA",props.data)
    var carrousel = useRef(null)
    
  var _renderItem = ({item, index}) => {
        return (
           <View style={{justifyContent:'center'}}>
                <TouchableOpacity
                  onPress={() =>props.navigation.navigate('BookContent',{idBook:item._id})}>    
                    <Image  style={{ width:"80%", height: 140}} source={{uri: item.image}}/> 
                    <Text style={{fontSize:11}}>{item.authors}</Text>
                    {/* <Text style={{fontSize:11}}>{item.publisher}</Text> */}
                    <Rating
                        style={{marginTop:3}}
                        imageSize={10}
                        readonly
                        startingValue={item.rating}
                        ratingBackgroundColor='red'
                        />
                </TouchableOpacity>
            </View>
        );
    } 

        return (
            <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Carousel
                  layout={"default"}
                  ref={ref => carrousel = ref}
                  data={props.data}
                  sliderWidth={250}
                  itemWidth={130}
                  renderItem={_renderItem}
                  loop={true}
                  onSnapToItem = { index =>setActiveIndex({index}) } />
            </View>
        );
    
}

export default withNavigation(Carrousel) 