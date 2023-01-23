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
import studentService from './services/studentService.js';

export default class PostList extends Component{
  constructor(props){
    super(props);
    this.menuSlide=this.menuSlide.bind(this);
        this.state={
          check: false,

    }
  }
  async menuSlide(post){
    let app=this.props.app;
     await app.dispatch({
        context:true
      })  

      for(let i=-450; i<=0; i+=50){
        const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1);
                app.dispatch({
          contextBottom:i,
        })
      }
      this.props.app.dispatch({fog:true, contextContent: post, reportUser: post.getJson().owner})

    

  }



render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  let chatroom = this.props.currentChatroom;
  let posts = state.componentList.getList("post", chatroom?.getJson()._id, "chatroom");
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    
    <View style={{width:"100%", padding:10, height:"70%", }}>
      <SafeAreaView style={{width:"100%",  }}>
      <ScrollView>
      {posts.map((post, index)=><>
      {(!Object.keys(currentstudent.getJson().blocked).includes(post.getJson().owner) &&
      !Object.keys(currentstudent.getJson().hidden).includes(post.getJson()._id)) && 
      <TouchableOpacity onLongPress={this.menuSlide.bind(this, post)} style={{display:'flex',  width:'100%', marginTop:10}} key={index}>
        {post.getJson().student?(
          <View style={{alignSelf:"flex-end", display:'flex', flexDirection:'row'}}>
            <View style={{backgroundColor:"#6C86F4", display:'flex', justifyContent:'center', padding:10, borderRadius:10, marginRight:7}}>
            <Text style={{color:'black'}}>{post.getJson().content}</Text>

            </View>
            {studentService.pic(post.getJson().picURL).length>70?(
          <Image source={{uri: post.getJson().picURL}} style={{width:50, height:50, borderRadius:100}}/>):(
          
            <Image source={studentService.pic(post.getJson().picURL)} style={{width:50, height:50, borderRadius:100}}/>)}
            </View>
        ):(<View style={{alignSelf:"flex-start", display:'flex', flexDirection:'row'}}>
          {studentService.pic(post.getJson().picURL).length>70?(
          <Image source={{uri: post.getJson().picURL}} style={{width:50, height:50, borderRadius:100}}/>):(
          
            <Image source={studentService.pic(post.getJson().picURL)} style={{width:50, height:50, borderRadius:100}}/>)}
        <View style={{backgroundColor:"#f2f1f6", display:'flex', justifyContent:'center', padding:10, borderRadius:10, marginLeft:7}}>
          <Text style={{color:'black'}}>{post.getJson().content}</Text>
        </View>
       
      </View>)}


      </TouchableOpacity>}</>
  )}
    </ScrollView></SafeAreaView></View> 
  );
}
  
};

