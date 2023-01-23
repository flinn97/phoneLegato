import React, {Component} from 'react';
import wolf from "./assets/place1.png"
import downArrow from './assets/downArrow.png' 
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
export default class DropDownComponent extends Component{
  constructor(props){
    super(props);
        this.state={
          list: this.props.list,
          currentItem: undefined,
          firstItem: this.props.firstItem,
          showList: false
          

    }
  }



render(){
 
  return (
    <View style={{ zIndex:1000}}>
      <TouchableOpacity onPress={()=>{this.setState({showList:!this.state.showList})}} style={{borderWidth:1, width:200, height:35, display:'flex', flexDirection:'row', alignItems:"center"}} >
        <Text style={{fontSize:20, marginLeft:10, color:'black'}}>{this.state.currentItem===undefined?this.props.firstItem:this.state.currentItem}</Text>
      <Image source={downArrow} style={{position:"absolute", right:0}}/></TouchableOpacity>
      <View style={{position:"absolute", shadowColor: '#171717', top:35, backgroundColor:'white', width:200, 
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,}}>
      {this.state.showList&&(
        <View style={{backgroundColor:'white', width:"100%"}}>
          {this.state.list.map((item, index)=>
          <TouchableOpacity onPress={()=>{
            this.setState({currentItem:item, showList:false});
            if(this.props.handleChange){
              this.props.handleChange(item)
            }
          }} key={index}><Text style={{fontSize:20, color:'black'}}>{item}</Text></TouchableOpacity>
          )}
        </View>
      )}
      </View>
 </View>
  );
}
  
};

