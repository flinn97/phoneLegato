import React, {Component} from 'react';
import wolf from "./assets/place1.png"
import studentService from './services/studentService.js';
import authService from './services/authService';
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
import SelectFileComponent from './selectFileComponent';
export default class ProfilePic extends Component{
  constructor(props){
    super(props);
    this.setPic=this.setPic.bind(this);
    this.handleSubmission=this.handleSubmission.bind(this)
        this.state={
          percent: "",
          pic: undefined,
          blob: undefined,
          loading:"Save",
          path: "",
          loaded: "",
          

    }
  }
  componentDidMount(){
    if(this.props.app.state.currentstudent?.getJson()?.picURL?.length>70){
      this.setState({pic: this.props.app.state.currentstudent.getJson().picURL})
    }
  }
  createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

  async setPic(pic, blob){
    let path= "images/" + this.createUUID();
    await this.setState({
      pic:pic,
      blob:blob,
      path:path
    })
  }
  async handleSubmission()  {
    await this.setState({loading:"loading..."});

    let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  
    await authService.uploadPics(this.state.blob, this.state.path, currentstudent);
    currentstudent.setJson({...currentstudent.getJson(), picURL: this.state.pic})
    await this.props.app.dispatch({operataion:"cleanPrepareRun", operate: "update", object: currentstudent, back:false});
    this.setState({
      loaded:"Picture Uploaded",
      loading: "Save"
    })

};


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
      <TouchableOpacity onPress={()=>{app.dispatch({popupSwitch:""})}} style={{position:'absolute', top:30, right:30, zIndex:1003}}><Text style={{color:"black"}}>X</Text></TouchableOpacity>
    <View  style={{ position:'absolute', width:'100%', height:'100%', backgroundColor:'grey', opacity:.7, zIndex:1001 }}>
 </View>
 <View style={{width:'90%', height:'85%', marginTop:20, backgroundColor:"white", zIndex:1002, display:'flex', alignItems:'center', paddingTop:75}}>
  {this.state.pic?(<Image source={{uri: this.state.pic}}  style={{width:200, height:200, borderRadius:100}}/>):(
 <Image source={studentService.pic(currentstudent.getJson().picURL)}  style={{width:200, height:200, borderRadius:100}}/>)}
  <SelectFileComponent setPic={this.setPic} app={app} />
   {this.state.loaded.includes('Pic')&&(<Text style={{color:"black"}}>Picture Uploaded</Text>)}<TouchableOpacity onPress={this.handleSubmission} style={{position:"absolute", bottom:0, width:75, height:30, backgroundColor:'#6C86F4', borderRadius:25, display:'flex', alignItems:'center', justifyContent:"center", marginTop:20, marginBottom:20}}>
    <Text style={{color:'white'}}>{this.state.loading}</Text></TouchableOpacity>
 </View>
 </View>
  );
}
  
};

