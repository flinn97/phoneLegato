import React, {Component} from 'react';
import wolf from './assets/place1.png'
import place2 from './assets/place2.png'
import place3 from './assets/place3.png'
import place4 from './assets/place4.png'
import place5 from './assets/place5.png'
import place6 from './assets/place6.png'
import place7 from './assets/place7.png'

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
import studentService from './services/studentService';

export default class Profile extends Component{
  constructor(props){
    super(props);
        this.state={
          check: false,
          pic: undefined

    }
  }
  componentDidMount(){
    let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  if(currentstudent.getJson().picURL.includes('place1')){
    this.setState({
      pic:wolf
    })
  }
  if(currentstudent.getJson().picURL.includes('place2')){
    this.setState({
      pic:place2
    })
  }
  if(currentstudent.getJson().picURL.includes('place3')){
    this.setState({
      pic:place3
    })
  }
  if(currentstudent.getJson().picURL.includes('place4')){
    this.setState({
      pic:place4
    })
  }
  if(currentstudent.getJson().picURL.includes('place5')){
    this.setState({
      pic:place5
    })
  }
  if(currentstudent.getJson().picURL.includes('place6')){
    this.setState({
      pic:place6
    })
  }
  if(currentstudent.getJson().picURL.includes('place7')){
    this.setState({
      pic:place7
    })
  }

  }




render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;

  return (
    <View style={{ backgroundColor: 'white',
    borderRadius: 8,
    height:100,
    width: 200,
    marginVertical: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    }}>
      
      <View style={{width:'100%', display:'flex', alignItems:'center', marginTop:10}}><Text style={{color:'#6C86F4'}}>Currently viewing as </Text></View>
      <View style={{display:'flex', flexDirection:'row', justifyContent:'center', width:'100%', marginTop:10}}>
        <TouchableOpacity onPress={()=>{app.dispatch({popupSwitch: "profilePic"})}}>
          
          {currentstudent.getJson().picURL.length>70?(<><Image source={{ uri: currentstudent.getJson().picURL }} style={{width:50, height:50, borderRadius:100}}/></>):(
            <Image source={studentService.pic(currentstudent.getJson().picURL)} style={{width:50, height:50, borderRadius:100}}/>
          )}</TouchableOpacity>
        <View style={{marginTop:7, marginLeft:10}}>
          <Text>{currentstudent.getJson().firstName} {currentstudent.getJson().lastName}</Text>
          <TouchableOpacity style={{marginTop:3}} onPress={()=>{dispatch({ popupSwitch:"profile"})}} ><Text style={{fontSize:10}}>View profile</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
  
};

