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

export default class Eula extends Component{
  constructor(props){
    super(props);
        this.state={
          

    }
  }




render(){
  let app=this.props.app;
  let state=app.state;
  let currentstudent=state.currentstudent;
  
  const backgroundStyle = {
    backgroundColor: "white",//isDarkMode ? Colors.darker : Colors.lighter,
    height:"100%",
    width:'100%',
    display:'flex',
    alignItems:"center",
    position:'absolute',
    top:60,
    zIndex:1000
  };
  return (
    <View style={backgroundStyle}>
      {/* <TouchableOpacity onPress={()=>{app.dispatch({popupSwitch:"", currentBadge:undefined})}} style={{position:'absolute', top:30, right:30, zIndex:1003}}><Text>X</Text></TouchableOpacity> */}
    <View  style={{ position:'absolute', width:'100%', height:'100%', backgroundColor:'grey', opacity:.7, zIndex:1001 }}>
 </View>
 <View style={{width:'90%', height:'85%', marginTop:20, paddingTop:70,  backgroundColor:"white", zIndex:1002, display:'flex', alignItems:'center'}}>
  <Text style={{color:'black'}}>End User License Agreement</Text>
  <View style={{display:"flex", flexDirection:"column", width:"90%", height:"75%", marginTop:20}}>

  <SafeAreaView>
        <ScrollView>
          <Text style={{color:'black'}}>Welcome to Legato</Text>
          <Text style={{color:'black'}}>These Terms of Use (or "Terms") govern your use of Legato. When you create a Legato account or use Legato, you agree to these terms. 
</Text>
<Text style={{color:'black'}}>The Legato Service is provided to you by Flinnapps LLC. These Terms of Use Service constitute an agreement between you and Flinnapps LLC.
</Text>
<Text style={{color:'black'}}>The Legato Service:</Text>
<Text>We agree to provide you with the Legato Service. The Service includes all of the Legato features, applications, services, technologies, and software that we provide to enhance music training, student accountability, and student-teacher engagement. </Text>
<Text style={{marginLeft:30, color:'black'}}>Connect Music Teachers and their Students.  Legato's primary mission is to enable music teachers to manage, encourage, and provide accountability for their students. By using the Legato application, you acknowledge and agree that certain student information, limited to first name, last name, and email address may be added to the Legato platform by their authorized teachers. Other information includes assignments, goals, and links to other information resources added by teachers to help students improve. 
</Text>
<Text style={{marginLeft:30, color:'black'}}>Your Information and Sharing of Information
In order to use Legato features teachers add information about themselves and their students to the platform. Legato maintains this information in a secured database.  Flinnapps does not use this information for any other purpose other than for the operation of the software. Flinnapps does not sell or share this information with any third party. You can learn more about our data policies at: https://www.teachlegato.com/privacy-policy. By accepting these Terms, you also agree to this Legato data policy in order to use Legato. 
</Text>
<Text style={{marginLeft:30, color:'black'}}>Teacher Methods, Curriculum, and Content 
During the course of using Legato, teachers post assignments, homework, practice methods, examples, goals, and third-party material for the enhancement and teaching of students. Flinnapps does not claim ownership of any Teacher Methods, Curriculum or Content posted to the platform by Users. Legato users retain intellectual property rights of any information and content that originates from the user posted to the platform. 
</Text>
<Text style={{marginLeft:30, color:'black'}}>Communication on Legato. 
By using the Legato application, you acknowledge and agree that teachers can communicate with students via the text chat communication tool built into the platform. Using Legato, teachers can communicate to students in a one-way, one-to-many communication channel, and in a two-way one-to-one text communication channel. 
</Text>
<Text style={{marginLeft:30, color:'black'}}>Third Party Information, curriculum, and Products
During the course of using Legato, Teachers may include links to third-party learning resources or content. Further, Flinnapps may enable access to third-party learning resources. Access to any third-party services or content will be handled via separate license or user agreements for those services and are not covered by this end-user license agreement. 
</Text>
<Text style={{color:'black'}}>Your Commitments</Text>
<Text style={{color:'black'}}>In order to use Legato, you must agree to the following terms: 
</Text>
<Text style={{marginLeft:30, color:'black'}}>You must be at least 13 years old or have authorization from a parent or guardian.</Text>
<Text style={{marginLeft:30, color:'black'}}>You must not be a convicted sex offender.</Text>
<Text style={{marginLeft:30, color:'black'}}>You must not do anything unlawful, misleading, or fraudulent or for an illegal or unauthorized purpose.</Text>
<Text style={{marginLeft:30, color:'black'}}>You cannot do anything to interfere with or impair the intended operation of the Service. This includes misusing any communication, reporting, dispute, or appeals channel, such as by making fraudulent or groundless reports or appeals.</Text>
<Text style={{marginLeft:30, color:'black'}}>You cannot attempt to create accounts or access or collect information in unauthorized ways. This includes creating accounts or collecting information in an automated way without our express permission.</Text>
<Text style={{marginLeft:30, color:'black'}}>You cannot post someone else's private or confidential information (including student information) without permission, or do anything that violates someone else's rights, including intellectual property rights (e.g., copyright infringement, trademark infringement, counterfeit, or pirated goods).</Text>
<Text style={{marginLeft:30, color:'black'}}>You can't modify, translate, create derivative works of, or reverse engineer our products or their components.
</Text>
<Text style={{color:'black'}}>Permissions You Give to Us. 
</Text>
<Text style={{marginLeft:30, color:'black'}}>You agree that we can download and install updates to the Service on your device.
</Text>
<Text style={{color:'black'}}>Additional Rights We Retain
</Text>
<Text style={{marginLeft:30, color:'black'}}>If you select a username or similar identifier for your account, we may change it if we believe it is appropriate or necessary.</Text>
<Text style={{marginLeft:30, color:'black'}}>If you use content covered by intellectual property rights that we have and make available in our Service (for example, learning materials, curriculum, media, tools (such as the metronome) we retain all rights to our content (but not yours).</Text>
<Text style={{color:'black'}}>Content Removal and Disabling or Terminating Your Account
</Text>
<Text style={{marginLeft:30, color:'black'}}>We can remove any content or information you share on the platform if we believe it violates these Terms of Use or Data Policies, or we are permitted or required to do so by law. We can refuse to provide or stop providing all or part of the Service to you (including terminating or disabling your access to the platform) if you create risk or legal exposure for us, or violate these Terms of Use. We can also terminate or change the Service, remove or block content or information shared on our Service, or stop providing all or part of the Service if we determine that doing so is reasonably necessary to avoid or mitigate adverse legal or regulatory impacts on us.
</Text>
<Text style={{marginLeft:30, color:'black'}}>When you request to delete content or your account, the deletion process will automatically begin no more than 30 days after your request. After the content is deleted, it may take us up to another 90 days to remove it from backups and disaster recovery systems.
</Text>
<Text style={{marginLeft:30, color:'black'}}>Content will not be deleted within 90 days of the account deletion where deletion within 90 days is not possible due to technical limitations of our systems, in which case, we will complete the deletion as soon as technically feasible, or where deletion would restrict our ability to investigate or identify illegal activity or violations of our terms and policies.</Text>
<Text style={{color:'black'}}>Additional Agreement Terms: 
</Text>
<Text style={{marginLeft:30, color:'black'}}>If you use other features or related services enabled by the Legato software, you will be provided with an opportunity to agree to additional terms that will also become a part of our agreement. For example, if you use payment features, you will be asked to agree to the Payment Terms as part of using those services.  
</Text>
<Text style={{marginLeft:30, color:'black'}}>If any aspect of this agreement is unenforceable, the rest will remain in effect.</Text> 
<Text style={{marginLeft:30, color:'black'}}>Any amendment or waiver to our agreement must be in writing and signed by us. If we fail to enforce any aspect of this agreement, it will not be a waiver.</Text> 
<Text style={{marginLeft:30, color:'black'}}>We reserve all rights not expressly granted to you.</Text> 
<Text style={{color:'black'}}>Rights and Obligations
</Text>
<Text style={{marginLeft:30, color:'black'}}>Our past, present, and future affiliates and agents, including Legato LLC, can invoke our rights under this agreement in the event they become involved in a dispute. Otherwise, this agreement does not give rights to any third parties.</Text> 
<Text style={{marginLeft:30, color:'black'}}>You cannot transfer your rights or obligations under this agreement without our consent.</Text>
<Text style={{marginLeft:30, color:'black'}}>Our rights and obligations can be assigned to others. For example, this could occur if our ownership changes (as in a merger, acquisition, or sale of assets) or by law.</Text>
<Text style={{color:'black'}}>Warranty and Responsibilities 

</Text>
<Text style={{marginLeft:30, color:'black'}}>Our Service is provided "as is," and we can't guarantee it will be safe and secure or will work perfectly all the time. TO THE EXTENT PERMITTED BY LAW, WE ALSO DISCLAIM ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</Text>
<Text style={{marginLeft:30, color:'black'}}>Flinnapps does not control what people and others do or say, and we aren't responsible for their (or your) actions or conduct (whether online or offline) or content (including unlawful or objectionable content). We also aren't responsible for services and features offered by other people or companies, even if you access them through our Service.</Text> 
<Text style={{marginLeft:30, color:'black'}}>Our responsibility for anything that happens on the Service (also called "liability") is limited as much as the law will allow. If there is an issue with our Service, Flinnapps cannot know the possible impacts. You agree that we will not be held liable for any lost profits, revenues, information, or data, or consequential, special, indirect, exemplary, punitive, or incidental damages arising out of or related to these Terms. 
</Text> 
<Text style={{marginLeft:30, color:'black'}}>You agree to defend (at our request), indemnify and hold us harmless from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable attorney's fees and costs, arising out of or in any way connected with these Terms or your use of the Service. You will cooperate as required by us in the defense of any claim. We reserve the right to assume the exclusive defense and control of any matter subject to indemnification by you, and you will not, in any event, settle any claim without our prior written consent.
</Text> 
<Text style={{color:'black'}}>Updating These Terms


</Text>
<Text style={{color:'black'}}>Flinnapps may change the Legato Service and policies from time to time, and we may need to make changes to these Terms so that they accurately reflect our Service and policies. Unless otherwise required by law, we will notify you before we make changes to these Terms and give you an opportunity to review them before they go into effect. Then, if you continue to use the Service, you will be bound by the updated Terms. If you do not want to agree to these or any updated Terms, you are responsible for deleting your account and ceasing use of the Legato platform. 
</Text>
<Text style={{color:'black'}}>Published: January 06, 2023</Text>
    </ScrollView></SafeAreaView>
  <View >
  </View>
  </View>
 <View style={{display:"flex", flexDirection:"row"}}>

  <TouchableOpacity style={{ width:150, height:50, borderRadius:25, zIndex:600,  justifyContent:"center", alignItems:"center", backgroundColor:"#6C86F4", color:'white', marginTop:40}} onPress={async ()=>{
    await currentstudent.setJson({...currentstudent.getJson(), eula:true})
    await currentstudent.getOperationsFactory().cleanPrepareRun({update:currentstudent});
    app.dispatch({popupSwitch:""})
  }}><Text style={{fontSize:20, color:"white"}}>Accept</Text></TouchableOpacity>
 
 </View>
 </View>
 </View>
  );
}
  
};

