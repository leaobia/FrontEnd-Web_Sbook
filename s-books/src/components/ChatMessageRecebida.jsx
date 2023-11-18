import React from 'react'
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";

const ChatBoxRecebida = ({ position, text, date }) => {
  return (
    <MessageBox
      position={position}
      type='text'
      text={text}
      date={date}
    />
  );
};


export default ChatBoxRecebida