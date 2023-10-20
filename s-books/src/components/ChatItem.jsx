import React from 'react'
import "react-chat-elements/dist/main.css"
import { ChatItem } from "react-chat-elements";

export const ChatItemComponent = () => {
  return (
    <ChatItem
  avatar="https://avatars.githubusercontent.com/u/80540635?v=4"
  alt="kursat_avatar"
  title="Kursat"
  subtitle="Ok. See you !"
  date={new Date()}
  unread={0}
  id='chatClique'
/>
  )
}



export default ChatItemComponent