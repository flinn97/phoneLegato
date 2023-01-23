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

export default class InputTimeComponent extends Component{
  constructor(props){
    super(props);
        this.state={
          time: undefined

    }
  }

componentDidMount(){
  if(this.props.day){
    let time = this.props.day[Object.keys(this.props.day)[0]];
    let hour = time.length===7?time.slice(0,2): time.slice(0,1);
    hour = hour==="12"? hour: (parseInt(hour)-12).toString();
    let min=time.length===7? time.slice(2, 4): time.slice(1,3);
    let ampm= time.slice(-2);
    time = hour+ ":" + min + " " + ampm
    this.setState({time:time})
  }
}


render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;

  // const isDarkMode = useColorScheme() === 'dark';
 
  return (
    <View style={{padding:3, display:'flex', flexDirection:'row', justifyContent:'center'}} >
      <Text style={{color:'black'}}>{this.state.time}</Text>
      {/* <TextInput
        style={{width:50, height:30, borderWidth:1}}
        // onChangeText={onChangeText}
        value={this.state.hour}
      />   
      <Text style={{fontSize:20}}>:</Text>
      <TextInput
        style={{width:50, height:30, borderWidth:1}}
        // onChangeText={onChangeText}
        // value={this.state.min}
      />  */}
      </View> 
  );
}
  
};

