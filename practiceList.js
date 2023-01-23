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

export default class PracticeList extends Component{
  constructor(props){
    super(props);
    this.check=this.check.bind(this);
        this.state={
          check: false,

    }
  }

  check(c){
    this.setState({check:c})
  }


render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  let homeworks = state.componentList.getList("homework", currentstudent.getJson()._id);
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{marginTop:20,  borderWidth:1, width:300, height:450, padding:10 }}>
      <SafeAreaView style={{width:'100%', height:"100%"}}>
        <ScrollView>
    {homeworks.map((homework, index)=>
    <View key={index} style={{marginBottom:10}}>
      <TouchableOpacity onPress={()=>{app.dispatch({popupSwitch:"viewHomework", hwready:true, currentHomework:homework})}}>
      <Text style={{fontSize:23, color:"black"}}>{homework.getJson()?.title}</Text>
      <Text style={{color:'blue', marginBottom:5}}>{homework?.getJson().hwlink}</Text>
      {homework.getJson().description!==""&&(<Text style={{color:'grey', fontSize:17}}>Notes: {homework?.getJson().description}</Text>)}
      </TouchableOpacity>

    </View>
)}
</ScrollView>
      </SafeAreaView>
  </View>
  );
}
  
};

