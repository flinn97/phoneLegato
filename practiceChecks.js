import React, {Component} from 'react';
import studentService from './services/studentService.js';
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

export default class PracticeChecks extends Component{
  constructor(props){
    super(props);
    this.check=this.check.bind(this);
        this.state={
          check: false,

    }
  }

  
  async check(day){

    await studentService.markcheckbox(this.props, day);
        if (this.props.app.state.currentstudent.getJson().time &&this.props.app.state.currentstudent.getJson().checked[day]) {
                      this.props.app.dispatch({ popupSwitch: "addTime", currentComponent: this.props.app.state.currentstudent, forTime: day })
              }
  
      
}


render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  let goals = state.componentList.getList("goal", currentstudent.getJson()._id);
  let mainGoals = state.componentList.getList("mainGoal", currentstudent.getJson()._id);
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{display:'flex', flexDirection:'row'}}>
      <View style={{marginLeft:6, marginRight:6, display:'flex', alignItems:"center", width:30}}> 
      <Text style={{marginBottom:7, fontSize:14, color:"black"}}>Mon</Text>
      <Text style={{color:"black"}}>
    {currentstudent?.getJson().check && (<Checkbox checked={currentstudent.getJson().checked.mon} check={this.check.bind(this, 'mon')} labelColor="#56ba8e" color="#56ba8e"/> )}
    </Text>
    {currentstudent?.getJson().trackTime && (<Text style={{color:"black"}}>{currentstudent.getJson().time.mon}</Text>)}
    </View >
    <View style={{marginLeft:6, marginRight:6, display:'flex', alignItems:"center", width:31}}> 
      <Text style={{marginBottom:7, fontSize:14, color:"black"}}>Tues</Text>
      <Text style={{color:"black"}}>
      {currentstudent?.getJson().check && (<Checkbox checked={currentstudent.getJson().checked.tues} check={this.check.bind(this, 'tues')} labelColor="#56ba8e" color="#56ba8e"/> )}
    </Text>
    {currentstudent?.getJson().trackTime && (<Text style={{color:"black"}}>{currentstudent.getJson().time.tues}</Text>)}
    </View>
    <View style={{marginLeft:6, marginRight:6, display:'flex', alignItems:"center", width:30}}> 
      <Text style={{marginBottom:7, fontSize:14, color:"black"}}>Wed</Text>
      <Text style={{color:"black"}}>
      {currentstudent?.getJson().check && (<Checkbox checked={currentstudent.getJson().checked.wed} check={this.check.bind(this, 'wed')} labelColor="#56ba8e" color="#56ba8e"/> )}
    </Text>
    {currentstudent?.getJson().trackTime && (<Text style={{color:"black"}}>{currentstudent.getJson().time.wed}</Text>)}
    </View>
    <View style={{marginLeft:6, marginRight:6, display:'flex', alignItems:"center", width:32}}> 
      <Text style={{marginBottom:7, fontSize:14, color:"black"}}>Thur</Text>
      <Text style={{color:"black"}}>
      {currentstudent?.getJson().check && (<Checkbox checked={currentstudent.getJson().checked.thur} check={this.check.bind(this, 'thur')} labelColor="#56ba8e" color="#56ba8e"/>)}
    </Text> 
    {currentstudent?.getJson().trackTime && (<Text style={{color:"black"}}>{currentstudent.getJson().time.thur}</Text>)}
    </View>
    <View style={{marginLeft:6, marginRight:6, display:'flex', alignItems:"center", width:30}}> 
      <Text style={{marginBottom:7, fontSize:14, color:"black"}}>Fri</Text>
      <Text style={{color:"black"}}>
      {currentstudent?.getJson().check && (<Checkbox checked={currentstudent.getJson().checked.fri} check={this.check.bind(this, 'fri')} labelColor="#56ba8e" color="#56ba8e"/> )}
    </Text>
    {currentstudent?.getJson().trackTime && (<Text style={{color:"black"}}>{currentstudent.getJson().time.fri}</Text>)}
    </View>
    <View style={{marginLeft:6, marginRight:6, display:'flex', alignItems:"center", width:30}}> 
      <Text style={{marginBottom:7, fontSize:14,color:"black"}}>Sat</Text>
      <Text style={{color:"black"}}>
      {currentstudent?.getJson().check && (<Checkbox checked={currentstudent.getJson().checked.sat} check={this.check.bind(this, 'sat')} labelColor="#56ba8e" color="#56ba8e"/> )}
    </Text>
    {currentstudent?.getJson().trackTime && (<Text style={{color:"black"}}>{currentstudent.getJson().time.sat}</Text>)}
    </View>
    <View style={{marginLeft:6, marginRight:6, display:'flex', alignItems:"center", width:30}}> 
      <Text style={{marginBottom:7, fontSize:14, color:"black"}}>Sun</Text>
      <Text style={{color:"black"}}>
      {currentstudent?.getJson().check && (<Checkbox checked={currentstudent.getJson().checked.sun} check={this.check.bind(this, 'sun')} labelColor="#56ba8e" color="#56ba8e"/> )}
    </Text>
    {currentstudent?.getJson().trackTime && (<Text style={{color:"black"}}>{currentstudent.getJson().time.sun}</Text>)}
    </View>

    

 </View>

  );
}
  
};

