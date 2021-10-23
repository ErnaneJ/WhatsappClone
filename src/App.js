import React, {useState, useEffect} from 'react';
import Api from './db/Api';
import './App.css'

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';
import NotDisturb from './components/NotDisturb';

import TopBar from './components/TopBar';

import ForumIcon from '@material-ui/icons/Forum';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import AddIcon from '@material-ui/icons/Add';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';

export default function App() {
  //const [user, setUser] = useState({id: 'q30l74XhDVfvTRdTof2sI5sqRM42', name: 'Ernane Ferreira', avatar: 'https://avatars.githubusercontent.com/u/64796733?v=4'});
  const [user, setUser] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [showNewChat, setShowNewChat] = useState(false);

  useEffect(() => {
    if(user === null){
      return setUser(JSON.parse(localStorage.getItem('user')));
    }if(user !== null){
      return Api.onChatList(user.id, setChatList);
    }
  },[user]);

  const handleNewChat = () => {setShowNewChat(!showNewChat);};

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      email: u.email,
      avatar: u.photoURL,
      provider: u.providerData.providerId
    };
    await Api.addUser(newUser);
    setUser(newUser); 
    localStorage.setItem('user', JSON.stringify(newUser));
  }
  
  if(user===null) return (<Login onReceive={handleLoginData}/>)

  return (
    <div className="app-window">
      <NewChat setActiveChat={setActiveChat} chatList={chatList} user={user} show={showNewChat} setShow={setShowNewChat}/>
      <TopBar user={user} chatList={chatList} setUser={setUser} setChatList={setChatList}/>
      <div className="MainContent">
        <div className="sidebar">
          <div className="sidebar--topo"></div>
          <div className="sidebar--content">
            <div className="sidebar--actions">
              <div className="sidebar--actions--btn">
                <ForumIcon style={{color: '#1DAB67', fontSize: 40}}/>
                <p className="sidebar--actions-label">Menssagens</p>
              </div>
              <div className="sidebar--actions--btn">
                <LocalPhoneIcon style={{color: '#A5A5A5', fontSize: 40}}/>
                <p className="sidebar--actions-label">Ligações</p>
              </div>
              <div className="sidebar--actions--btn">
                <DonutLargeIcon style={{color: '#A5A5A5', fontSize: 40}}/>
                <p className="sidebar--actions-label">Status</p>
              </div>
            </div>
            <div className="sidebar--chatlist">
              <div className='sidebar--chatlist-disturb'>
                <NotDisturb/>
              </div>
              {chatList.length > 0 &&
                chatList.map((item, key)=>(
                  <ChatListItem
                    key={key}
                    data={item}
                    active={activeChat.chatId === item.chatId}
                    onClick={()=>{setActiveChat(item)}}
                  />
                ))
              }{chatList.length === 0 &&
                <div className="not-chat-search">
                   <div className="chat-notfound" style={{marginTop: 20}}>
                    <ForumIcon style={{color: '#ccc', fontSize: 50}}/>
                    <p className="sidebar--actions-label" style={{color: '#999'}}>Nenhum chat encontrado.</p>
                </div>
                </div>
              }
              
              <div className="sidebar--chatlist-newChat" >
                <h1>Você chegou ao fim.</h1>
                <p>Adicione mais amigos!</p>
                <div className="sidebar--chatlist--btn-more" onClick={handleNewChat}><AddIcon style={{color: '#fff', fontSize: 40}}/></div>
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