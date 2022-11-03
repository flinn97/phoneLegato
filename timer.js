import React, {Component} from 'react';

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
export default class Timer extends Component{
  constructor(props){
    super(props);
        this.state={
          percent: "",
          mCount: 0,
            sCount: 0,
            timer: false,
            m2: "0",
            s2: "0",

    }
  }




render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  const OPTIONS = { prefix: 'seconds elapsed!', delay: 100}

  // const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: "#56ba8e",//isDarkMode ? Colors.darker : Colors.lighter,
    height:300,
    width:'100%',
    display:'flex',
    alignItems:"center",
    
    
  };
  return (
    <View  style={backgroundStyle}>
    <Text style={{fontSize:25, color:"white", alignSelf:'flex-start', marginLeft:30, marginTop:20 }}>Timer</Text>
    <Text style={{fontSize:35, color:"white" , marginTop:20, marginLeft:-13}}>  {this.state.m2}{this.state.mCount}:
            
            {this.state.s2}{this.state.sCount}</Text>
            <Text style={{fontSize:25, color:"white" }}>Minutes</Text>
            <View style={{display:'flex', flexDirection:'row', width:220,marginTop:30, justifyContent:"space-between"}}>
    <TouchableOpacity  onPress={async()=>{
                        
        await this.setState({timer:true});

                        while(this.state.timer){
                           
                            if(this.state.timer){
                                let sCount = this.state.sCount+1;
                                let mCount = this.state.mCount;
                                let s2 = "0";
                                let m2 = "0";
                                
                                if(sCount===60){
                                    sCount=1
                                    mCount++;
                                }

                                if(sCount>=10){
                                    s2=""
                                } else {
                                    s2="0"
                                }

                                if(mCount>=10){
                                    m2=""
                                } else {
                                    m2="0"
                                }


                                this.setState({
                                    mCount:mCount,
                                    sCount:sCount,
                                    s2: s2,
                                    m2: m2
                                })
                            }
                            const delay = ms => new Promise(res => setTimeout(res, ms));
                            await delay(1000);
                           
                        }
      }}  style={{ width:100, height:30, borderRadius:25,   justifyContent:"center", alignItems:"center", backgroundColor:"white",}}><Text style={{color:"black"}}>Start</Text></TouchableOpacity>
    <TouchableOpacity  onPress={()=>{this.setState({timer:false});}}  style={{ width:100, height:30,borderRadius:25, marginRight:5,  justifyContent:"center", alignItems:"center", backgroundColor:"white",}}><Text style={{color:"black"}}>Stop</Text></TouchableOpacity>
    </View>
    <TouchableOpacity  onPress={()=>{
                        this.setState({timer:false, sCount:0, mCount:0});
                    }}  style={{ width:100, height:30, borderRadius:25,   justifyContent:"center", alignItems:"center", marginLeft:5, backgroundColor:"white", marginTop:30}}><Text style={{color:"black"}}>Reset</Text></TouchableOpacity>


 </View>
  );
}
  
};

