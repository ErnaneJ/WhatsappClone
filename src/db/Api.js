import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const Api =  {
  FacebookPopup: async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    let result = null;
    try{
      result = await firebaseApp.auth().signInWithPopup(provider);
    }catch(e){
      console.error('Erro na autenticacao.', e);
    }
    return result;
  },
  GithubPopup: async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    let result = null;
    try{
      result = await firebaseApp.auth().signInWithPopup(provider);
    }catch(e){
      console.error('Erro na autenticacao.', e);
    }
    return result;
  },
  GooglePopup: async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    let result = null;
    try{
      result = await firebaseApp.auth().signInWithPopup(provider);
    }catch(e){
      console.error('Erro na autenticacao.', e);
    }
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
  addNewChat: async (user, userChat, setActiveChat) => {
    const chats = await firebase.firestore().collection('chats').get();
    let chatExist = false;
    chats.docs.map(doc => {
      if(doc.data().users.length === 2 && doc.data().users.includes(userChat.id) && doc.data().users.includes(user.id)){
        chatExist = true;
        setActiveChat({chatId: doc.id,title: userChat.name,image: userChat.avatar,with: userChat.id});
      }
    });
    if(chatExist) return true;
    let newChat = await db.collection('chats').add({
      messages: [],
      users: [user.id, userChat.id]
    });

    db.collection('users').doc(user.id).update({
      chats: firebase.firestore.FieldValue.arrayUnion({
        chatId: newChat.id,
        title: userChat.name,
        image: userChat.avatar,
        with: userChat.id
      })
    });
    
    db.collection('users').doc(userChat.id).update({
      chats: firebase.firestore.FieldValue.arrayUnion({
        chatId: newChat.id,
        title: user.name,
        image: user.avatar,
        with: user.id
      })
    });
    setActiveChat({chatId: newChat.id,title: userChat.name,image: userChat.avatar,with: userChat.id});
  },
  onChatList: (userId, setChatList) => {
    return db.collection('users').doc(userId).onSnapshot(doc => {
      if(doc.exists){
        let data = doc.data();
        if(data.chats){
          let chats = [...data.chats];
          chats.sort((a,b) => {
            if(a.lastMessageDate === undefined){
              return -1;
            }
            if(a.lastMessageDate.seconds < b.lastMessageDate.seconds){
              return 1;
            }else{
              return -1;
            }
          });

          setChatList(chats);
        }
      }
    });
  },
  onChatContent: (chatId, setList, setUsers) => {
    return db.collection('chats').doc(chatId).onSnapshot(doc => {
      if(doc.exists){
        let data = doc.data();
        setList(data.messages);
        setUsers(data.users);
      }
    })
  },
  sendMessage: async (chatData, userId, type, body, users) => {
    let now = new Date();
    db.collection('chats').doc(chatData.chatId).update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        type,
        author: userId,
        body,
        date: now
      })
    });

    for (let i in users){
      let u = await db.collection('users').doc(users[i]).get();
      let uData = u.data();
      if(uData.chats){
        let chats = [...uData.chats];
        for(let e in chats){
          if(chats[e].chatId === chatData.chatId){
            chats[e].lastMessage = body;
            chats[e].lastMessageDate = now;
          }
        }

        await db.collection('users').doc(users[i]).update({
          chats
        })
      }
    }
  }
}

export default Api;