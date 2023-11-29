import React, { useState, useEffect } from 'react';
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import { socket } from '../socket.ts';
import ChatBoxRecebida from "../components/ChatMessageRecebida";
import ReactDOM from 'react-dom';
import { MessageBox } from "react-chat-elements";
import { Button, Modal, ModalOverlay, useDisclosure, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalFooter } from '@chakra-ui/react';

const ChatItemComponent = () => {
  const [socketInstance] = useState(socket());
  const [listaContatos, setListaContatos] = useState([]);
  let [contatoTrocaMensagem, setContatoTrocaMensagem] = useState({})
  console.log('contato troca mensagem', contatoTrocaMensagem);
  let idUsuario = localStorage.getItem('id_usuarioLogin');
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  let [mensagemId, setMensagemId] = useState('')

  useEffect(() => {
    socketInstance.emit('listContacts', idUsuario);
  }, []);

  useEffect(() => {
    socketInstance.on('receive_contacts', (lista) => {
      console.log('lista:', lista);
      // console.log('listContacts:', lista.users);
      // console.log('listContacts:', lista.users[0].users);

      if (lista.id_user == idUsuario) {
        setListaContatos(lista.users);
        let contatosTroca = [];

        lista.users.forEach((contato) => {
          let arrayContatoUsers = contato.users;

          arrayContatoUsers.forEach((posicoes) => {
            let intId = parseInt(idUsuario);

            if (posicoes.id !== intId) {
              contatosTroca.push(posicoes);
              localStorage.setItem('idConversante', posicoes.id);
            }
          });
        });

        setContatoTrocaMensagem(contatosTroca);

        console.log(contatoTrocaMensagem);
      }

    });
  }, []);

  const handleChatItemClick = (chatId, foto, nome) => {

    //alert('oii')

    localStorage.setItem('chatId', chatId)
    console.log(chatId);

    localStorage.setItem('chatClickedId', chatId)
    localStorage.setItem('chatPersonName', nome)
    localStorage.setItem('chatPersonFoto', foto)

    document.getElementById('nomeUsuarioTrocaMensagem').textContent = nome
    document.getElementById('fotoUsuarioTrocaMensagem').src = foto

    socketInstance.emit('listMessages', chatId);


    socketInstance.on('receive_message', (lista) => {

      console.log('lista1', lista);


      document.getElementById('containerMensagens').textContent = ''

      localStorage.setItem('ListaMensagem', lista.mensagens)

      if (lista.mensagens) {
        lista.mensagens.forEach((mensagem) => {

          let mensagemDiv = document.createElement('div')
          mensagemDiv.id = mensagem._id

          let spanHora = document.createElement('span')
          spanHora.textContent = mensagem.hora_criacao.split(':').slice(0, 2).join(':')

          let imagemMensagem = '';
          if (mensagem.image !== '') {
            imagemMensagem = document.createElement('img')
            imagemMensagem.classList.add('fotoDaMensagem')
            imagemMensagem.src = mensagem.image
          }

          let mensagemTexto = document.createElement('p')
          mensagemTexto.textContent = mensagem.message

          let divTextoHora = document.createElement('div')
          divTextoHora.classList.add('divTextoHora')

          divTextoHora.append(mensagemTexto, spanHora)
          mensagemDiv.append(imagemMensagem, divTextoHora)

          let btnDelete = ''

          if (mensagem.messageBy !== parseInt(idUsuario)) {
            mensagemDiv.classList.add('mensagemRecebida')
          } else {
            mensagemDiv.classList.add('mensagemEnviada')
            btnDelete = document.createElement('button')
            btnDelete.classList.add('btnDeletarMensagem')
            btnDelete.textContent = '...'
            btnDelete.classList.add('d-none')

            btnDelete.addEventListener('click', () => {
              onOpen2()
            })
          }

          mensagemDiv.addEventListener('click', () => {
            btnDelete.classList.remove('d-none')
            btnDelete.classList.add('d-flex')

            setMensagemId(mensagem._id)

            setTimeout(() => {
              btnDelete.classList.remove('d-flex');
              btnDelete.classList.add('d-none')
            }, 1500);
          })



          document.getElementById('containerMensagens').append(btnDelete, mensagemDiv)

        })
      }

    });


    document.querySelector('.chatMessage').classList.remove('d-none');
    document.querySelector('.chatMessage').classList.add('d-flex');
    document.querySelector('.imagemPadraoDiv').classList.add('d-none');
    document.querySelector('.imagemPadraoDiv').classList.remove('d-flex');



  };

  const excluirMensagem = () => {
    socketInstance.emit('deleteMessage', mensagemId);

    let id = localStorage.getItem('chatClickedId')
    console.log(id);
    let nome = localStorage.getItem('chatPersonName')
    let foto = localStorage.getItem('chatPersonFoto')

    onClose2()
    setTimeout(() => {
      handleChatItemClick(id, foto, nome)
    }, 1);


  }

  return (
    <div className="listachats">

      <Modal onClose={onClose2} isOpen={isOpen2} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir mensagem</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Isso removerá a mensagem para todos, mas as pessoas talvez já a tenham visto.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={excluirMensagem}>Excluir</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="headerChats">
        <p>Chats</p>
      </div>

      {listaContatos.map((contato) => {
        const usuarioDesejado = contato.users.find((user) => user.id !== parseInt(idUsuario));

        if (usuarioDesejado) {
          return (
            <ChatItem
              key={contato.id_chat}
              avatar={usuarioDesejado.foto}
              alt={usuarioDesejado.nome}
              title={usuarioDesejado.nome}
              date={''}
              className="chatClique"
              onClick={() => handleChatItemClick(contato.id_chat, usuarioDesejado.foto, usuarioDesejado.nome)}
            />
          );
        }

        return null;
      })}


    </div>
  );
};

export default ChatItemComponent;
