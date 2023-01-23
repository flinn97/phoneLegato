import React, {Component} from 'react';
import attach from './assets/attach.png'
import { Linking } from 'react-native';
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

export default class AttachmentList extends Component{
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
  let attachments = Object.keys(this.props.attachments)
  let homework = this.props.homework;
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{width:'100%',  display:"flex", flexDirection:"column", alignItems:"center"}}>
      <SafeAreaView  style={{width:"90%", display:"flex", flexDirection:"column", alignItems:"center",borderBottomWidth:.3,}}>
        <ScrollView >
          <View style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center" }}>
        <Text style={{marginTop:17, color:'black'}}>Attachments</Text>
          <View style={{display:'flex', flexDirection:"row", justifyContent:"center", marginTop:10, marginBottom:10,}}>
            
    {attachments.map((h, index)=>
    <View  style={{display:"flex", flexDirection:"column", alignItems:"center", margin:8, flexWrap:"wrap", }} key = {index}>
      <Image source = {attach} style={{width:50, height:50}}/>
      <Text style={{color: 'blue'}}
      onPress={() => Linking.openURL(homework?.getJson().media[h])}>
  {h.slice(0,7)}
</Text>
    
    </View>
    
  )}</View></View></ScrollView></SafeAreaView>

    
 </View>
  );
}
  
};

