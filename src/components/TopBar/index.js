import React, {useState, useEffect} from 'react';
import './TopBar.css';

import Api from '../../db/Api';

import SearchIcon from '@material-ui/icons/Search';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function TopBar({user, setUser, chatList, setChatList}){
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState(false);

  const handleOptions = () => {
    setOptions(!options)
  }
  const handleExit = () => {
    setUser(null); 
    localStorage.removeItem('user');
  };
  useEffect(()=>{
    if (search !== ''){
      setChatList(chatList.filter(chat => chat.title.toLowerCase().includes(search.toLowerCase())));
    }else{
      Api.onChatList(user.id, setChatList);
    }
  },[search]);
  return (
    <div className="TopBar">
      <div className="container">
        <div className="logo">
          <WhatsAppIcon style={{color: '#fff', fontSize: 35}}/>
          <p>WhatsappClone</p>
        </div>
        <div className="search">
          <div className="search--input">
            <SearchIcon style={{color: '#ffffff80', fontSize: 20}}/>
            <input type="search" value={search} onChange={e=>setSearch(e.target.value)}placeholder="Procurar ou iniciar uma nova conversa..."/>
          </div>
        </div>
        <div className="profile">
          <p>{user.name}</p>
          <img src={user.avatar} alt="avatar" onClick={handleOptions}/>
            <div className={`profile--options ${options ? 'active' : ''}`} onClick={handleExit}>
              <div className="profile--options--option">
                <ExitToAppIcon style={{color: '#1EBE71', fontSize: '23px'}}/>
                <p>Sair</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
