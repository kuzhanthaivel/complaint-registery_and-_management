import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';


const ChatWindow = (props) => {
   const [messageInput, setMessageInput] = useState('');

   const messageWindowRef = useRef(null);
   const [messageList, setMessageList] = useState([]);

   const fetchMessageList = async () => {
      try {
         const response = await axios.get(`http://localhost:8000/messages/${props.complaintId}`);
         setMessageList(response.data);
      } catch (error) {
         console.error('Error fetching messages:', error);
      }
   };

   useEffect(() => {
      fetchMessageList(props.complaintId, setMessageList);
   }, [props.complaintId]);

   useEffect(() => {
      scrollToBottom();
   }, [messageList]);


   const sendMessage = async () => {
      try {
         let data = {
            name: props.name,
            message: messageInput,
            complaintId: props.complaintId
         }
         const response = await axios.post('http://localhost:8000/messages', data)
         setMessageList([...messageList, response.data]);
         setMessageInput('');
         fetchMessageList();
      } catch (error) {
         console.error('Error sending message:', error);
      }
   }

   const scrollToBottom = () => {
      if (messageWindowRef.current) {
         messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
      }
   };

   return (
      <>
         <div className="chat-container">
            <h1>Message Box</h1>
            <div className="message-window" ref={messageWindowRef}>
               {messageList.slice().reverse().map((msg) => (
                  <div className="message" key={msg._id}>
                     <p>{msg.name}: {msg.message}</p>
                     <p style={{ fontSize: '10px', marginTop: '-15px' }}>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {new Date(msg.createdAt).toLocaleDateString()}</p>
                  </div>
               ))}
            </div>
            <div className="input-container">
               {/* <input required type="text" placeholder="Message" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} /> */}
               <textarea required type="text" placeholder="Message" value={messageInput} onChange={(e) => setMessageInput(e.target.value)}></textarea>
               <button className='btn btn-success' onClick={sendMessage}>Send</button>
            </div>

         </div>


      </>)
}

export default ChatWindow
