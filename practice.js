import React, {Component} from 'react';
import studentService from './services/studentService';
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
import PracticeChecks from './practiceChecks';
import PracticeList from './practiceList';
import authService from './services/authService';

// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';
// import CircularProgress from 'react-native-circular-progress-indicator';
import ProgressCircle from './progressCircle';
export default class Practice extends Component{
  constructor(props){
    super(props);
        this.state={
          percent: "",
          

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

render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  let goals = state.componentList.getList("goal", currentstudent.getJson()._id);
  let mainGoals = state.componentList.getList("mainGoal", currentstudent.getJson()._id);

  // const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: "white",//isDarkMode ? Colors.darker : Colors.lighter,
    height:'100%',
    width:'100%',
    display:'flex',
    alignItems:"center",
    marginTop:180,
    
  };
  return (
    <View  style={backgroundStyle}>
    <Text style={{fontSize:30, color:'black'}}>Practice</Text>
    <Text style={{marginTop:30, fontSize:20, marginBottom:20, color:'black'}}>Current Progress</Text>
    {(!currentstudent.getJson().check && !currentstudent.getJson().trackTime)?(<></>):(<PracticeChecks app={app}/>)}
    {currentstudent.getJson().trackTime && (<TouchableOpacity style={{marginTop:15,}} onPress={app.dispatch.bind(this,{popupSwitch: "addTimes"})}><Text style={{color:'black'}}>+ Add Time</Text></TouchableOpacity>)}
    <PracticeList app={app}/>
 </View>
  );
}
  
};

