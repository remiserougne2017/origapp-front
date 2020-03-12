import React from 'react';
import {StyleSheet} from 'react-native';
import color from '../componentsNav/color';


const style = StyleSheet.create({
    mainTitle: {
        // applied to main titles 
        fontSize:32, 
        color:color("red"),
        fontFamily:'Montserrat'
    },  
    secondaryTitle: {
        // applied to home subtitles and mylibrary subtitles
        color:color("red"),
        fontFamily:'Montserrat'},
    // button: {
    //   fontSize: 35,
    //   textAlign: 'center',
    //   margin: 10,
    //   fontFamily: 'AbrilFatface-Regular',   //<------ Added font family for perticular text
    // },
    badgeText: {
        color: 'white', 
        paddingLeft:7,
        paddingRight:7,
        paddingTop:9, 
        paddingBottom:12,
        fontFamily:'Montserrat',
        fontSize:11
    },
    bookPageSectionTitle: {
        fontSize:25,
        marginTop:20,
        marginBottom:10,
        paddingTop:30,
        paddingBottom:10,
        paddingLeft:10,
        fontFamily:'Montserrat',
    },

    mainParagraphText: {
        fontFamily:'Montserrat',
    },




});


  export default style;