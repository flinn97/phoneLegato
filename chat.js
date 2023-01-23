import React, {Component} from 'react';
import downArrow from './assets/downArrow.png'
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
  KeyboardAvoidingView
} from 'react-native';
import GoalsList from './goalList';
import PostList from './postList';
import PracticeChecks from './practiceChecks';
import PracticeList from './practiceList';
// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';
// import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressCircle from './progressCircle';
import Send from './send';
import authService from './services/authService';
import studentService from './services/studentService';
export default class Chat extends Component{
  constructor(props){
    super(props);
        this.state={
          currentChatroom: undefined,
          chat: false,
          chatrooms:[]

    }
  }

  async componentDidMount(){
       this.setState({chatrooms:[]})
    let app=this.props.app;
    let state= app.state;
    let currentstudent=state.currentstudent;
    let componentList = state.componentList;
    let dispatch= app.dispatch;
    if(!componentList.getComponent("chatroom", "generalChatroom", "_id")){
      await authService.getGeneralChatroom(state.email, componentList);
      await authService.getGeneralChatPosts(state.email, componentList);
      
    }
    let list = componentList.getList("chatroom");
    this.setState({chatrooms:list});
    // this.getData();
    
      
  
  
}
getData(){
  let app = this.props.app;
  let state = app.state;
  let componentList = state.componentList;
  let student = state.currentstudent;
  let teacher = state.email
  authService.getAllTheDataForTheUser(state.studentEmail, componentList, student.getJson()._id, teacher, app.dispatch);
  
}


render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  let list = state.componentList
  let posts = state.componentList.getList("post", currentstudent.getJson()._id);
  let mainGoals = state.componentList.getList("mainGoal", currentstudent.getJson()._id);

  // const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: "white",//isDarkMode ? Colors.darker : Colors.lighter,
    height:"100%",
    width:'100%',
    display:'flex',
    alignItems:"center",
    marginTop:this.state.marginTop?this.state.marginTop: 220,
    position:this.state.position,
    bottom:this.state.bottom
    
    
  };
  return (
   
        <KeyboardAvoidingView behavior="padding" style={backgroundStyle}>
      <Text style={{fontSize:30, color:'black'}}>Chat</Text>
    {!this.state.chat?(<View style={{width:"80%"}}>
      {this.state.chatrooms.map((chatroom, index)=>
      <TouchableOpacity 
      onPress={()=>{

        this.setState({currentChatroom:chatroom, chat:true});
      }}
      style={{display:'flex', flexDirection:'row', width:'100%', marginTop:10,paddingBottom:10, borderBottomWidth:1}}>
        {chatroom.getJson()._id==="generalChatroom"?(<View style={{backgroundColor:'#8A8D96', borderRadius:100, width:50, height:50, display:'flex', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:18, color:"white"}}>G</Text></View>):(
          <>
          {list.getComponent('student', chatroom.getJson().owner).getJson().picURL.length>70?(<Image source={{uri:list.getComponent('student', chatroom.getJson().owner).getJson().picURL}} style={{width:50, height:50, borderRadius:100}} />):(
          <Image source={studentService.pic(list.getComponent('student', chatroom.getJson().owner).getJson().picURL)} style={{width:50, height:50, borderRadius:100}} />)}
          </>
        )}
      <View style={{marginTop:3, marginLeft:7}}>
        <Text style={{fontSize:18, color:'black'}}>{chatroom.getJson().name}</Text>
        <Text style={{color:'black'}}>{list.getList("post", chatroom.getJson()._id, "chatroom")[list.getList("post", chatroom.getJson()._id, "chatroom").length-1]?.getJson().content}</Text></View></TouchableOpacity>
        
      )}
    </View>):(
     
     
  <View style={{ display:'flex',
  alignItems:"center", height:"100%", width:'100%'}}>
    <TouchableOpacity style={{position:"absolute", top:-30, left:20}} onPress={()=>{this.setState({chat:false, currentChatroom:undefined})}}><Image style={{transform: [{ rotate: '90deg'}]}} source={downArrow}/></TouchableOpacity>
   <PostList app={app} currentChatroom={this.state.currentChatroom}/>
   
   <Send app={app} currentChatroom={this.state.currentChatroom} setOnDefocus={()=>{this.setState({position:undefined, marginTop:220, bottom:undefined})}} setPosition={()=>{this.setState({position:'absolute', marginTop:0, bottom:'20%'})}}/>
   
 </View>
 )}
 </KeyboardAvoidingView>

  );
}
  
};

