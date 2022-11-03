import React, {Component} from 'react';
import {

  Switch
} from 'react-native';

export default class SwitchComponent extends Component{
  constructor(props){
    super(props);
        this.state={
          
          isEnabled: this.props.isEnabled? this.props.isEnabled: false
    }
  }
  async componentDidMount(){
      await this.setState({obj:this.props.obj, isEnabled: this.props.obj.getJson()[this.props.name]})
    
  }



render(){
  

  return (
    <Switch
    trackColor={{ false: "#767577", true: "#6C86F4" }}
    // thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
    ios_backgroundColor="#3e3e3e"
    onValueChange={()=>{
      this.setState({isEnabled:!this.state.isEnabled
      
      })
      this.state.obj.setJson({...this.state.obj.getJson(), [this.props.name]: !this.state.obj.getJson()[this.props.name]});
    }}
      
    value={this.state.isEnabled}
  />
  );
}
  
};

