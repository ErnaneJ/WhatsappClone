import React from 'react';
import Api from '../../db/Api.js';

export default function Login({onReceive}){
  const handleFacebookLogin = async ()=>{
    let result = await Api.fbPopup();
    if(result){onReceive(result.user)}
    else{console.error('Erro!')}
  }
  return (
    <div className="login">
      <button onClick={handleFacebookLogin}>Logar com o Facebook</button>
    </div>
  );
};