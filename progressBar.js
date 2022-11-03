import React, {Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Animated
} from 'react-native';
import Checkbox from './checkbox.js';

export default class  ProgressBar extends Component{
  constructor(props){
    super(props);
        this.state={
          check: false,
          width: '0%'

    }
  }
  async componentDidMount(){
    for (let i = 0; i<this.props.amount; i++){
      const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1);
      this.setState({
        width: i.toString()+'%'
      })
    }
    
  }
async componentDidUpdate(){
  if(this.props.app.state.updateProgress){
    await this.props.app.dispatch({updateProgress:false});
    this.componentDidMount();
  }
}

render(){

  return (
    <View style={styles.container}>
    <View style={styles.progressBar}>
      <Animated.View
        style={
          ([StyleSheet.absoluteFill], 
          { backgroundColor: '#6C86F4', width: this.state.width, borderRadius:8})
        }></Animated.View>
    </View>

  </View>
  );
}
  
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    padding: 8,
    width:200,
    height:30
  },
  progressBar: {
    height: 20,
    flexDirection: 'row',
    width: 200,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
});