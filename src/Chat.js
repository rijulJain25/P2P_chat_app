import React, { useState, useEffect } from 'react';
import Holepunch from 'holepunch';

const Chat = ({ username, peerId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initialize Holepunch and join the chat network
    const holepunch = new Holepunch(peerId);

    holepunch.on('peer', (id) => {
      // Handle incoming messages from other peers
      holepunch.join(id);
    });

    holepunch.on('message', (data) => {
      // Receive and display messages from other peers
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      holepunch.destroy();
    };
  }, [peerId]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      // Send the message to all connected peers
      Holepunch.send({
        username,
        message,
      });
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        <h2>Chat Room</h2>
        <div className="message-container">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.username}</strong>: {msg.message}
            </div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;