import React, { useState } from 'react';
import Chat from './Chat';
import Holepunch from 'holepunch'; 
import './App.css';
import logo from './assets/LOGOPNG.png' ;

const App = () => {
  const [username, setUsername] = useState('');
  const [peerId, setPeerId] = useState('');

  const handleConnect = () => {
    const generatedPeerId = Holepunch.generatePeerId();

    // Join the chat network with the generated peer ID (hypothetical function)
    Holepunch.joinChatNetwork(generatedPeerId);

    // Update the 'peerId' state with the generated peer ID
    setPeerId(generatedPeerId);
  };

  return (
    <div className='App'>
    <section className='app-section'>
    <img className = 'app-logo' src={logo}></img>
      <h1 className='app-h'>OFFLINE<br/> <span className='span-app'>PEER-TO-PEER</span><br/>CHAT</h1>
      <div className='field'>
      <input className='app-input'
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className = "btn"onClick={handleConnect}>Connect</button>
      {peerId && <Chat username={username} peerId={peerId} />}
      </div>
      </section>
    </div>
  );
};

export default App;