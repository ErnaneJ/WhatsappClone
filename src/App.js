import React, {useState, useEffect} from 'react';
import Api from './db/Api';
import './App.css'

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';

import TopBar from './components/TopBar';

import ForumIcon from '@material-ui/icons/Forum';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import AddIcon from '@material-ui/icons/Add';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';

export default function App() {
  const [user, setUser] = useState({id: 'q30l74XhDVfvTRdTof2sI5sqRM42', name: 'Ernane Ferreira', avatar: 'https://graph.facebook.com/140897651599162/picture'});
  //const [user, setUser] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [showNewChat, setShowNewChat] = useState(false);
  
  useEffect(() => {
    if(user !== null){
      let unsub = Api.onChatList(user.id, setChatList);
      return unsub;
    }
  },[user]);

  const handleNewChat = () => {setShowNewChat(!showNewChat);};

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    };
    await Api.addUser(newUser);
    setUser(newUser);
  }
  if(user===null) return (<Login onReceive={handleLoginData}/>)

  return (
    <div className="app-window">
      <NewChat setActiveChat={setActiveChat} chatList={chatList} user={user} show={showNewChat} setShow={setShowNewChat}/>
      <TopBar user={user}/>
      <div className="MainContent">
        <div className="sidebar">
          <div className="sidebar--topo"></div>
          <div className="sidebar--content">
            <div className="sidebar--actions">
            <div className="chatlist--btn"><ForumIcon style={{color: '#1DAB67', fontSize: 40}}/></div>
              <p className="sidebar--actions-label">Menssagens</p>
              <div className="chatlist--btn"><LocalPhoneIcon style={{color: '#A5A5A5', fontSize: 40}}/></div>
              <p className="sidebar--actions-label">Ligações</p>
              <div className="chatlist--btn"><DonutLargeIcon style={{color: '#A5A5A5', fontSize: 40}}/></div>
              <p className="sidebar--actions-label">Status</p>
            </div>
            <div className="sidebar--chatlist">
              <div className='sidebar--chatlist-disturb'>
              </div>
              {chatList.map((item, key)=>(
                <ChatListItem
                  key={key}
                  data={item}
                  active={activeChat.chatId === item.chatId}
                  onClick={()=>{setActiveChat(item)}}
                />
              ))}
              <div className="sidebar--chatlist-newChat" onClick={handleNewChat}>
                <h1>Você chegou ao fim.</h1>
                <p>Adicione mais amigos!</p>
                <div className="sidebar--chatlist--btn-more"><AddIcon style={{color: '#fff', fontSize: 40}}/></div>
              </div>
            </div>
          </div>
        </div>
        <div className="contentarea">
          {activeChat.chatId !== undefined &&
            <ChatWindow
              user={user}
              data={activeChat}
            />
          }
          {activeChat.chatId === undefined &&
            <ChatIntro/>
          }
        </div>
      </div>
    </div>
  );
}