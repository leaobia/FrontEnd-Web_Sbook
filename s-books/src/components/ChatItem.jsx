import React, { useState, useEffect } from 'react';
import "react-chat-elements/dist/main.css"
import { ChatItem } from "react-chat-elements";
import { socket } from '../socket.ts';

export const ChatItemComponent = () => {
  
  const [socketInstance] = useState(socket());
  let idUsuario = localStorage.getItem('id_usuarioLogin') 

  // useEffect(()=>{
  //   socketInstance.on('listContacts', { userId: idUsuario}, (lista) => {
  //     console.log('listContacts:', lista);
  //   })
  // },[])

  console.log('idUser', idUsuario);

  useEffect(() => {
    socketInstance.emit('listContacts', idUsuario );
  }, []);
  
  useEffect(() => {
    socketInstance.on('receive_contacts',  (lista) => {
      console.log('listContacts:', lista);
    });
  }, []);



  // useEffect(() => {
  //   socketInstance.on('receive_contacts',  (lista) => {
  //     console.log('listContacts:', lista);
  //   });
  // }, []);

  // socketInstance.emit('test', { message: 'Bibi amor' })
  return (
    <ChatItem
  avatar="https://avatars.githubusercontent.com/u/80540635?v=4"
  alt="kursat_avatar"
  title="Kursat"
  subtitle="Ok. See you !"
  date={new Date()}
  unread={0}
  className="chatClique"
/>
  )
  }


export default ChatItemComponent