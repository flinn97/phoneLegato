import wolf from '../assets/place1.png';
import place2 from '../assets/place2.png';
import place3 from '../assets/place3.png';
import place4 from '../assets/place4.png';
import place5 from '../assets/place5.png';
import place6 from '../assets/place6.png';
import place7 from '../assets/place7.png';
import flat from '../assets/badges/blue-badge-flat.png';
import whole from '../assets/badges/blue-badge-whole.png';
import eighth from '../assets/badges/green-badge-eighth.png';
import quarter from '../assets/badges/green-badge-quarter.png';
import symbol from '../assets/badges/light-blue-badge-symbol.png';
import osymbol from '../assets/badges/orange-badge-symbol.png';
import treble from '../assets/badges/orange-badge-treble.png'
import va from '../assets/badges/purple-badge-8va.png';
import reight from '../assets/badges/red-badge-eighths.png';
import moment from 'moment';
import authService from './authService';
class StudentService{

    badge(picURL){
        let pic;
        if(picURL){
        if(picURL.includes('Artboard_1')){
            pic=treble
        } 
        else if(picURL.includes('Artboard_2')){
            pic=eighth
        }
        else if(picURL.includes('Artboard_3')){
            pic=osymbol
        }
        else if(picURL.includes('Artboard_4')){
            pic=whole
        }
        else if(picURL.includes('Artboard_5')){
            pic=va
        }
        else if(picURL.includes('Artboard_6')){
            pic=reight
        }
        else if(picURL.includes('Artboard_7')){
            pic=quarter
        }
        else if(picURL.includes('Artboard_9')){
            pic=flat
        }
        else if(picURL.includes('Artboard_10')){
            pic=symbol
        }
        else{
            pic=picURL
        }
      }
      else{
        pic=treble
      }

      return pic;
      }

      pic(picURL){
        let pic;
        if(picURL){
        if(picURL.includes('place1')){
        
            pic=wolf
          
        }
        else if(picURL.includes('place2')){
            pic=place2
        }
        else if(picURL.includes('place3')){
            pic=place3
        }
        else if(picURL.includes('place4')){
            pic=place4
        }
        else if(picURL.includes('place5')){
            pic=place5
        }
        else if(picURL.includes('place6')){
            pic=place6
        }
        else if(picURL.includes('place7')){
            pic=place7
        }
        else{
            pic=picURL
        }
      }
      else{
        pic=wolf
      }

      return pic;
      }
      async logTime(props, dayfortimepopup, timeadded){
        await props.app.state.currentstudent.addTime(dayfortimepopup, timeadded);
        props.app.dispatch({});
        if(parseInt(timeadded)===0){
            props.app.dispatch({subStarpoints:props.app.state.currentstudent.getJson().type, spRun:!props.app.state.currentstudent.getJson().check });
        }
        else{
            props.app.dispatch({addStarpoints:props.app.state.currentstudent.getJson().type, spRun:!props.app.state.currentstudent.getJson().check });
        }
    }
      time(props){
        let app=props.app;
      let state=app.state;
      let currentstudent=state.currentstudent;
    
        let obj={
          Monday:currentstudent.getJson().time.mon,
          Tuesday:currentstudent.getJson().time.tues,
          Wednesday:currentstudent.getJson().time.wed,
          Thursday:currentstudent.getJson().time.thur,
          Friday:currentstudent.getJson().time.fri,
          Saturday:currentstudent.getJson().time.sat,
          Sunday:currentstudent.getJson().time.sun
        }
        return(obj[moment().format('dddd')])
      }
      checked(props){
        let app=props.app;
      let state=app.state;
      let currentstudent=state.currentstudent;
    
        let obj={
          Monday:currentstudent.getJson().checked.mon,
          Tuesday:currentstudent.getJson().checked.tues,
          Wednesday:currentstudent.getJson().checked.wed,
          Thursday:currentstudent.getJson().checked.thur,
          Friday:currentstudent.getJson().checked.fri,
          Saturday:currentstudent.getJson().checked.sat,
          Sunday:currentstudent.getJson().checked.sun
        }
        return(obj[moment().format('dddd')])
      }
      getDay(){

        let obj={
          Monday:'mon',
          Tuesday:'tues',
          Wednesday:'wed',
          Thursday:'thur',
          Friday:'fri',
          Saturday:'sat',
          Sunday:'sun'
        }
        return(obj[moment().format('dddd')])
      }
      async markcheckbox(props, day) {
        let comp = props.app.state.currentstudent
        let component = comp.getJson();
        await comp.checked(day);
        let sp = comp.checked[day] ? { addStarpoints: component.type } : { subStarpoints: component.type };
       props.app.dispatch({ ...sp, spRun: true, spid: component._id });
                // if (component.time &&checked[day]) {
                //         this.props.app.dispatch({ popupSwitch: "addTime", currentComponent: comp, forTime: day })
                // }
        
}
    async marckGoalCheckBox(props, goal){

        //
        let id = props.app.state.currentstudent.getJson()._id;
        let goalJson=goal.getJson();

        let sp = props.app.state.componentList.getComponent("starpoints", id);
        let type = goalJson.mainID? "goal":"mainGoal";
        goal.checked();

                if(goalJson.complete){
            sp.calcSP(type);
        }
        else{
            sp.calcDownSP(type);
        }
        
        
    }
    async changeStudentsEmail(email, password, student, dispatch){
        
      let s = student?.getJson();
      if(Object.keys(s.syncedStudents)[0]){
          for(const key in s.syncedStudents){

             await  authService.deleteStudent(s.syncedStudents[key]+"@legato.com");
             
             await authService.loginToDel(s.syncedStudents[key]+"@legato.com", s.syncedStudents[key])
             await authService.delAccount();
             
          }
          
          await authService.register(email, password, true);
          
          await authService.registerStudentWithEmail(email,{email:s.collection, _id:s._id, student:true});
          
      }
      else{
        
          await authService.deleteStudent(s._id+"@legato.com");
          
          await authService.loginToDel(s._id+"@legato.com", s._id);
          
          await authService.delAccount();
          
          await authService.register(email, password, true);
          await authService.registerStudentWithEmail(email,  {email:s.collection, _id:s._id, student:true});
          
      } 
      await student.setJson({...s, firstTime:false});
      await student.getOperationsFactory().cleanPrepareRun({update:[student]});    
      authService.requestUserPermission();
      authService.saveToken(email);
      authService.checkToken(email);
      await dispatch({login:true, firstTime:false});
  }




}
export default new StudentService();