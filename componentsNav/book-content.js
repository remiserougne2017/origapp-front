import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput, ImageBackground,AsyncStorage,Image} from 'react-native';
import { Button,Input,Icon,Card,Divider,Badge} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';


function BookContent(props) { 

    const dataBook = {
        idBook : "_idLivre",
        title : "L'Ara de Rosa",
        author : "Pierre-Yves Cezard",
        description : 'Premier opus des aventures des animaux de Rosa Bonheur, grand peintre animalier du 19ème siècle.Une bd pour les enfants (à partir de 6 ans)',
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/71ZHiL8SNBL.jpg',
        tag : ['jeunesse', 'animaux'],
        status: 'published',
        rating: 3,
        votes: 30,
        view: 120,
        contents : [
        {
            idContent: 'idContent',
            contentTitle: 'Titre du contenu 1',
            pageNumber: 3,
            contentStatus: 'published'
        },
        {
            idContent: 'idContent',
            contentTitle: 'Titre du contenu 2 de la page 3',
            pageNumber: 3,
            contentStatus: 'published'
        },
        {
            idContent: 'idContent',
            contentTitle: 'Titre du contenu 3 de la page 3',
            pageNumber: 3,
            contentStatus: 'published'
        },
        {
            idContent: 'idContent',
            contentTitle: 'Titre du contenu 2, premier contenu de la page 7',
            pageNumber: 7,
            contentStatus: 'published'
        },
        {
            idContent: 'idContent',
            contentTitle: 'Titre du contenu 3 de la page 10',
            pageNumber: 10,
            contentStatus: 'published'
        },
        {
            idContent: 'idContent',
            contentTitle: 'Titre du deuxieme contenu de la pge 7',
            pageNumber: 7,
            contentStatus: 'published'
        }
        ,
        {
            idContent: 'idContent',
            contentTitle: 'Titre du contenu 3 de la page 10',
            pageNumber: 12,
            contentStatus: 'published'
        },
        {
            idContent: 'idContent',
            contentTitle: 'Titre du deuxieme contenu de la pge 7',
            pageNumber: 15,
            contentStatus: 'published'
        }
    ]
    }

    const publisher = {publisher: "Les Editions du Sabot Rouge"}

    const dataComments = [
        {
            book: "Le Ara de Rosa",
            date: '11111111111',
            rating: 2,
            text: "Bof ce livre",
            idUser: 'user1'
        },
        {
            book: "Le Ara de Rosa",
            date: '11111111111',
            rating: 5,
            text: "Super ce livre. IL est vraiment génia let puis c'est bien pour les enfants.énia let puis c'est bien pour les enfantsénia let puis c'est bien pour les enfants.énia let puis c'est bien pour les enfantsénia let puis c'est bien pour les enfantsénia let puis c'est bien pour les enfants ",
            idUser: 'user1'
        }
    ]

// Construction d'un tableau pour génèrer les card par page 
    let arrayPage = []
    for(let i=0;i<dataBook.contents.length;i++){
        if(arrayPage.indexOf(dataBook.contents[i].pageNumber)==-1)
        { 
            arrayPage.push(dataBook.contents[i].pageNumber);
        }
    }
    let organisedContent = []
    for(let j=0;j<arrayPage.length;j++){
        let newArray = dataBook.contents.filter(obj => obj.pageNumber == arrayPage[j]);
        let containerArray = {
            pageNumber: arrayPage[j],
            allContents:newArray
        }
        organisedContent.push(containerArray)
    }


// Card Creation  
let arrayColor = ['#F29782','#F4F4F4','#F9603E']
let cardDisplay = organisedContent.map((obj,i) => {
    let color; let colorFont;
    if(i%4==0) {color= '#F9603E';colorFont="white"} else if (i%3==0) {color= '#F4F4F4';colorFont="black"} else {color= '#F29782',colorFont="black"}
    let titleList = obj.allContents.map((e,j)=>{
        return (
            <View >
                <Text style={{marginBottom: 10, color:colorFont}}>
                {e.contentTitle}
                </Text>
                <Divider style={{ backgroundColor: '#252525', width:"60%", opacity:"50%", marginTop:15}} />
            </View>
            
        )
    })

    return (
            <Col xs='6'>
                <View style = {{backgroundColor:color, marginBottom:10,borderRadius:5,padding:5, shadowOffset:{  width: 5,  height: 5,  },shadowColor: 'grey',shadowOpacity: 0.3,}}>
                    <Badge value={<Text style={{color: 'white', paddingLeft:7,paddingRight:7,paddingTop:9, paddingBottom:12,fontSize:9}} >page {obj.pageNumber}</Text>}
                        badgeStyle={{backgroundColor:"#252525",opacity:"50%",border: "none"}}
                    />
                <View style = {{justifyContent: 'center'}}>
                    {titleList}
                </View>
                </View>
            </Col>
)})

// style variable 








// RETURN GLOBAL DE LA PAGE

    return (
    <ScrollView>
        <ImageBackground>        
                <View  style = {{ flex: 1, alignItems: 'center', justifyContent: 'center',marginLeft:20, marginRight:20}}>
                    <Icon 
                        name= "staro" type='antdesign'  size= {40}
                        onPress={() => console.log("star this book")}
                    />
                    <View >
                        <Image 
                            style={{width: 250, height: 300, marginTop:20}}
                            source= {dataBook.coverImage}
                        />
                        <Text>{dataBook.author}</Text>
                        <Text>{publisher.publisher}</Text>                        
                    </View>
                    <View>
                        <Text style={{fontSize:30,marginTop:20,marginBottom:10}}>{dataBook.title}</Text>
                        <Text >{dataBook.description}</Text>
                    </View>
                </View>
                <View style = {{marginTop:20,marginLeft:20, marginRight:20}}>
                    <Text style={{fontSize:25,marginTop:20,marginBottom:10}}>Les contenus à découvrir</Text>
                    <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Container>
                            <Row>
                                {cardDisplay}
                            </Row>
                        </Container>
                    </View>
                </View>
                <View  style={{ flexDirection:"row",justifyContent:"center", alignItems:'center'}}>
                    <Divider style={{ backgroundColor: '#F9603E', width:"60%", opacity:"50%", marginTop:15}} />
                </View>
                <View style = {{marginTop:20,marginLeft:20, marginRight:20}}>
                    <Text style={{fontSize:25,marginTop:20,marginBottom:10}}>Les avis et commentaires</Text>
  
                </View>

        </ImageBackground>
    </ScrollView>

    );
  }


  



  export default BookContent;