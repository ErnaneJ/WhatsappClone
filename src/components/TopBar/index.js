import React from 'react';
import './TopBar.css';

import SearchIcon from '@material-ui/icons/Search';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

export default function TopBar({user}){
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
            <input type="search" placeholder="Procurar ou iniciar uma nova conversa..."/>
          </div>
        </div>
        <div className="profile">
          <p>{user.name}</p>
          <img src={user.avatar} alt="avatar"/>
        </div>
      </div>
    </div>
  );
}
