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
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
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

export default class InputComponent extends Component{
  constructor(props){
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.prepareOnPress=this.prepareOnPress.bind(this);
    this.onBlurEvent=this.onBlurEvent.bind(this);
        this.state={
          value: this.props.value
          

    }
  }
   async componentDidMount(){
    if(!this.props.prepareOnPress){
      // console.log(this.props.obj.getJson)
      await this.setState({obj:this.props.obj, value: this.props.obj.getJson()[this.props.name]})

    }
  }

  componentDidUpdate(){
    if(this.props.app.state.sent){
      this.props.app.dispatch({sent: false});
      this.setState({pressed:false, value: ""})
    }
    
  }

async prepareOnPress(){
  if(this.props.prepareOnPress && !this.state.pressed){
    this.setState({pressed:true});
    let obj = this.props.obj? this.props.obj: 1;
    obj = await this.props.app?.state.componentList.getOperationsFactory()[this.props.prepareOnPress.operation]({[this.props.prepareOnPress.operate]:obj});
    obj = obj[this.getSplice(this.props.prepareOnPress.operate)][0];
    this.setState(
      {obj:obj}
    );
  }
  if(this.props.setPosition){
    this.props.setPosition()
  }
}

getSplice(word){
  word = word.includes("add")? "add" : word.includes("update")? "update": "del"
  return word;
}

handleChange(value){
  this.setState({
    value:value
  });
  if(this.props.handleChange!==undefined){
    this.props.handleChange(value)
  }
  if(this.state.obj){
    this.state.obj.setJson({...this.state.obj.getJson(), [this.props.name]:value})
  }
}
onBlurEvent(){
  if(this.props.setOnDefocus){
    this.props.setOnDefocus();
  }
}


render(){
  // let app=this.props.app;
  let state=app?.state;
  let currentstudent=state?.currentstudent;

  return (
        <TextInput
        onFocus={this.prepareOnPress}
        onBlur={this.onBlurEvent}
      style={{width:this.props.width? this.props.width:200, height:30, backgroundColor:this.props.backgroundColor, borderWidth: !this.props.border?1:0, borderRadius:7,  marginLeft:this.props.center?10:0, fontSize:this.props.fontSize, color:this.props.color}}
        onChangeText={(text)=>{
          this.handleChange(text)
        }}
        value={this.state.value}
        name={this.props.name? this.props.name: "value"}
      />
  );
}
  
};

