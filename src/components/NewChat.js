import React, { useState } from 'react';
import './NewChat.css';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default ({user, chatList, show, setShow}) => {

  const [list, setList] = useState([
    {id:123, avatar: 'https://www.w3schools.com/howto/img_avatar2.png', name: 'Ernane Ferreira'},
    {id:123, avatar: 'https://www.w3schools.com/howto/img_avatar2.png', name: 'Ernane Ferreira'},
    {id:123, avatar: 'https://www.w3schools.com/howto/img_avatar2.png', name: 'Ernane Ferreira'},
    {id:123, avatar: 'https://www.w3schools.com/howto/img_avatar2.png', name: 'Ernane Ferreira'}
  ]);
  const handleClose = () => setShow(!show);
  return (
    <div className="newChat" style={{left: show?0:-415}}>
      <div className="newChat--head">
        <div onClick={handleClose}className="newChat--backbutton">
          <ArrowBackIcon style={{color: '#FFF'}}/>
        </div>
        <div className="newChat--headTitle">Nova Conversa</div>
      </div>
      <div className="newChat--list">
        {list.map((item, key)=>(
          <div className="newChat--item" key={key}>
            <img className="newChat--itemAvatar" src={item.avatar} alt=""/> 
            <div className="newChat--itemName">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};