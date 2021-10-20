import React, { useState, useEffect } from 'react';
import Api from '../Api'
import './NewChat.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default ({user, chatList, show, setShow}) => {

  const [list, setList] = useState([]);

  useEffect(()=>{
    const getList = async () => {
      if(user !== null){
        let result = await Api.getContactList(user.id);
        setList(result);
      }
    };
    getList();
  },[user]);
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