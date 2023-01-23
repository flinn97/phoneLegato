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
import InputComponent from './inputComponent';
// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';
// import CircularProgress from 'react-native-circular-progress-indicator';
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
            showTimer:true

    }
  }




render(){
  // const OPTIONS = { prefix: 'seconds elapsed!', delay: 100}

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
    <View style={{display:"flex", flexDirection:"row"}}> 
    <TouchableOpacity onPress={()=>{this.setState({showTimer:true})}} style={{fontSize:25, color:"white", alignSelf:'flex-start', marginLeft:30, marginTop:20 }}><Text >Timer/</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{this.setState({showTimer:false})}} style={{fontSize:25, color:"white", alignSelf:'flex-start', marginLeft:30, marginTop:20, marginLeft:5 }}><Text >Stop Watch</Text></TouchableOpacity></View>
    <Text style={{fontSize:35, color:"white" , marginTop:20, marginLeft:-13}}>  {this?.state?.m2}{this?.state?.mCount}:
            
            {this?.state?.s2}{this?.state?.sCount}</Text>

            {this?.state?.showTimer &&
            <InputComponent app={this.props.app} handleChange={(text)=>{
              if(parseInt(text)){
                if(parseInt(text)>99){
                  text="99";
                }
                let m = text.length===1? text: text[1];
                let m2 = text.length===1? "0": text[0];

                this.setState({m2:m2, mCount:m, s2:"0", sCount:"0"})
              }
            }}/>} 

            <Text style={{fontSize:25, color:"white" }}>Minutes</Text>
            <View style={{display:'flex', flexDirection:'row', width:220,marginTop:30, justifyContent:"space-between"}}>
    <TouchableOpacity  onPress={async()=>{
                        
        await this.setState({timer:true});

                        while(this.state.timer){
                           
                            if(this.state.timer){
                              if(this.state.showTimer){
                                let sCount = this.state.sCount.toString();
                                let mCount = this.state.mCount.toString();
                                let s2 = this.state.s2.toString();
                                let m2 = this.state.m2.toString();
                                if(s2==="0" && sCount==="0"){
                                  if(m2==="0" && mCount==="0"){
                                    this.setState({
                                      timer:false,
                                      sCount:"0",
                                      mCount:"0",
                                      s2:"0",
                                      m2:"0"
                                
                                    });
                                    break;
                                  }
                                  else{
                                    if(m2!=="0" && mCount==="0"){
                                      m2 = parseInt(m2)-1;
                                      mCount="9";
                                    }
                                    else if(mCount!=="0"){
                                      mCount=parseInt(mCount) -1;
                                    }
                                  }
                                  s2="5";
                                  sCount="9";
                                }
                                else{
                                  if(s2!=="0"&& sCount==="0"){
                                    s2= parseInt(s2) -1;
                                    sCount="9";
                                  }
                                  else{
                                    sCount= parseInt(sCount)-1;
                                  }
                                }


                                this.setState({
                                  mCount:mCount.toString(),
                                  sCount:sCount.toString(),
                                  s2: s2.toString(),
                                  m2: m2.toString()
                              })
                              }
                              else{

                              
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
                            }

                            const delay = ms => new Promise(res => setTimeout(res, ms));
                            await delay(1000);
                           
                        }
      }}  style={{ width:100, height:30, borderRadius:25,   justifyContent:"center", alignItems:"center", backgroundColor:"white",}}><Text style={{color:"black"}}>Start</Text></TouchableOpacity>
    <TouchableOpacity  onPress={()=>{this.setState({timer:false});}}  style={{ width:100, height:30,borderRadius:25, marginRight:5,  justifyContent:"center", alignItems:"center", backgroundColor:"white",}}><Text style={{color:"black"}}>Stop</Text></TouchableOpacity>
    </View>
    <TouchableOpacity  onPress={()=>{
                        this.setState({timer:false,s2:0, m2:0, sCount:0, mCount:0});
                    }}  style={{ width:100, height:30, borderRadius:25,   justifyContent:"center", alignItems:"center", marginLeft:5, backgroundColor:"white", marginTop:30}}><Text style={{color:"black"}}>Reset</Text></TouchableOpacity>


 </View>
  );
}
  
};

