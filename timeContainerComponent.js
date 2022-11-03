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
import SelectDayComponent from './selectDayComponent';
import InputTimeComponent from './inputTimeComponent';
export default class TimeContainer extends Component{
  constructor(props){
    super(props);
        this.state={
          

    }
  }




render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;

  // const isDarkMode = useColorScheme() === 'dark';
 
  return (
    <View style={{padding:3, display:'flex', flexDirection:'column', justifyContent:'center', borderRadius:20, backgroundColor:'#ebebeb', marginTop:20, height:70}} >
      <SelectDayComponent app={app} day={this.props.day} />
    <View style={{display:'flex', flexDirection:"row"}}>
      <InputTimeComponent app={app} day={this.props.day} />
      {/* <TouchableOpacity ><Text>Save</Text></TouchableOpacity> */}
    </View>
      

      
      </View> 
  );
}
  
};

