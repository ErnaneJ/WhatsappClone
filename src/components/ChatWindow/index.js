import React, { useState, useEffect, useRef } from 'react';
import Api from '../../db/Api';
import EmojiPicker from 'emoji-picker-react';
import './ChatWindow.css';

import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';

import MessageItem from '../MessageItem';

export default function ChatWindow({user, data}){

  const body = useRef();

  let recognition = null;
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if(SpeechRecognition !== undefined) recognition = new SpeechRecognition();

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    if(body.current.scrollHeight > body.current.offsetHeight){
      body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
    }
  },[list]);

  useEffect(()=>{
    setList([]);
    let unsub = Api.onChatContent(data.chatId, setList, setUsers);
    return unsub;
  },[data.chatId]);
  
  const handleEmojiPicker = (e, emojiObject) =>  setText( text + emojiObject.emoji );
  const handleOpenEmojiPicker = () => setEmojiOpen(!emojiOpen);
  const handleMicClick = () => {
    if(recognition === null) return false;
    recognition.lang = 'pt-br';
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = e => setText(e.results[0][0].transcript);

    recognition.start();
  };
  const handleInputKey = e => {if(e.keyCode === 13) handleSendClick()};
  const handleSendClick = () => {
    if(text !== ''){
      Api.sendMessage(data, user.id, 'text', text, users);
      setText('');
      setEmojiOpen(false);
    }
  };
  return (
    <div className="ChatWindow">
      <div className="ChatWindow--header">
      <div className="ChatWindow--headerinfo">
        <img className="chatWindow--avatar" src={data.image} alt=""/>
        <div className="ChatWindow--name">{data.title}</div>
      </div>

      <div className="ChatWindow--headerbuttons">
        <div className="ChatWindow--btn"><LocalPhoneIcon style={{color: '#fff'}}/></div>
        <div className="ChatWindow--btn"><MoreVertIcon style={{color: '#fff'}}/></div>
      </div>

      </div>
      <div ref={body} className="ChatWindow--body">
        {list.map((item, key)=>(
          <MessageItem key={key} data={item} user={user} />
        ))}
      </div>
      <div className="ChatWindow--emojiArea" style={{height: emojiOpen ? '320px' : '0px'}}>
        <EmojiPicker disableSearchBar onEmojiClick={handleEmojiPicker} disableSkinTonePicker/>
      </div>
      <div className="ChatWindow--footer">
        <div className="ChatWindow--pre">
          <div className="ChatWindow--btn" onClick={handleOpenEmojiPicker} style={{width: emojiOpen ? '40px':'0'}}><CloseIcon style={{color: '#919191'}}/></div>
          <div className="ChatWindow--btn" onClick={handleOpenEmojiPicker}><InsertEmoticonIcon style={{color: emojiOpen ? '#009688' : '#919191'}}/></div>
        </div>
        <div className="ChatWindow--inputArea">
          <input className="ChatWindow--input" placeholder="Digite uma mensagem.." type="text" value={text} onChange={e=>{setText(e.target.value)}} onKeyUp={handleInputKey}/>
        </div>
        <div className="ChatWindow--pos">
          {text === '' &&
            <div className={`ChatWindow--btn btn-send  ${listening ? 'listening' : ''}`} onClick={handleMicClick}><MicIcon className={ listening ? 'listening' : ''} style={{color: '#fff'}}/></div>
          }{text !== '' &&
            <div className="ChatWindow--btn btn-send" onClick={handleSendClick}><SendIcon style={{color: '#fff'}}/></div>
          }
        </div>
      </div>
    </div>
  );
};