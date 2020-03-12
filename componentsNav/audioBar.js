import React, {Component} from 'react';
import {ProgressBarAndroid, StyleSheet, View} from 'react-native';

const audioBar = (props) =>{

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 10,
  },
});
// console.log(props.progress, "BAR progress")
return (
    <View style={{flex: 1,justifyContent: 'space-evenly',padding: 10}}>
    
      <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3"
         styleAttr="Horizontal"
         indeterminate={false}
         progress={props.progress} />
    </View>
  )
}

export default audioBar