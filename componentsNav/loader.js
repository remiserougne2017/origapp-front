import React, {useRef, useState, Component} from 'react';
import {Text, View, ImageBackground } from 'react-native';
import { Button, Icon  } from 'react-native-elements';
import color from './color'
import Spinner from 'react-native-loading-spinner-overlay';

function Loader(props) {
     return (
       
          <Spinner
            visible={props.bool}
            textContent={props.text}
            textStyle={{
                color: '#FFF'
              }}
          />
    
      );
    };
 


export default Loader