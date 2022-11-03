import React, {Component} from 'react';
import starpoints from './assets/star-banner.png'
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
export default class StarPointPic extends Component{
  constructor(props){
    super(props);

        this.state={
   

    }
  }


render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  let sp = state.componentList.getComponent('starpoints', currentstudent.getJson()._id);

  return (

    <View style={{position:'relative', display:'flex', justifyContent:"center", alignItems:"center", marginLeft:5}}>
    
    <Image source={starpoints}/>
    <Text style={{position:"absolute", top:33, color:"white",fontSize:18 }}>{sp.getJson().level}</Text>
    <Text style={{position:"absolute", top:55, color:"white",fontSize:12 }}>level</Text>
    </View>
    
  );
}
  
};

