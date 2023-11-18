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

  const handleChatItemClick = (chatId) => {
    console.log('ChatItem clicked! Id:', chatId);
    console.log('contatoTrocaMensagem.foto', contatoTrocaMensagem.foto);
    console.log('contatoTrocaMensagem.nome', contatoTrocaMensagem.nome);

    localStorage.setItem('chatClickedId', chatId)
    localStorage.setItem('chatPersonName', contatoTrocaMensagem.nome )
    localStorage.setItem('chatPersonFoto', contatoTrocaMensagem.foto )

    document.getElementById('nomeUsuarioTrocaMensagem').textContent = contatoTrocaMensagem.nome
    document.getElementById('fotoUsuarioTrocaMensagem').src = contatoTrocaMensagem.foto

      document.querySelector('.chatMessage').classList.remove('d-none');
      document.querySelector('.chatMessage').classList.add('d-flex');
      document.querySelector('.imagemPadraoDiv').classList.add('d-none');
      document.querySelector('.imagemPadraoDiv').classList.remove('d-flex');



  };
  

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
          onClick={() => handleChatItemClick(contato.id_chat)}
        />
      ))}
    </div>
  );
};

export default ChatItemComponent;
