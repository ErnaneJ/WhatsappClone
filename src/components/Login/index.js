import React, { useState } from 'react';
import Api from '../../db/Api.js';
import './Login.css';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

export default function Login({onReceive}){

  const [loginOptions, setLoginOptions] = useState(false);

  const handleLoginOption = () => setLoginOptions(!loginOptions);

  const handleFacebookLogin = async ()=>{
    let result = await Api.FacebookPopup();
    if(result){onReceive(result.user)}
  }
  const handleGithubLogin = async ()=>{
    let result = await Api.GithubPopup();
    if(result){onReceive(result.user)}
  }
  const handleGoogleLogin = async ()=>{
    let result = await Api.GooglePopup();
    if(result){onReceive(result.user)}
  }
  return (
    <section className="container-login">
      <div className="login-topbar">
        <div className="topbar--version">2021 - Web App</div>
        <div className="topbar--version">
          <div className="topbar--login" onClick={handleLoginOption}>
            <div>Login</div> 
            <KeyboardArrowDownIcon style={{color: '#ccc', transform: `rotate(${loginOptions ? '180deg' : '0'})`}}/>
          </div>
          <div className="login-options" style={{display: loginOptions ? 'flex' : 'none'}}>
            <div className="login--option" onClick={handleFacebookLogin}>Facebook</div>
            <div className="login--option" onClick={handleGithubLogin}>Github</div>
            <div className="login--option" onClick={handleGoogleLogin}>Google</div>
          </div>
        </div>
      </div>
      <div className="login-main">
        <div className="login-main--top">
          <img className="login-main--top-img" src="https://i.pinimg.com/originals/f5/28/cc/f528cc010d8a9bfcef07d08106976d0f.png" alt=""/>
          <h1>Whatsapp Clone</h1>
          <p>Redesign</p>
        </div>
      </div>
      <div className="login-main--content">
        <img src="./preview.png" alt="preview"/>
      </div>
      <div className="footer">
        Desenvolvido com ❤️ por <a href="https://ernane-dev.netlify.app/"> Ernane Ferreira</a>
      </div>
    </section>
  );
};