import React, {Component} from 'react';
import badge from './assets/badges/Artboard_1.svg';
import starpoints from './assets/starpoints.png'
import ProgressBar from './progressBar';
import tick from './assets/tick.png'
import moment from "moment";

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
import studentService from './services/studentService';
import authService from './services/authService';
export default class Dash extends Component{
  constructor(props){
    super(props);
    this.menuSlide=this.menuSlide.bind(this);
        this.state={
          bottom: -100,
          check:false
          

    }
  }
  componentDidMount(){
    let app = this.props.app;
    let state = app.state;
    let componentList = state.componentList;
    let student = state.currentstudent;
    let teacher = state.email
    authService.getAllTheDataForTheUser(state.studentEmail, componentList, student.getJson()._id, teacher, app.dispatch);

  }

  async menuSlide(){
    let app=this.props.app;
     await app.dispatch({
        check:true
      })  

      for(let i=-650; i<=0; i+=50){
        const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1);
                app.dispatch({
          bottom:i,
        })
      }
      this.props.app.dispatch({fog:true});
    

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
    marginTop:200,
    
  };
  return (
    <View  style={backgroundStyle}>
    <StarPointPic app={app} />
    <Text style={{color:'#6C86F4', }}>{sp.getJson().starpoints} points</Text>
    <ProgressBar app={app} amount={parseInt(sp.getJson().starpoints)/parseInt(sp.getJson().starpointGoal)*100}/>
    <View style={{display:'flex', marginTop:20, alignItems:'center'}}>
    <Text style={{marginBottom:10, color:'black'}}>{currentstudent.getJson().daysPracticed} Days Practiced</Text>
    <Text style={{color:'black'}}>{currentstudent.getJson().timeTotal} Minutes Practiced</Text>
    </View>
    <Text style={{alignSelf:"flex-start", marginLeft:50, marginTop:20, marginBottom:10, color:'black'}}>Badge Collection</Text>
    <Bagdes app={app} />
    <View style={{position:"absolute", bottom: '20%', display:'flex', alignItems:'center' }}>
    <Text style={{fontSize:17, marginBottom:20 , color:'black'}}>{moment().format("MMM Do")}</Text>
    <TouchableOpacity  onPress={this.menuSlide}  style={{ width:150, height:50, borderRadius:25, zIndex:600,  justifyContent:"center", alignItems:"center", backgroundColor:"#6C86F4", color:'white'}}>
      {studentService.checked(this.props)?(<Image source={tick} style={{width:30, height:30, }}/>):(
      <Text style={{color:"white"}}>Record Homework</Text>)}
      </TouchableOpacity>

    </View>
    
 </View>
  );
}
  
};

