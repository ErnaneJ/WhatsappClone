import React, {useState, usseEffect} from 'react';
import './App.css'

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

export default () => {
  const [user, setUser] = useState({
    id:1234,
    avatar: 'https://www.w3schools.com/howto/img_avatar2.png', 
    name: 'Ernane Ferreira'
  });
  const [chatList, setChatList] = useState([
    {chatId: 1, title: 'Fulano de tal', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId: 2, title: 'Fulano de tal 1', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId: 3, title: 'Fulano de tal 2', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId: 4, title: 'Fulano de tal 3', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId: 5, title: 'Fulano de tal 4', image: 'https://www.w3schools.com/howto/img_avatar2.png'}
  ]);
  const [activeChat, setActiveChat] = useState({});
  const [showNewChat, setShowNewChat] = useState(false);
  const handleNewChat = () => setShowNewChat(!showNewChat);
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
          />
        }
        {activeChat.chatId === undefined &&
          <ChatIntro/>
        }
      </div>
    </div>
  );
}