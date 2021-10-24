import React from 'react';
import './ChatIntro.css';

export default function ChatIntro(){
  return (
    <div className="chatIntro">
      <div className="chatIntro--top"></div>
      <div className="chatIntro--main">
        <img src="./intro-wpp.jpg" alt=""/>
        <h1>Mantenha seu celular conectado</h1>
        <h2>O WhatsApp conecta ao seu telefone para sintonizar suas mensagens. Para reduzir o uso de dados, conecte seu telefone a uma rede Wi-Fi.</h2>
      </div>
    </div>
  );
}