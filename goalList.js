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
import Checkbox from './checkbox.js';
import studentService from './services/studentService.js';

export default class GoalsList extends Component{
  constructor(props){
    super(props);
    this.check=this.check.bind(this);
        this.state={
          check: false,

    }
  }

  check(goal){
    studentService.marckGoalCheckBox(this.props, goal)
  }


render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  let goals = state.componentList.getList("goal", currentstudent.getJson()._id);
  let mainGoals = state.componentList.getList("mainGoal", currentstudent.getJson()._id);
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{width:'100%', paddingLeft:60}}>
      <SafeAreaView>
        <ScrollView>
    {mainGoals.map((main, index)=>
    <View style={{marginTop:20}} key = {index}>
      <View style={{display:'flex', flexDirection:'row',  alignItems:'center'}}>
    <Text style={{color:'black'}}> 
    <Checkbox checked={main.getJson().complete} check={this.check.bind(this, main)}  labelColor="#56ba8e" color="#56ba8e"/> 
    
    </Text>
    <Text style={{marginBottom:5,fontSize:18, marginLeft:10, width:200, color:'black'}}>{main.getJson().title}</Text>  
    </View>
    {goals.map((goal, index)=>
    <View key={index}>
    {goal.getJson().mainID===main.getJson()._id &&(
      <View style={{marginLeft:30, marginTop:5, display:'flex', flexDirection:'row',  alignItems:'center'}}>
    <Text  style={{color:'black'}}> 
      <Checkbox checked={main.getJson().complete} check={this.check.bind(this, goal)} labelColor="#56ba8e" color="#56ba8e" />
      
      </Text>
      <Text style={{marginBottom:5,fontSize:16, marginLeft:10, width:225, color:'black'}}>{goal.getJson().title}</Text></View>
      )}
    </View>
    )}
    </View>
  )}</ScrollView></SafeAreaView>

    
 </View>
  );
}
  
};

