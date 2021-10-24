import React, {useState, useEffect} from 'react';
import './MessageItem.css';

export default function MessageItem({data, user}){
  const [time, setTime] = useState('');

  useEffect(() => {
    if (data.date > 0){
      let d = new Date(data.date.seconds * 1000);
      let hours = d.getHours();
      let minutes = d.getMinutes();
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      setTime(`${hours}:${minutes}`);
    }
  }, [data]);
  return (
    <div className="messageLine"

    style={{
      justifyContent: user.id === data.author ? 'flex-end' : 'flex-start',
    }}
    
    >
      <div className="messageItem"
      style={{
        backgroundColor: user.id === data.author ? '#1EBE71' : '#FFF',
        color: user.id === data.author ? '#fff' : 'black',
        borderBottomRightRadius: user.id === data.author ? '0' : '10px',
        borderBottomLeftRadius: user.id !== data.author ? '0' : '10px'
      }}
      >
        <div className="messageText">{data.body}</div>
        <div className="messageDate" style={{color: user.id === data.author ? '#fff' : '#888',}}>{time}</div>
      </div>
    </div>
  );
};