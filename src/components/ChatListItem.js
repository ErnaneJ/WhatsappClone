import React from 'react';
import './ChatListItem.css';

export default ({onClick, data, active}) => {
  return (
    <div className={`chatListItem ${active ? 'active' : ''}`} onClick={onClick}>
      <img className="chatListItem--avatar" src={data.image} alt="avatar-user"/>
      <div className="chatListItem--lines">
        <div className="chatListItem--line">
          <div className="chatListItem--name">{data.title}</div>
          <div className="chatListItem--date">19:00</div>
        </div>
        <div className="chatListItem--line">
          <div className="chatListItem--lastMsg">
            <p>Ola, tudo bom?Ola, tudo bom?Ola, tudo bom?Ola, tudo bom?Ola, tudo bom?Ola, tudo bom?</p>
          </div>
        </div>
      </div>
    </div>
  );
}