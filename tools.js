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
} from 'react-native';
import Metro from './metro';
// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';
// import CircularProgress from 'react-native-circular-progress-indicator';
import Timer from './timer';
export default class Tools extends Component{
  constructor(props){
    super(props);
        this.state={
          percent: "",
          

    }
  }




render(){
  let app=this.props.app;

  // const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: "white",//isDarkMode ? Colors.darker : Colors.lighter,
    height:'100%',
    width:'100%',
    display:'flex',
    alignItems:"center",
    marginTop:300,
    
  };
  return (
    <View  style={backgroundStyle}>
    <Timer app={app}/>
    <Metro app={app}/>
 </View>
  );
}
  
};

