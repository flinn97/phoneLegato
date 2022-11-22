import React, { Component } from "react";
import AuthService from "./services/authService";
import loading from "./assets/loading.gif";
import logoLegato from "./assets/logo.png";
import person from './assets/avatar_2x.png'
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
import studentService from "./services/studentService";

export default class StudentRegister extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            enabled:false,

            loading:false,
            messageSwitch: false,
            currentMessage:"",
            message:{
                email:"Please fill out the required fields.",
                password:"Password must include at least 1 symbol 1 number 1 upper and lower case letters and be at least 8 characters long",
                notAnEmail:"Please enter a valid email"

            },
            attempt: 0,
            tooManyLoginAttempts:false
           
        };
    }
  
    onChange(value) {
      }
    //handles all changes with state.
    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }
    //submites for login using the controller to connect with backend. Sends to the teacher profile if teacher or the student if back end spits out student.
    async handleLogin(e) {
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
        await this.setState({
            loading:true
        })
        // if(validator.isStrongPassword(this.state.password, {
        //     minLength: 6, minLowercase: 1,
        //     minUppercase: 1, minNumbers: 1, minSymbols: 1
        //   })) {
            
        //   } else {
        //     if(this.state.email.length>0){
        //         this.setState({
        //             currentMessage:this.state.message.password,
        //             loading:false,
        //             messageSwitch:true
        //         })
        //         return
        //     }
            
        //   }
        if(this.state.password===""){
            
                this.setState({
                                currentMessage:this.state.message.password,
                                loading:false,
                                messageSwitch:true
                            });
                            return;
        }
          if(this.state.email===""){
            this.setState({
                currentMessage:this.state.message.email,
                loading:false,
                messageSwitch:true
            })
            return
          }
        //   if(!validator.isEmail(this.state.email)){
        //     this.setState({
        //         currentMessage:this.state.message.notAnEmail,
        //         loading:false,
        //         messageSwitch:true
        //     })
        //     return
        //   }
        
        await studentService.changeStudentsEmail(this.state.email, this.state.password, this.props.app.state.currentuser, this.props.app.dispatch);

    }

    render() {
        //login page for the screen. 
        return (
            <View style={{height:"100%",
            backgroundColor: "white",
            width:'100%',
            display:'flex',
            alignItems:"center",
            justifyContent:'center',
            position:'absolute',
            top:0,
            zIndex:1000 }}>
            <Image source={logoLegato} style={{alignSelf:"center", width:200, position:'absolute', top:100}}/>

<View className="col-md-12" style={{backgroundColor:"white", marginTop:70}}> 

<View  className="card card-container" style={{background:"white", display:'flex', alignItems:'center'}}>
<Image source={person}  alt="profile-img" style={{borderRadius:100, width:150, height:150 }} />
                        <Text style={{width:300, display:'flex', alignItems:'center', justifyContent:'center', marginTop:20}}>Welcome to Legato Student! Please enter a new email and password to continue.</Text>
                        <View>
                                <View className="form-group" style={{marginTop:30}}>
                                    <View htmlFor="Email">{this.state.student?(<Text>Code</Text>):(<Text>Email</Text>)}</View>
                                    <TextInput
                                      style={{borderColor:"black", borderWidth :1, borderRadius:7, width:250, height:40, marginTop:7}}
                                        onChangeText={(text)=>{
                                          this.setState({email:text})
                                        }}
                                        value={this.state.value}
                                      />
                                </View>
                            {!this.state.student&&(
                                <View className="form-group" style={{marginTop:30}}>
                                    <Text htmlFor="password">Password</Text>
                                    <TextInput
                                    secureTextEntry={true}
                                      style={{borderColor:"black", borderWidth :1, borderRadius:7, width:250, height:40, marginTop:7}}
                                        onChangeText={(text)=>{
                                          this.setState({password:text})
                                        }}
                                        type="password"
                                        value={this.state.value}
                                      />
                                </View>)}
                                </View>
                                <TouchableOpacity className="btn  btn-block" 
                                    style={{ width:150, height:50, marginTop:30, borderRadius:25, zIndex:600,  justifyContent:"center", alignItems:"center", backgroundColor:"#6C86F4", color:'white' }} 
                                    onPress={this.handleLogin} >
                                        <View>{this.state.loading?(<Text style={{color:'white'}}>Loading...</Text>):(<Text style={{color:'white'}}>Continue</Text>)}</View>
                                    </TouchableOpacity>
                                    {this.state.messageSwitch&&(<Text style={{color:"red"}}>{this.state.currentMessage}</Text>)}
                </View>
            </View>
            </View>
        );
    }
}