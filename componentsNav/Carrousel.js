import React, {useRef, useState, Component} from 'react';
import {Text, View, SafeAreaView, Image } from 'react-native';
import {Rating} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel'

function Carrousel() {

    const[activeIndex, setActiveIndex] = useState('')

    var carrousel = useRef(null)
    var images = [
        {image:"https://pictures.abebooks.com/CHAPITRE/30288061748.jpg",
         author:"Harrison F.",
         publisher: "Les éditions du Sabot Rouge" },
        {image:"https://pictures.abebooks.com/RECYCLIVRE/30505372741.jpg",
         author:"Charlotte P.",
         publisher: "Les éditions du Sabot Rouge"},
        {image:"https://pictures.abebooks.com/isbn/9782809805642-fr.jpg",
         author:"Pierre H.",
         publisher: "Les éditions du Sabot Rouge"},
    ]
    
  var _renderItem = ({item, index}) => {
        return (
           <View style={{
               justifyContent:'center',
               // backgroundColor:'floralwhite',
               // borderRadius: 5,
                //height: 250,
                //padding: 50,
                //marginLeft: 5,
                /* marginRight: 5, */ }}>
                 <Image  style={{ width:"80%", height: 140}} source={{uri: item.image}}/> 
                 <Text style={{fontSize:11}}>{item.author}</Text>
                 <Text style={{fontSize:11}}>{item.publisher}</Text>
                 <Rating
                    style={{marginTop:3}}
                    imageSize={10}
                    readonly
                    startingValue={3}
                    ratingBackgroundColor='red'
                    />
                 
            </View>
        );
    } 

   
        return (
            <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Carousel
                  layout={"default"}
                  ref={ref => carrousel = ref}
                  data={images}
                  sliderWidth={250}
                  itemWidth={130}
                  renderItem={_renderItem}
                  loop={true}
                  onSnapToItem = { index =>setActiveIndex({index}) } />
            </View>
        );
    
}

export default Carrousel