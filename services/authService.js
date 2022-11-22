// import { ref, uploadBytes, getDownloadURL, deleteObject } from "@react-native-firebase/storage";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
// import { doc, getDocs, collection, getDoc, updateDoc, addDoc, where, query, setDoc, deleteDoc, onSnapshot, querySnapshot, Timestamp, serverTimestamp, orderBy  } from '@react-native-firebase/firestore';
// import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, getAuth,sendPasswordResetEmail, updateEmail, deleteUser  } from "@react-native-firebase/auth";



//be sure to upload axios. This is my controller for everything that I do for the backend.
class AuthService {
    async saveTokenToDatabase(email, token) {

        await firestore()
          .collection('users')
          .doc(email)
          .update({
            tokens: firestore.FieldValue.arrayUnion(token),
          });
          return token
      }

    async saveToken(email){
       let token = await messaging()
      .getToken()
      .then(token => {
        return this.saveTokenToDatabase(email, token);
      });
      
    }
    async checkToken(email){
        await messaging().onTokenRefresh (token => {
            return this.saveTokenToDatabase(email, token);
          });
    }

    async requestUserPermission() {
        const authorizationStatus = await messaging().requestPermission();
      
        if (authorizationStatus) {
          console.log('Permission status:', authorizationStatus);
        }
      }

/**
 * 
 * @param {*} role 
 * @param {*} id 
 * @param {*} changeData 
 * @returns change any data I want.
 */
 async dispatch(obj, email) {
    for (const key in obj) {
        let operate = obj[key];
        for (let i = 0; i < operate.length; i++) {
            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(1000);
            let component = key !== "del" ? operate[i].getJson() : operate[i];
            switch (key) {
                case "add":
                    component.collection = email;
                    component.date = await serverTimestamp();
                    await firestore().collection('users').doc(email).collection('components').doc(component._id).set(component);
                    break;
                case "del":
                    await firestore().collection('users').doc(email).collection('components').doc(component._id).delete();
                    break;
                case "update":
                    await firestore().collection('users').doc(email).collection('components').doc(component._id).update(component);
                    break;
            }
        }
    }
}
    async getAllTheDataForTheUser(email, componentList, student, teacher, dispatch) { 
        let rawData = [];
        if(student){
            await firestore().collection("users").doc(teacher).collection("components").where('owner', '==', student).orderBy("date").get().then(async querySnapshot=>{
                await componentList.clearList();
                rawData = [];
                for (const key in querySnapshot.docs) {
                    let data = querySnapshot.docs[key].data()
                    rawData.push(data);
                }
                await componentList.addComponents(rawData, false);
                if (student) {
                    let user = await componentList.getComponent('student');
                    dispatch({login: false, getOtherStudents: true, currentuser: user, email: teacher, currentstudent: user, myswitch: "studentDash", checkURL: true, getChatroom:true });
                }
                else {
                    let user = await componentList.getComponent('user');
                    dispatch({ login: false, currentuser: user, email: email, checkURL: true });
                }
            })
    }
}
async getOtherStudents(studentlist, email, componentList, id) {
    let rawData = []
    for (const key in studentlist) {
        if(studentlist[key]!==id){
            await firestore().collection("users").doc(email).collection("components").where('owner', '==', studentlist[key]).orderBy("date").get().then(async querySnapshot=>{
            rawData = [];
            for (const key in querySnapshot.docs) {
                await componentList.clearSelectedList(querySnapshot.docs[key].data()._id, "_id");
                let data = querySnapshot.docs[key].data()
                rawData.push(data);
            }
            await componentList.addComponents(rawData, false);

        });
    }
    }
}
async register(email, password, addToCache) {

    let user;
    await auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        user = userCredential.user;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
    // if (addToCache) {
    //     // localStorage.setItem("user", JSON.stringify(user));

    // }

    return user;
}
async login(email, password, componentList, student, teacher) {
    let user;
    await auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    
    return user;
}

async uploadPics(pic, name) {
    const storageRef = storage().ref(name);
    await storage().uploadBytes(storageRef, pic).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
}
async downloadPics(name) {
    let src=await storage().ref(name).getDownloadURL()
}

// async registerStudent(obj, email) {
//     await firestore().collections('users').doc(email+ "@legato.com").set(obj)
// }
async registerStudentWithEmail(email,obj,) {
    await firestore().collection('users').doc(email).set(obj)
}
async getStudentsTeacher(email) {
    return await (await firestore().collection('users').doc(email).get()).data();

}

async getGeneralChatroom(email, componentList){
    
    let comps = await firestore().collection('users').doc(email).collection('components').doc('generalChatroom').get();
    
    let rawData = [];
    if (comps) {
        let data = await comps.data()
        
        rawData = [data];
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

        await componentList.addComponents(rawData, false);
}
async getGeneralChatPosts(email, componentList){
    let comps = await firestore().collection('users').doc(email).collection('components').where('chatroom', '==', "generalChatroom").orderBy('date').get().then(async querySnapshot=>{
        await componentList.clearSelectedList("generalChatroom", "chatroom");
        let rawData = [];
        for (const key in querySnapshot.docs) {
            let data = querySnapshot.docs[key].data()
            rawData.push(data);
        }
        await componentList.addComponents(rawData, false);
            // dispatch({  });
    });
}
async deleteStudent( email) {
    await firestore().collection('users').doc(email).delete();
}
async loginToDel(email, password,) {
    
    await auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

}
async delAccount(){
    let user = auth().currentUser;
    
    user
      .delete()
      .then(() => console.log("User deleted"))
      .catch((error) => console.log(error));
}


}
export default new AuthService();
// async getCurrentUser() {
//     // return localStorage.getItem("user");
// }
// async getAllTheDataForTheUser(email, componentList, student, teacher, dispatch) {
//     let obj = {}

//     let rawData = [];
//     let components;
//     if(student){
//         components =  query(collection(db, "users", teacher, "components"), where('owner', '==', student), orderBy("date"))
        
//     }
//     else{
//         components =  query(collection(db, "users", email, "components"), where('collection', '==', email), orderBy("date"));
//     }
     
//     // let comps= await getDocs(components);
//     let comps = await onSnapshot(components, async (querySnapshot) => {
        
//         await componentList.clearList();
//         rawData = [];
        
        

//         for (const key in querySnapshot.docs) {

//             let data = querySnapshot.docs[key].data()
            
//             rawData.push(data);
//         }

//         await componentList.addComponents(rawData, false);

//         if (student) {
//             let user = await componentList.getComponent('student');
           

//             dispatch({login: false, getOtherStudents: true, currentuser: user, email: teacher, currentstudent: user, myswitch: "studentDash", checkURL: true, getChatroom:true });

//         }
//         else {
//             let user = await componentList.getComponent('user');
//             dispatch({ login: false, currentuser: user, email: email, checkURL: true });

//         }

//     });
    


// }
// async getOtherStudents(studentlist, email, componentList, id) {
//     let rawData = []
//     for (const key in studentlist) {
//         if(studentlist[key]!==id){
//         let docRef = query(collection(db, "users", email, "components"), where('owner', '==', studentlist[key]), orderBy("date"));

//         let comps = await onSnapshot(docRef, async (querySnapshot) => {
            
            

//             rawData = [];
//             for (const key in querySnapshot.docs) {
//                 await componentList.clearSelectedList(querySnapshot.docs[key].data()._id, "_id");
//                 let data = querySnapshot.docs[key].data()
//                 rawData.push(data);
//             }

//             await componentList.addComponents(rawData, false);

//         });
//     }
//     }
// }
// async register(email, password, addToCache) {

//     let user;
//     await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
//         user = userCredential.user;
//     }).catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//     })
//     // if (addToCache) {
//     //     // localStorage.setItem("user", JSON.stringify(user));

//     // }

//     return user;
// }
// async getUserInfo(email, componentList, student, teacher) {
//     const components = student ? await query(collection(db, "users", teacher, "components"), where('_id', '==', student)) : await query(collection(db, "users", email, "components"), where('email', '==', email));
//     let comps = await getDocs(components);
//     let rawData = [];
//     for (const key in comps.docs) {
//         let data = comps.docs[key].data();
//         rawData.push(data);

//     }
// }
// async login(email, password, componentList, student, teacher) {
//     let user;
//     await signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in 
//             user = userCredential.user;
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//         });
//     if (user) {
//         let saveUser = student ? { ...user, teacher: teacher, student: student } : user
//         // await localStorage.setItem("user", JSON.stringify(saveUser));
//         // await this.getUserInfo(email, componentList, student, teacher);
//         // user=await componentList.getComponent(student?'student':'user');
//     }
//     return user;
// }

// async logout() {
//     // await localStorage.clear();
//     let logouser;
//     await onAuthStateChanged(auth, (user) => {
//         if (user) {
//             // User is signed in, see docs for a list of available properties
//             // https://firebase.google.com/docs/reference/js/firebase.User
//             logouser = user.uid;
//             // ...
//         }
//     })
//     if (logouser) {
//         await signOut(auth);

//     }
//     // window.location.reload();
// }


// async uploadPics(pic, name) {
//     const storageRef = ref(storage, name);
//     await uploadBytes(storageRef, pic).then((snapshot) => {
//         console.log('Uploaded a blob or file!');
//     });
// }

// async downloadPics(name) {
//     let src;
//     await getDownloadURL(ref(storage, name)).then((url) => {

//         src = url;
//     })
//     return src;
// }
// deletePics(name) {

//     const delRef = ref(storage, name);
//     // Delete the file
//     deleteObject(delRef).then(() => {
//         // File deleted successfully
//     }).catch((error) => {
//         // Uh-oh, an error occurred!
//     });
// }

// /**
//  * 
//  * @param {*} role 
//  * @param {*} id 
//  * @param {*} changeData 
//  * @returns change any data I want.
//  */
// async dispatch(obj, email) {

//     for (const key in obj) {
//         let operate = obj[key];
//         for (let i = 0; i < operate.length; i++) {
//             const delay = ms => new Promise(res => setTimeout(res, ms));
//             await delay(1000);
//             let component = key !== "del" ? operate[i].getJson() : operate[i];
//             switch (key) {
//                 case "add":
//                     component.collection = email;
//                     component.date = await serverTimestamp();
//                     await setDoc(doc(db, 'users', email, 'components', component._id), component);
//                     break;
//                 case "del":
//                     await deleteDoc(doc(db, 'users', email, 'components', component));
//                     break;
//                 case "update":
//                     await updateDoc(doc(db, 'users', email, 'components', component._id), component);
//                     break;
//             }

//         }
//     }

// }


// async registerStudent(obj, email) {
//     await setDoc(doc(db, 'users', email + "@legato.com"), obj);

// }
// async registerStudentWithEmail( email,obj,) {
    
//     await setDoc(doc(db, 'users', email), obj);

// }
// async getStudentsTeacher(email) {
    
//     const docRef = doc(db, "users", email);
//     const docSnap = await getDoc(docRef);
//     return docSnap.data();

// }




// async deleteStudent( email) {
    
//     await deleteDoc(doc(db, 'users', email));
// }
// async getGeneralChatroom(email, componentList){
    
//     const components = doc(db, "users", email, "components", "generalChatroom")
//     let comps = await getDoc(components);
//     let rawData = [];
//     if (comps.exists()) {
//         let data = await comps.data()
//         rawData = [data];
//       } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//       }
       
//         await componentList.addComponents(rawData, false);
// }

// async getGeneralChatPosts(email, componentList){
//     const components = await query(collection(db, "users", email, "components"), where('chatroom', '==', "generalChatroom"), orderBy("date"))
//     let comps = await onSnapshot(components, async (querySnapshot) => {
        
//         await componentList.clearSelectedList("generalChatroom", "chatroom");
//         let rawData = [];
//         for (const key in querySnapshot.docs) {
//             let data = querySnapshot.docs[key].data()
//             rawData.push(data);
//         }
//         await componentList.addComponents(rawData, false);
//             // dispatch({  });
//     });
// }
// async changeEmail(email){
    
//     const auth = getAuth();
//     updateEmail(auth.currentUser, email).then(() => {
//     // Email updated!
//     // ...
//     }).catch((error) => {
//     // An error occurred
//     // ...
//     });
// }
// async loginToDel(email, password,) {
    
//     await signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in 
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//         });

// }
// async delAccount(){
    
//     const auth = getAuth();
// const user = auth.currentUser;


