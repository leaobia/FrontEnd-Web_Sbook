import React, { useState, useEffect } from 'react';
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import { socket } from '../socket.ts';

const ChatItemComponent = () => {
  const [socketInstance] = useState(socket());
  const [listaContatos, setListaContatos] = useState([]);
  let [contatoTrocaMensagem, setContatoTrocaMensagem] = useState({})
  let idUsuario = localStorage.getItem('id_usuarioLogin');

  useEffect(() => {
    socketInstance.emit('listContacts', idUsuario);
  }, []);

  useEffect(() => {
    socketInstance.on('receive_contacts', (lista) => {
      console.log('listContacts:', lista.users);
      console.log('listContacts:', lista.users[0].users);

      setListaContatos(lista.users);

      lista.users.map((contato)=>{
       //console.log(contato.users);
       //const filteredListaContatos = contato.users.filter(contato => contato.id !== idUsuario);

       let arrayContatoUsers = contato.users

       arrayContatoUsers.map((posicoes)=> {
        console.log(posicoes.id);

        let intId = parseInt(idUsuario)

        if(posicoes.id !== intId){
          setContatoTrocaMensagem(posicoes)
        }
       })
       
   
      })
     
    });
  }, []);

  return (
    <div className="listachats">
      <div className="headerChats">
        <p>Chats</p>
      </div>

      {listaContatos.map((contato) => (
          <ChatItem
           avatar= {contatoTrocaMensagem.foto}
          alt={contatoTrocaMensagem.nome}
          title={contatoTrocaMensagem.nome}
          // subtitle="Ok. See you !"
           date={''}
          // unread={0}
          className="chatClique"
          id={contato.id_chat}
        />
      ))}
    </div>
  );
};

export default ChatItemComponent;
