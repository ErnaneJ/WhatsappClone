import React , { useState }from 'react';
import './NotDisturb.css';

export default function NotDisturb(){

  const [checked, setChecked] = useState(false);

  return (
    <div onClick={() => setChecked(!checked)} className="label-not-disturb">
      <div className='container-toggle' style={{backgroundColor: checked ? '#1EBE71' : '#C6C6C6'}}>
        <div className="toggle" style={{right: checked ? '2px' : '20px', backgroundColor: checked ? '#eee' : '#F2F2F2'}}></div>
      </div>
      <p>Não perturbe</p>
    </div>
  );
}