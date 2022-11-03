import React, {Component} from 'react';
import wolf from "./assets/place1.png"
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
  Switch
} from 'react-native';
import GoalsList from './goalList';
import InputComponent from './inputComponent';
import SwitchComponent from './switchComponent';
// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';
// import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressCircle from './progressCircle';
import TimeContainer from './timeContainerComponent';
import studentService from './services/studentService.js';
import moment from 'moment';
export default class AddTime extends Component{
  constructor(props){
    super(props);
    this.markeComplete=this.markeComplete.bind(this);
        this.state={
          percent: "",
          

    }
  }


  async markeComplete(){
    let day = this.props.app.state.forTime;
      await studentService.logTime(this.props, day, this.state.time===""?"0": this.state.time)
      this.props.app.dispatch({operation:'run'})
      this.props.app.dispatch({forTime:"", currentComponent:undefined, popupSwitch:""})
    }
    
    getDay(day){
      let obj = {
        mon: "Monday",
        tues: "Tuesday",
        wed: "Wednesday",
        thur: "Thursday",
        fri: "Friday",
        sat: "Saturday",
        sun: "Sunday"
        
      }
      return(obj[day])
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
    justifyContent:'center',
    position:'absolute',
    top:60,
    zIndex:1000
    
    
  };
  return (
    <View style={backgroundStyle}>
      
    <View  style={{ position:'absolute', width:'100%', height:'100%', backgroundColor:'grey', opacity:.7, zIndex:1001 }}>
 </View>
 <View style={{width:'90%', height:'45%', backgroundColor:"white", zIndex:1002, paddingTop:50, display:"flex", alignItems:"center", marginTop:-200 }}>
 <TouchableOpacity onPress={()=>{app.dispatch({popupSwitch:""})}} style={{position:'absolute', top:30, right:30, zIndex:1003}}><Text>X</Text></TouchableOpacity>
  <Text style={{fontSize:30, marginBottom:50}}>Add Time </Text>
  <Text style={{fontSize:20, marginBottom:30}}>Add time for {this.getDay(state.forTime)}</Text>
  <InputComponent width={40} app={app} handleChange ={async (text)=>{
          await this.setState({time:text})
        }
          } value={currentstudent.getJson().time[state.forTime]} />  
           <TouchableOpacity style={{width:150, height:40, backgroundColor:'#6C86F4', borderRadius:25, display:'flex', alignItems:'center', justifyContent:"center", marginTop:50}} onPress={this.markeComplete}><Text style={{color:"white"}}>Save</Text></TouchableOpacity>

 </View>
 </View>
  );
}
  
};

