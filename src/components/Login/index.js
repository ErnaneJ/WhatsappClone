import React from 'react';
import Api from '../../db/Api.js';

export default function Login({onReceive}){
  const handleFacebookLogin = async ()=>{
    let result = await Api.FacebookPopup();
    if(result){onReceive(result.user)}
    else{console.error('Erro!')}
  }
  const handleGithubLogin = async ()=>{
    let result = await Api.GithubPopup();
    if(result){onReceive(result.user)}
    else{console.error('Erro!')}
  }
  const handleGoogleLogin = async ()=>{
    let result = await Api.GooglePopup();
    if(result){onReceive(result.user)}
    else{console.error('Erro!')}
  }
  return (
    <div className="login">
      <button onClick={handleFacebookLogin}>Logar com o Facebook</button>
      <button onClick={handleGithubLogin}>Logar com o Github</button>
      <button onClick={handleGoogleLogin}>Logar com o Google</button>
    </div>
  );
};