import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default {
  fbPopup: async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    let result = await firebaseApp.auth().signInWithPopup(provider);
    return result;
  },
  addUser: async (u)=>{
    await db.collection('users').doc(u.id).set({
      name: u.name,
      avatar: u.avatar
    }, {merge:true});
  },
  getContactList: async (userId)=>{
    let list = [];
    let result = await db.collection('users').get();
    result.forEach(result => {
      let data = result.data();
      if(result.id !== userId){
        list.push({
          id: result.id,
          name: data.name,
          avatar: data.avatar
        });
      }
    });
    return list;
  },
}