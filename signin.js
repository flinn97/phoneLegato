import React, { Component } from "react";
import AuthService from "./services/authService";
import loading from "./assets/loading.gif";
import logoLegato from "./assets/logo.png";
import person from './assets/avatar_2x.png'
import AsyncStorage from '@react-native-async-storage/async-storage';



// import InputComponent from "./inputComponent";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  Switch,
  
} from 'react-native';
import authService from "./services/authService";

export default class Login extends Component {
   
    //state creation and binding.
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            
            done:false,
            email:"",
            password:"",
            loading:false,
            messageSwitch: false,
            currentMessage:"",
            message:{
                wrongPassword:"Email or password was incorrect please try again.",
                email:"Please fill out the required fields.",
                

            },
            attempt: 0,
            tooManyLoginAttempts:false
        };
    }


    //handles all changes with state.
    handleChange = (event) => {
        
        const { name, value } = event.target
        if(name==="email"){
            value = value.toLowerCase();
        }
        this.setState({
            [name]: value,
        })
    }
    

    //submites for login using the controller to connect with backend. Sends to the teacher profile if teacher or the student if back end spits out student.
    async handleLogin(e,) {
        if(this.state.attempt>=10){
            this.setState({
                tooManyLoginAttempts:true,
            })
            return;
        }
        else{
            this.setState({
                attempt: this.state.attempt+1
            })
        }
        if(this.state.email===""){
            this.setState({
                messageSwitch:true,
                currentMessage:this.state.message.email,
                loading:false,
            })
            return
        }
        await this.setState({
            loading:true
        })
        let email = this.state.email
        let password = this.state.password
        let student = false;
        let teacher = false;
        let app = this.props.app;
       let dispatch= app.dispatch;
       let comp = this.props.app.state.componentList;
        if(this.state.student){
          
            let getEmail = await AuthService.getStudentsTeacher(email+"@legato.com");
            email = email+"@legato.com";
            if(!getEmail){
              this.setState({
                messageSwitch:true,
                loading:false,
                currentMessage:this.state.message.wrongPassword
            })
            return
            }
            teacher = getEmail?.email;
            password = this.state.email;
            student = this.state.email;
            this.props.app.dispatch({firstTime:true})
            
        }
        else{
            let s = await AuthService.getStudentsTeacher(email);
            if(s?.student){
                student= s._id;
                teacher= s.email;
            }
        }
        
        let user = await AuthService.login(email, password, this.props.app.state.componentList, student, teacher);
        
        if(user){
            if(!this.state.student){
                try {
                    let json = JSON.stringify(user);
                    await AsyncStorage.setItem("@userKey",
                    json
                    );
                  } catch (error) {
                    // Error saving data\
                  }
              }
            
            //   const value = await AsyncStorage.getItem("@userKey");
            if(!student){
              this.setState({
                messageSwitch:true,
                loading:false,
                currentMessage:this.state.message.wrongPassword
            })

            }
            else{
            await AuthService.getAllTheDataForTheUser(email, this.props.app.state.componentList, student, teacher, this.props.app.dispatch);
            if(this.state.student){
              await this.props.app.dispatch({firstTime:true, })
            }
           
            }
            AuthService.saveToken(this.state.email);
      AuthService.checkToken(this.state.email);

        }
        else{
          
            this.setState({
                messageSwitch:true,
                loading:false,
                currentMessage:this.state.message.wrongPassword
            })
        }

    }


    render() {
        let app = this.props.app;
       let dispatch= app.dispatch;
       let state = app.state;
       let styles = state.styles;
       let comp = this.props.app.state.componentList;
        //login page for the screen. 
        return (
            <View style={{width:"100%", height:"100%",  alignItems:'center', }}>
                                <Image source={logoLegato} style={{alignSelf:"center", width:200, position:'absolute', top:100}}/>

            <View className="col-md-12" style={{backgroundColor:"white", marginTop:200}}> 
            
                <View> 
                    
                <View  className="card card-container" style={{background:"white", display:'flex', alignItems:'center'}}>
                    <Image source={person}  alt="profile-img" style={{borderRadius:100, width:150, height:150 }} />
                    {this.state.forgot?(<View>
                    
                        <View style={{ marginTop:50}} className="form-group">
                                    <View htmlFor="Email">{this.state.student?(<Text style={{color:"black"}}>Code</Text>):(<Text style={{color:"black"}}>Please enter your email</Text>)}</View>
                                    <TextInput
                                      style={{borderColor:"black", borderWidth :1, borderRadius:7, width:250, height:40, marginTop:7, color:"black"}}
                                        onChangeText={(text)=>{
                                            text = text.toLowerCase();
                                          this.setState({email:text})
                                        }}
                                        value={this.state.value}
                                      />
                                    
                                </View>
                                </View>):(
                    <View>
                                <View className="form-group" style={{marginTop:30}}>
                                    <View htmlFor="Email">{this.state.student?(<Text style={{color:"black"}}>Code</Text>):(<Text style={{color:"black"}}>Email</Text>)}</View>
                                    <TextInput
                                      style={{borderColor:"black", borderWidth :1, borderRadius:7, width:250, height:40, marginTop:7, color:"black"}}
                                        onChangeText={(text)=>{
                                            text = text.toLowerCase();
                                          this.setState({email:text})
                                        }}
                                        value={this.state.value}
                                      />
                                </View>
                            {!this.state.student&&(
                                <View className="form-group" style={{marginTop:30}}>
                                    <Text style={{color:"black"}} htmlFor="password">Password</Text>
                                    <TextInput
                                    secureTextEntry={true}
                                      style={{borderColor:"black", borderWidth :1, borderRadius:7, width:250, height:40, marginTop:7, color:"black"}}
                                        onChangeText={(text)=>{
                                          this.setState({password:text})
                                        }}
                                        type="password"
                                        value={this.state.value}
                                      />
                                </View>)}
                                </View>)}
                                {this.state.forgot?(
                                <View>
                                    <View className="form-group" style={{marginTop:37}}>
                                    <TouchableOpacity className="btn  btn-block" 
                                    style={{ width:150, height:50, borderRadius:25, zIndex:600,  justifyContent:"center", alignItems:"center", backgroundColor:"#6C86F4", color:'white' }} 
                                    onClick={AuthService.sendForgotPasswordChange.bind(this,this.state.email)} >
                                        <Text style={{color:"white"}}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                                </View>
                                ):(
                                <View className="form-group" style={{marginTop:37, display:'flex', width:"100%", alignItems:'center'}}>
                                    <TouchableOpacity className="btn  btn-block" 
                                    style={{ width:150, height:50, borderRadius:25, zIndex:600,  justifyContent:"center", alignItems:"center", backgroundColor:"#6C86F4", color:'white' }} 
                                    onPress={this.handleLogin} >
                                        <View>{this.state.loading?(<Text style={{color:'white'}}>Loading...</Text>):(<Text style={{color:'white'}}>Login</Text>)}</View>
                                    </TouchableOpacity>
                                    {this.state.messageSwitch&&(<Text style={{color:"red"}}>{this.state.currentMessage}</Text>)}
                                </View>
                                )}
                               {!this.state.student &&!this.state.forgot? (<TouchableOpacity onPress={()=>{this.setState({student:true})}}><Text style={{color:"blue", cursor:"pointer", textDecoration:"underline", marginTop:20, marginBottom:20}} 
                               >Have a Code?</Text></TouchableOpacity>):(<TouchableOpacity onPress={()=>{this.setState({student:false, forgot:false})}}><Text style={{color:"blue", cursor:"pointer", textDecoration:"underline", marginTop:20, marginBottom:20}} 
                               >Back</Text></TouchableOpacity>)}
                                {/* <TouchableOpacity 
                                onPress={()=>{this.setState({forgot:true})}}> 
                                {!this.state.student&&(<>
                                {this.state.forgot? (<></>):(<Text style={{color:"blue", cursor:"pointer", textDecoration:"underline"}} >Forgot Password</Text>)}</>)}
                                </TouchableOpacity> */}
                   
                    
                </View>
            </View>
            </View>
            </View>
        );
    }
}