import React, { useState, useEffect } from 'react';
import Api from '../../db/Api';
import './NewChat.css';

import CloseIcon from '@material-ui/icons/Close';

export default function NewChat({setActiveChat, user, show, setShow}){

  const [list, setList] = useState([]);

  useEffect(()=>{
    const getList = async () => {
      if(user !== null){
        let results = await Api.getContactList(user.id);
        setList(results);
      }
    };getList();
  },[user]);

  const handleClose = () => setShow(!show);
  const addNewChat = async userChat => {
    await Api.addNewChat(user, userChat, setActiveChat);
    handleClose();
  };
  return (
    <div className="sidebar newChat" style={{top: show ? '60px' : '100vh'}}>
      <div className="sidebar--topo topo-transparent"></div>
      <div className="sidebar--content">
        <div className="sidebar--chatlist">
          <div className='sidebar--chatlist-top'>
            <h1>Nova Conversa</h1>
            <div onClick={handleClose} className="newChat--closebutton">
              <CloseIcon style={{color: '#1DAB67', fontSize: 30, cursor: 'pointer'}}/>
            </div>
          </div>
          <div className="newChat--list">
            {list.map((item, key)=>(
              <div onClick={()=>{addNewChat(item)}} className="newChat--item" key={key}>
                <img className="newChat--itemAvatar" src={item.avatar} alt=""/> 
                <div className="newChat--itemName">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};