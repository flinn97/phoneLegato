import React, {Component} from 'react';
import wolf from "./assets/place1.png"
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
export default class ViewProfile extends Component{
  constructor(props){
    super(props);
        this.state={
          percent: "",
          

    }
  }

  componentDidMount(){
    let objArr = [];
        let schedulearr = [];
        let obj = {};
        let timeobj = {};
        let sched = this.props.app.state.currentstudent?.getJson()?.days;

        for (const key in sched) {

            let attribute = sched[key].slice(0, -3)
            timeobj[attribute] = sched[key]
            if (obj[attribute]) {
                obj[attribute].push(key);
            }
            else {
                obj[attribute] = [key]
            }
        }
        let o = {}
        for (const key in obj) {
            for (const day in obj[key]) {
                o[obj[key][day]] = timeobj[key];
            }
            objArr.push(o);
            o = {}
        }
        
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let dispatch = app.dispatch;
        let component = state.currentstudent;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        if (compJson) {
            this.setState({
                trackTime: compJson.trackTime,
                starpoints: compJson.starpoints,
                check: compJson.check
            })
        }



        this.setState({ objArr: objArr, });
  }



render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  // const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: "white",//isDarkMode ? Colors.darker : Colors.lighter,
    height:"100%",
    
    width:'100%',
    display:'flex',
    alignItems:"center",
    
    position:'absolute',
    top:60,
    zIndex:1000
    
    
  };
  return (
    <View style={backgroundStyle}>
      <TouchableOpacity onPress={()=>{app.dispatch({popupSwitch:""})}} style={{position:'absolute', top:30, right:30, zIndex:1003}}><Text  style={{color:"black"}}>X</Text></TouchableOpacity>
    <View  style={{ position:'absolute', width:'100%', height:'100%', backgroundColor:'grey', opacity:.7, zIndex:1001 }}>
 </View>
 <SafeAreaView style={{width:'90%', height:'85%', marginTop:20, backgroundColor:"white", zIndex:1002, display:'flex', alignItems:'center', }}>
  <Text style={{fontSize:25, marginTop:30, color:"black"}}>Profile</Text>
  <ScrollView >
    <View style={{width:'100%',display:'flex', alignItems:'center', marginBottom:40 }}>
      {currentstudent.getJson().picURL.length>70?(<Image source={{uri:currentstudent.getJson().picURL}}  style={{width:100, height:100, marginTop:20, borderRadius:100}}/>):(
  <Image source={studentService.pic(currentstudent.getJson().picURL)}  style={{width:100, height:100, marginTop:20, borderRadius:100}}/>)}
  <View>
  <Text style={{fontSize:20, width:'100%', marginTop:30, color:"black"}}>Stundent Info:</Text>

  <Text style={{marginTop:10, color:"black"}}>First Name</Text>
  <InputComponent app={app} obj={currentstudent} name="firstName"  />
  <Text style={{marginTop:10, color:"black"}}>Last Name</Text>
  <InputComponent app={app} obj={currentstudent} name="lastName" />
  <Text style={{marginTop:10, color:"black"}}>Parent</Text>

  <InputComponent app={app} obj={currentstudent} name="Parent" />
  <Text style={{marginTop:10, color:"black"}}>Phone</Text>

  <InputComponent app={app} obj={currentstudent} name="Phone" />
  <Text style={{marginTop:10, color:"black"}}>Address</Text>

  {/* <InputComponent app={app} obj={currentstudent} name="email" /> */}
  <InputComponent app={app} obj={currentstudent} name="address" />
  <Text style={{marginTop:10, color:"black"}}>Check Box Tracking</Text>

  <SwitchComponent obj={currentstudent} name="check" />
  <Text style={{marginTop:10, color:"black"}}>Time Tracking</Text>

  <SwitchComponent obj={currentstudent} name="trackTime" />
  </View>
  <Text style={{fontSize:20, width:'100%', marginTop:30, color:"black"}}>Schedule:</Text>
  {this.state.objArr?.map((day, index)=>
  <TimeContainer app={app} day ={day}/>
  )}
  {/* <TimeContainer app={app} /> */}
  </View>
  </ScrollView>
<TouchableOpacity style={{ width:75, height:30, backgroundColor:'#6C86F4', borderRadius:25, display:'flex', alignItems:'center', justifyContent:"center", marginTop:20, marginBottom:20}} onPress={()=>{
  let list = state.componentList;
  list.getOperationsFactory().cleanPrepareRun({update:currentstudent});
}}><Text style={{color:'white', color:"black"}}>Save</Text></TouchableOpacity>
 </SafeAreaView>
 </View>
  );
}
  
};

