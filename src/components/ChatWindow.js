import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './ChatWindow.css';

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';

export default () => {

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState('');
  const handleEmojiPicker = (e, emojiObject) =>  setText( text + emojiObject.emoji );
  const handleOpenEmojiPicker = () => setEmojiOpen(!emojiOpen);
  const handleMicClick = () => {

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
      <div className="ChatWindow--body"></div>
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
          {text == '' &&
            <div className="ChatWindow--btn" onClick={handleMicClick}><MicIcon style={{color: '#919191'}}/></div>
          }{text != '' &&
            <div className="ChatWindow--btn" onClick={handleSendClick}><SendIcon style={{color: '#919191'}}/></div>
          }
        </div>
      </div>
    </div>
  );
};