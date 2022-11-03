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
// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';
import CircularProgress from './CircularProgress';
export default class ProgressCircle extends Component{
  constructor(props){
    super(props);
        this.state={
          percent: "",
          

    }
  }
  async componentDidMount() {
    let goalList = this.props.goals;
    let mainList = this.props.maingoals;

    let amount = goalList.length+ mainList.length;
    let complete=0;
    
    for(let i=0; i<goalList?.length; i++){
        if(goalList[i].getJson().complete){
            complete++;
        }
    }
    for(let i=0; i<mainList?.length; i++){
        if(mainList[i].getJson().complete){
            complete++;
        }
    }
    let percentage = (complete / amount) * 100;

    let percent = percentage.toString();
    await this.setState({
        percent: (goalList.length===0 && mainList.length===0) ? 0:Math.floor(percentage),


    })
}
async componentDidUpdate(){
  if(this.props.app.state.updateCircle){
    await this.props.app.dispatch({updateCircle:false});
    this.componentDidMount()
  }
}



render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  let sp = state.componentList.getComponent('starpoints', currentstudent.getJson()._id);
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
    <CircularProgress percent={this.state.percent} clockwise={false}  />
  


  );
}
  
};


