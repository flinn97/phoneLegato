import React, {Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import GoalsList from './goalList';
import PostList from './postList';
import PracticeChecks from './practiceChecks';
import PracticeList from './practiceList';
// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';
// import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressCircle from './progressCircle';

export default class SelectDayComponent extends Component{
  constructor(props){
    super(props);
        this.state={
            Monday:undefined,
            Tuesday:undefined,
            Wednesday:undefined,
            Thursday:undefined,
            Friday: undefined,
            Saturday:undefined,
            Sunday:undefined
          

    }
  }
  componentDidMount(){
    if(this.props.day){
      for(const key in this.props.day){
        this.setState({
          [key]: true
        })
      }
    }
  }




render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;

  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={{padding:3, display:'flex', flexDirection:'row', justifyContent:'center'}} >
      
      <View style={{marginLeft:1, marginRight:1, borderRadius:10,  backgroundColor:this.state.Monday?"#6C86F4": "white", display:'flex', alignItems:'center', justifyContent:'center', width:38}}><Text style={{fontSize:12, color: this.state.Monday?"white": "black", }}>Mon</Text></View>
      <View style={{marginLeft:1, marginRight:1, borderRadius:10,  backgroundColor:this.state.Tuesday?"#6C86F4": "white", display:'flex', alignItems:'center', justifyContent:'center', width:38}}><Text style={{fontSize:12,color: this.state.Tuesday?"white": "black", }}>Tues</Text></View>
      <View style={{marginLeft:1, marginRight:1, borderRadius:10,  backgroundColor:this.state.Wednesday?"#6C86F4": "white", display:'flex', alignItems:'center', justifyContent:'center', width:38}}><Text style={{fontSize:12,color: this.state.Wednesday?"white": "black", }}>Wed</Text></View>
      <View style={{marginLeft:1, marginRight:1, borderRadius:10,  backgroundColor:this.state.Thursday?"#6C86F4": "white", display:'flex', alignItems:'center', justifyContent:'center', width:38}}><Text style={{fontSize:12,color: this.state.Thursday?"white": "black", }}>Thurs</Text></View>
      <View style={{marginLeft:1, marginRight:1, borderRadius:10,  backgroundColor:this.state.Friday?"#6C86F4": "white", display:'flex', alignItems:'center', justifyContent:'center', width:38}}><Text style={{fontSize:12,color: this.state.Friday?"white": "black", }}>Fri</Text></View>
      <View style={{marginLeft:1, marginRight:1, borderRadius:10, backgroundColor:this.state.Saturday?"#6C86F4": "white", display:'flex', alignItems:'center', justifyContent:'center', width:38}}><Text style={{fontSize:12, color: this.state.Saturday?"white": "black",}}>Sat</Text></View>
      <View style={{marginLeft:1, marginRight:1, borderRadius:10,  backgroundColor:this.state.Sunday?"#6C86F4": "white", display:'flex', alignItems:'center', justifyContent:'center', width:38}}><Text style={{fontSize:12,color: this.state.Sunday?"white": "black", }}>Sun</Text></View>

      
      </View> 
  );
}
  
};

