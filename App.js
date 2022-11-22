import React, {Component} from 'react';
import Menu from './menu';
import Login from './signin';
import ComponentListInterface from './npm/componentListInterface';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import authService from './services/authService';
import Dispatch from './dispatch';
class App extends Component{
  constructor(props){
    super(props);
    this.dispatch=this.dispatch.bind(this);
    this.menuSlide= this.menuSlide.bind(this);
        this.state={
      componentListInterface:new ComponentListInterface(this.dispatch),
      componentList: undefined,
      positionSideBar:-300,
      color:"white",
      currentuser:undefined,
      switchCase: 'dash',
      fog: false,
      index:0,
      back: true, 
      bottom: -700,
          check:false

    }
  }

  async menuSlide(){
    if(this.state.positionSideBar===-300){
      for(let i=-300; i<=0; i+=25){
        const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1);
        this.setState({
          positionSideBar:i,
          fog:true,          
        })
      }
    }
    else{
      for(let i=0; i>=-300; i-=25){
        const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1);
        this.setState({
          positionSideBar:i,
          fog:false
        })
      }
    }
  }
  async componentDidUpdate(){
        
    // if(this.state.firstTime){
    //     
    //     let list = this.state.componentList.getList("student");
    //     for(const key in list){
    //         if (!list[key].getJson().firstTime){
    //             this.setState({firstTime:false})
    //         }
    //     }
    // }
  
    
    if(this.state.getOtherStudents){
        await this.setState({getOtherStudents:false});
        
        await authService.getOtherStudents(this.state.currentstudent.getJson().syncedStudents, this.state.email, this.state.componentList, this.state.currentstudent.getJson()._id);
        await this.setState({getOtherStudents:false});
    }

    if(this.state.backend!==undefined &&this.state.back){
        //
        await this.setState({backend: undefined, updateCircle:true});
        // console.log(this.state.backendUpdate)
        authService.dispatch(this.state.backendUpdate, this.state.email);  
        if(this.state.check &&this.state.bottom===-700){
          this.setState({
            fog:false, bottom:-700, check:false
          })

        }
    }
    else{
      if(!this.state.back){

        await this.setState({
          back: true,
          backend: undefined
        })
      }
    }
    if(this.state.addStarpoints!==undefined ||this.state.subStarpoints!==undefined){
        
        if(this.state.spRun){
            this.setState({spRun: false})
            ////
            let starpoints = await this.state.componentList.getList("starpoints", this.state.spid);
            ////
            let levelUp = this.state.addStarpoints!==undefined? await starpoints[0].calcSP(this.state.addStarpoints) : await starpoints[0].calcDownSP(this.state.subStarpoints);
        }
    }
    if(this.state.operate!==undefined ||this.state.operation==="run"){
        let operation = this.state.operation;
        let operate= this.state.operate;
        let object = this.state.object;
        await this.setState({operate:undefined, operation:"cleanJsonPrepare", object:undefined, currentComponent:undefined});
        let operationsFactory =this.state.componentList.getOperationsFactory();
        let splice = operate!==undefined? await operationsFactory.getSplice(operate) : "";
        
        let obj = await operationsFactory.operationsFactoryListener({operate:operate, operation:operation, object:object});
        
        let currentComponent=operate!==undefined? obj[splice][0]: undefined;
        await this.setState({currentComponent: currentComponent});
    }
}
  dispatch(obj){
    this.setState({...obj});

  }
  async componentDidMount(){
    let componentList= await this.state.componentListInterface.createComponentList();
    this.setState({
      componentList:componentList
    })
    
    // const user = await AsyncStorage.getItem('YOUR-KEY');
    // if(user){
    //   console.log(user);

    // }

  }

render(){
  // const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: this.state.color,//isDarkMode ? Colors.darker : Colors.lighter,
    height:'100%',
    width:'100%',
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
    position:'relative'
  };
  return (
    <View style={backgroundStyle}>
      
     
      {this.state.currentuser===undefined?(
        <Login app={{state:this.state, dispatch:this.dispatch}} />
      // <TouchableOpacity  onPress={async ()=>{
      //   let user = await authService.login("test@legato.com", "dragon", this.state.componentList, true, false);
      //   if(user){
      //     await authService.getAllTheDataForTheUser("test@legato.com", this.state.componentList, '1665687487874.1384', 'legato@gmail.com', this.dispatch);
      //     this.setState({email:user.email})
      //   }
        
      // }}  style={{ width:80, height:30, borderRadius:4,  justifyContent:"center", alignItems:"center", backgroundColor:"#696eb5"}}><Text style={{color:"black"}}>touchme</Text></TouchableOpacity>
      ):(<Dispatch app={{state:this.state, dispatch:this.dispatch}} menuSlide={this.menuSlide}/>)}
 </View>
  );
}
  
};

export default App;
