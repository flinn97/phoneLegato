import React, {Component} from 'react';
import badge from './assets/badges/badge1.png';

// import Slider from 'react-native-slider';
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
import GoalsList from './goalList';
// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';
// import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressCircle from './progressCircle';
import studentService from './services/studentService';
export default class ViewBadge extends Component{
  constructor(props){
    super(props);
        this.state={
          percent: "",
          

    }
  }




render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  
  // const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: "white",//isDarkMode ? Colors.darker : Colors.lighter,
    height:"100%",
    
    width:'100%',
    display:'flex',
    alignItems:"center",
    
    position:'absolute',
    top:60,
    
    zIndex:1000
    
    
  };
  return (
    <View style={backgroundStyle}>
      <TouchableOpacity onPress={()=>{app.dispatch({popupSwitch:"", currentBadge:undefined})}} style={{position:'absolute', top:30, right:30, zIndex:1003}}><Text style={{color:"black"}}>X</Text></TouchableOpacity>
    <View  style={{ position:'absolute', width:'100%', height:'100%', backgroundColor:'grey', opacity:.7, zIndex:1001 }}>
 </View>
 <View style={{width:'90%', height:'85%', marginTop:20, paddingTop:70,  backgroundColor:"white", zIndex:1002, display:'flex', alignItems:'center'}}>
 <Text style={{fontSize:30, marginBottom:30, color:"black"}}>{state.currentBadge.getJson().title}</Text>
  <Image source={studentService.badge(state.currentBadge.getJson().picURL)} style={{width:250, height:250}}/>
   
  <Text style={{ width:'80%', marginTop:50, color:"black"}}>Description: {state.currentBadge.getJson().description} </Text>
    

 </View>
 </View>
  );
}
  
};

