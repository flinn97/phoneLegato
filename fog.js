import React, {Component} from 'react';
import badge from './assets/badges/Artboard_1.svg';
import starpoints from './assets/starpoints.png'
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
} from 'react-native';
import StarPointPic from './starPointPic';
import Bagdes from './badges';
import Check from './check';
export default class Fog extends Component{
  constructor(props){
    super(props);
        this.state={
          

    }
  }

render(){

  const backgroundStyle = {
    backgroundColor: "gray",//isDarkMode ? Colors.darker : Colors.lighter,
    height:'100%',
    width:'100%',
    display:'flex',
    alignItems:"center",
    opacity: 0.5,
    zIndex:300,
    position:'absolute',
    
    
  };
  return (
    <View  style={backgroundStyle}>
    
    </View>
    
  );
}
  
};

