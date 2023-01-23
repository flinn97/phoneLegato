import React, {Component} from 'react';
import downArrow from './assets/downArrow.png'

import authService from './services/authService';
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

//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class ContextMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

    };
 
    

    render() {
        let app=this.props.app;
        let state=app.state;
        let dispatch=app.dispatch;
        let currentstudent=state.currentstudent;
        let homeworks = state.componentList.getList('homework', currentstudent.getJson()._id)
        const backgroundStyle = {
          backgroundColor: "white",//isDarkMode ? Colors.darker : Colors.lighter,
          height:200,
          marginBottom:-10,
          width:'100%',
          borderRadius:25,
          display:'flex',
          alignItems:"center",
          
          zindex:500
          
        };
        return ( 
            
                <View style={backgroundStyle}>
                <TouchableOpacity onPress={()=>{app.dispatch({fog:false, contextBottom:-500, context:false})}} style={{  zIndex:600, position:"absolute", right:10, top:10 }}><Image source={downArrow}/></TouchableOpacity>
                <TouchableOpacity style={{marginTop:40}} onPress={()=>{
                    
                    this.props.user.block({userID: this.props.content.getJson().owner, contentID: this.props.content.getJson()._id});
                    dispatch({popupSwitch:"blocked"})

                }}>
                     <Text style={{fontSize:20, color:'black'}}>Block </Text>
                     </TouchableOpacity>
                 <TouchableOpacity  style={{marginTop:20}} onPress={()=>{
                    
                    this.props.user.hide({contentID: this.props.content.getJson()._id, content: this.props.content.getJson()[this.props.name]});
                    dispatch({popupSwitch:"hide"})

                }}><Text style={{fontSize:20, color:'black'}}>Hide</Text></TouchableOpacity>
                <TouchableOpacity  style={{marginTop:20}}  onPress={async ()=>{
                  this.props.user.report({userReported:this.props.reportUser, contentID: this.props.content.getJson()._id});
                  dispatch({popupSwitch:"report"})
                }}><Text style={{fontSize:20, color:'black'}}>Report</Text></TouchableOpacity>
               

                    

                </View>
                
        

            )
    }
};
export default ContextMenu;