import React, {Component} from 'react';
import badge from './assets/badges/badge1.png';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import RenderHTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import downArrow from './assets/downArrow.png';

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
} from 'react-native';
import GoalsList from './goalList';
// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';
// import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressCircle from './progressCircle';
import studentService from './services/studentService';
import AttachmentList from './attachmentList';
const renderers = {
  iframe: IframeRenderer
};

const customHTMLElementModels = {
  iframe: iframeModel
};
export default class ViewHomework extends Component{
  constructor(props){
    super(props);
        this.state={
          percent: "",
          video: "",
          videos: [],
          index: 0,
          

    }
  }
   componentDidMount(){
    
      let app=this.props.app;

  let state=app.state;
  let homework = state.currentHomework;
  let media = homework.getJson().media;
  let list = [];
  for(const key in media){
    if(key.includes("youtube")){
      list.push(media[key]);
    }
  }
  this.setState({videos:list, video:list[0]})
    
    
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
      <TouchableOpacity onPress={()=>{app.dispatch({popupSwitch:"", currentHomework: undefined})}} style={{position:'absolute', top:30, right:30, zIndex:1003}}><Text style={{color:"black"}}>X</Text></TouchableOpacity>
    <View  style={{ position:'absolute', width:'100%', height:'100%', backgroundColor:'grey', opacity:.7, zIndex:1001 }}>
 </View>
 <View style={{width:'90%', height:'85%', marginTop:20, paddingTop:70,  backgroundColor:"white", zIndex:1002, display:'flex', alignItems:'center'}}>
 {this.state.video&&(
  <View style={{display:'flex', flexDirection:'row', justifyContent:"center", alignItems:"center", width:350, backgroundColor:"white"}}>      


    <TouchableOpacity onPress={()=>{
  let i = this.state.index;
  if(i===0){
    i=this.state.videos.length-1
  }
  else{
    i--
  }
  let video = this.state.videos[i];
  this.setState({video:video, index:i})
}} 
style={{zIndex:4, marginTop:80,  alignSelf:"flex-start", 
transform: [{ rotate: "90deg" }]
}}><Image source={downArrow} style={{width:30, height:15}}/></TouchableOpacity>


<View>
  {this.state.video&&(
 <RenderHTML
  renderers={renderers}
  WebView={WebView}
  source={{ html: `<iframe width="300" height="50%" src="${this.state.video}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`}}
  customHTMLElementModels={customHTMLElementModels}
  defaultWebViewProps={
    {
      /* Any prop you want to pass to all WebViews */
    }
  }
  renderersProps={{
    iframe: {
      scalesPageToFit: true,
      webViewProps: {
        /* Any prop you want to pass to iframe WebViews */
      }
    }
  }}
/>)}</View>
<TouchableOpacity onPress={()=>{
  let i = this.state.index;
  if(i===this.state.videos.length-1){
    i=0
  }
  else{
    i++;
  }
  let video = this.state.videos[i];
  this.setState({video:video, index:i})
}}style={{alignSelf:"flex-end", zIndex:4, marginBottom:70,
transform: [{ rotate: "270deg" }]
}}><Image source={downArrow} style={{width:30, height:15}}/></TouchableOpacity>

</View>)}
<AttachmentList app={app} attachments={state.currentHomework?.getJson().media}  homework={state.currentHomework}/>
<View>
 <Text style={{fontSize:20, marginBottom:3, marginTop:20, color:"black"}}>{state.currentHomework?.getJson().title}</Text>
 <Text style={{color:'blue', marginBottom:5}}>{state.currentHomework?.getJson().hwlink}</Text>
  <Text style={{ marginTop:10, color:"black"}}> {state.currentHomework?.getJson()?.description} </Text>
  </View>

 </View>
 </View>
  );
}
  
};

