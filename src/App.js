import React, {useState, useEffect} from 'react';
import Api from './Api';
import './App.css'

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

export default () => {
  // const [user, setUser] = useState({id: 'q30l74XhDVfvTRdTof2sI5sqRM42', name: 'Ernane Ferreira', avatar: 'https://graph.facebook.com/140897651599162/picture'});
  const [user, setUser] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [showNewChat, setShowNewChat] = useState(false);
  
  useEffect(() => {
    if(user !== null){
      let unsub = Api.onChatList(user.id, setChatList);
      return unsub;
    }
  },[user]);

  const handleNewChat = () => setShowNewChat(!showNewChat);

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
      <div className="sidebar">
        <NewChat chatList={chatList} user={user} show={showNewChat} setShow={setShowNewChat}/>
        <header>
          <img className="header--avatar" src={user.avatar} alt="avatar" />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{color: '#919191'}} />
            </div>
            <div onClick={handleNewChat} className="header--btn">
              <ChatIcon style={{color: '#919191'}} />
            </div>
            <div className="header--btn">
             <MoreVertIcon style={{color: '#919191'}} />
            </div>             
          </div>
        </header>

        <div className="search">
          <div className="search--input">
            <SearchIcon style={{color: '#919191', fontSize: 'small'}}/>
            <input type="search" placeholder="Procurar ou iniciar uma nova conversa..."/>
          </div>
        </div>

        <div className="chatlist">
          {chatList.map((item, key)=>(
            <ChatListItem
              key={key}
              data={item}
              active={activeChat.chatId === item.chatId}
              onClick={()=>{setActiveChat(item)}}
            />
          ))}
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
  );
}