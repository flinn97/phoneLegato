import React, {Component} from 'react';
import InputComponent from './inputComponent';

// import ReactSlider from 'react-native-slider';
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
import Metronome from './metroComponent.js';
export default class Metro extends Component{
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
    backgroundColor: "#6C86F4",//isDarkMode ? Colors.darker : Colors.lighter,
    height:300,
    width:'100%',
    display:'flex',
    alignItems:"center",
    
    
  };
  return (
    <View  style={backgroundStyle}>
    <Text style={{color:"white", fontSize:25, marginTop:20, marginLeft:30, alignSelf:"flex-start"}}>Metronome</Text>
    <Metronome />
    {/* <InputComponent app={app} handleChange={(text)=>{
      if(Number.isInteger(parseInt(text))){
        let i = parseInt(text);
        if(i>30){
          MetronomeModule.setBPM(i);

        }
      }
    
    }}/>
    <TouchableOpacity  onPress={()=>{
      if(this.state.play){
        MetronomeModule.stop();
        this.setState({play:false})
      }
      else{
        MetronomeModule.start();
        this.setState({play:true})

      }
      }}  style={{ width:150, height:50, borderRadius:25,   justifyContent:"center", alignItems:"center", backgroundColor:"#696eb5",}}><Text style={{color:"black"}}>Start</Text></TouchableOpacity>
    */}

 </View>
  );
}
  
};

