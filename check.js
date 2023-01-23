import React, {Component} from 'react';
import badge from './assets/badges/Artboard_1.svg';
import starpoints from './assets/starpoints.png'
import downArrow from './assets/downArrow.png'
import tick from './assets/tick.png'
import moment from 'moment';
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
import StarPointPic from './starPointPic';
import Bagdes from './badges';
import InputComponent from './inputComponent';
import studentService from './services/studentService.js';
export default class Check extends Component{
  constructor(props){
    super(props);
this.markeComplete=this.markeComplete.bind(this)
        this.state={
          time: "",
    }
  }
  async markeComplete(){
    let day = await studentService.getDay();

    if(this.state.time!==""){
      await studentService.logTime(this.props, day, this.state.time)
    }
    
    if(!studentService.checked(this.props)){
      

      await studentService.markcheckbox(this.props, day);

    }
    else{
      if(!this.props.app.state.currentstudent.getJson().check){
        this.props.app.dispatch({operation:'run'})

      }
    }
    
  }


render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  let homeworks = state.componentList.getList('homework', currentstudent.getJson()._id)
  const backgroundStyle = {
    backgroundColor: "white",//isDarkMode ? Colors.darker : Colors.lighter,
    height:700,
    marginBottom:-10,
    width:'100%',
    borderRadius:25,
    display:'flex',
    alignItems:"center",
    
    zindex:500
    
  };
  return (
    <View  style={backgroundStyle}>
      
      <TouchableOpacity onPress={()=>{app.dispatch({fog:false, bottom:-700, check:false})}}style={{  zIndex:600, position:"absolute", right:10, top:10 }}><Image source={downArrow}/></TouchableOpacity>
    <Text style={{marginTop:30, fontSize:27, color:'black'}}>Practice</Text>
    <Text style={{fontSize:30, color:'black'}}>{moment().format("MMM Do")}</Text>
    <SafeAreaView style={{marginTop:30,  borderWidth:1,  height:360}}>
      <ScrollView>
        <View style={{width:300, height:'100%', padding:10 }}>
      {homeworks.map((homework, index)=>
      <View key={index} style={{marginBottom:10}}>
        
        <Text style={{fontSize:23, color:'black'}}>{homework.getJson().title}</Text>
        <Text style={{color:'blue', marginBottom:5}}>{homework.getJson().hwlink}</Text>
        {homework.getJson().description!==""&&(<Text style={{color:'grey', fontSize:17}}>Notes: {homework.getJson().description}</Text>)}
        

      </View>
  )}</View>
  </ScrollView>
    </SafeAreaView>
    <View style={{position:"absolute", bottom:'7%', display:'flex', alignItems:'center'}}>
      <Text style={{marginBottom:5, color:'black'}}>Log Minutes</Text>
      <View style={{ width:150, height:43, borderRadius:25, zIndex:600,  justifyContent:"center", alignItems:"center", backgroundColor:"#f1f1f1",}}>
        <InputComponent fontSize={20} color='#838383' width={30} center={true} border={true} app={app} handleChange ={async (text)=>{
          await this.setState({time:text})
        }
          } value={studentService.time.bind(this, this.props)} />
        </View>
      <TouchableOpacity onPress={this.markeComplete} style={{ marginTop:20, width:150, height:43, borderRadius:25, zIndex:600,  justifyContent:"center", alignItems:"center", backgroundColor:"#6C86F4",}}>
      {studentService.checked(this.props)?(<Image source={tick} style={{width:30, height:30, }}/>):(
      <Text style={{color:"white", color:'black'}}>Mark Complete</Text>)}
        </TouchableOpacity>


    </View>
    
 </View>
  );
}
  
};

