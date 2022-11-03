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
import InputComponent from './inputComponent';
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
export default class Send extends Component{
  constructor(props){
    super(props);
    this.state = {
      chatRooms:[],
      bottom:"22%"
  };
  }
  

    



render(){
  let app=this.props.app;
let state=app.state;
  let currentstudent=state.currentstudent;
  let chatroom = this.props.currentChatroom;

  // const isDarkMode = useColorScheme() === 'dark';
 
  return (
    <View  style={{position:'absolute', bottom:this.state.bottom, flexDirection:'row', justifyContent:'center'}}>
      <InputComponent setPosition={()=>{
        this.props.setPosition();
        this.setState({bottom:"10%"})
      }} 
      setOnDefocus ={()=>{
        this.setState({bottom:"22%"})
        this.props.setOnDefocus()
      }}
      width={300} border={true} backgroundColor={"#f5f5f7"} app={app} prepareOnPress={{operation:"cleanJsonPrepare", operate:"addpost", }} obj ={{student:true, owner: currentstudent.getJson()._id, chatroom:chatroom.getJson()._id, picURL: currentstudent.getJson().picURL}} name="content"/>
    
    <TouchableOpacity onPress={app.dispatch.bind(this, {operation:"run", sent:true})} style={{marginTop:5}}><Text style={{color:"#6C86F4"}}>Send</Text></TouchableOpacity> 
   
 </View>
  );
}
  
};

