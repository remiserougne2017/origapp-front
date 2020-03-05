import React, {useRef, useState, useEffect} from 'react';
import {Text, View, SafeAreaView, Image } from 'react-native';
import {Rating} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import Books from './Books.js'

function Carrousel(props) {

    const[activeIndex, setActiveIndex] = useState('')
    const [carrouselList,setCarrouselList]=useState([]);

    var Book = carrouselList.map((e,i)=>{
        return(
         <Books id={e.id} key={i}  inLibrairy={e.inLibrairy} title={e.title} image={e.image} authors={e.authors} illustrators={e.illustrator} rating={e.rating} />
        ) 
     }) 

     console.log(Book)

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
                <TouchableOpacity
                  onPress={() =>props.navigation.navigate('BookContent',{idBook:'5e5fd3b2a2f6a844f031ec1c'})}>    
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
                </TouchableOpacity>
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

export default withNavigation(Carrousel) 