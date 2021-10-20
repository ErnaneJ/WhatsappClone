import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './ChatWindow.css';

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';

import MessageItem from './MessageItem';

export default ({user}) => {

  const body = useRef();

  let recognition = null;
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if(SpeechRecognition !== undefined) recognition = new SpeechRecognition();

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [list, setList] = useState([
    {author: 123456, body: "Ola, tudo bom??"},
    {author: 1234, body: "Ola, tudo bom?? HAHA"},
    {author: 123456, body: "Ola, tudo bom?? IHAAA"},
    {author: 123456, body: "Ola, tudo Ola, tudo bom?? HEHEHOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHbom??"},
    {author: 1234, body: "Ola, tudo bom?? HAHA"},
    {author: 123456, body: "Ola, tudo bom?? IHAAA"},
    {author: 1234, body: "Ola, tOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHudo bom??"},
    {author: 12345, body: "Ola, tudo bom?? HEHEHOla, tudo bom?? HEOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHHEHOla, tudo bom?? HEHEHOla, tudo bom?? HEHEH"},
    {author: 12345, body: "Ola, tudo bom?? HEHEH"},
    {author: 123456, body: "Ola, tuOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHdo bom??"},
    {author: 123456, body: "Ola, tudo bOla, tudo bom?? HEHEHOla, tudOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHo bom?? HEHEHom??"},
    {author: 1234, body: "Ola, tudo bom?? HAHA"},
    {author: 123456, body: "Ola, tudo bom?? IHAAA"},
    {author: 1234, body: "Ola, tuOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHdo bom??"},
    {author: 12345, body: "Ola, tudo bom?? HEHEH"},
    {author: 123456, body: "Ola, tudoOla, tudo bom?? HEHEHOla, tudo bom?? HEHEH bom??"},
    {author: 1234, body: "Ola, tudo bOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHom?? HAHA"},
    {author: 123456, body: "Ola, tudo bom?? IHAAA"},
    {author: 1234, body: "Ola, tudo bOla, tudo bom?? HEHOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHEHOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHom??"},
    {author: 12345, body: "Ola, tudo bom?? HEHEH"},
    {author: 1234, body: "Ola, tudo boOla, tudo bom?? HEHEHOla, tudo bom?? HEHEHm??"},
    {author: 12345, body: "Ola, tudo bom?? HEHEH"},
  ]);

  useEffect(()=>{
    if(body.current.scrollHeight > body.current.offsetHeight){
      body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
    }
  },[list]);
  
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
  const handleSendClick = () => {

  };
  return (
    <div className="ChatWindow">
      <div className="ChatWindow--header">
      <div className="ChatWindow--headerinfo">
        <img className="chatWindow--avatar" src="https://www.w3schools.com/howto/img_avatar2.png" alt=""/>
        <div className="ChatWindow--name">Ernane Ferreira</div>
      </div>

      <div className="ChatWindow--headerbuttons">
        <div className="ChatWindow--btn"><SearchIcon style={{color: '#919191'}}/></div>
        <div className="ChatWindow--btn"><AttachFileIcon style={{color: '#919191'}}/></div>
        <div className="ChatWindow--btn"><MoreVertIcon style={{color: '#919191'}}/></div>
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
          <input className="ChatWindow--input" placeholder="Digite uma mensagem.." type="text" value={text} onChange={e=>{setText(e.target.value)}}/>
        </div>
        <div className="ChatWindow--pos">
          {text === '' &&
            <div className="ChatWindow--btn" onClick={handleMicClick}><MicIcon className={ listening ? 'listening' : ''} style={{color: listening ? '#126ECE' : '#919191'}}/></div>
          }{text !== '' &&
            <div className="ChatWindow--btn" onClick={handleSendClick}><SendIcon style={{color: '#919191'}}/></div>
          }
        </div>
      </div>
    </div>
  );
};