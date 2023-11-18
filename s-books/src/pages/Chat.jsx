import ChatItemComponent from "../components/ChatItem"
import '../components/css/Chat.css'
import enviarIcon from '../components/img/enviarbutton.png'
import galeriaIcon from '../components/img/verImagensGaleria.png'
import menuDropdownIcon from '../components/img/menuDropdownIcon.png'
import menuDropdownIcon2 from '../components/img/mais.png'
import { Button, Modal, ModalOverlay, useDisclosure, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalFooter  } from '@chakra-ui/react';
import ChatBoxEnviada from "../components/ChatMessageEnviada";
import ChatBoxRecebida from "../components/ChatMessageRecebida";

import React, {useRef,useState, useEffect} from 'react'

function Chat(socket) {



    // const socket = io();

    // socket.on('receive_contacts', (listContacts) => {
    //   // Faz algo com a lista de contatos
    //   console.log(listContacts);
    // });
     
    
        setTimeout(() => {
            const chatCliqueComponent = document.querySelector('.chatClique');
            if (chatCliqueComponent) {
                console.log(chatCliqueComponent);
                chatCliqueComponent.addEventListener('click', () => {
                    document.querySelector('.chatMessage').classList.remove('d-none');
                    document.querySelector('.chatMessage').classList.add('d-flex');
                    document.querySelector('.imagemPadraoDiv').classList.add('d-none');
                    document.querySelector('.imagemPadraoDiv').classList.remove('d-flex');
                });
            }
        }, 1000); 


    const abrirMensagemConfig = () => {
        document.querySelector('.buttonCancelarMensagem').classList.add('d-flex')
        document.querySelector('.buttonCancelarMensagem').classList.remove('d-none')
    }

    const sumirDaTela = () => {
        document.querySelector('.buttonCancelarMensagem').classList.remove('d-flex')
        document.querySelector('.buttonCancelarMensagem').classList.add('d-none')
    }
    

    let foto = localStorage.getItem('fotoUsuarioHome')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    return (
        <div className="chat">
                                <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <p>Tem certeza de que deseja excluir esse chat? Essa ação é irreversível.</p>
          </ModalBody>
          <ModalFooter>
            <Button>Excluir</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={onClose2} isOpen={isOpen2} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir mensagem</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <p>Isso removerá a mensagem para todos, mas as pessoas talvez já a tenham visto.</p>
          </ModalBody>
          <ModalFooter>
            <Button>Excluir</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

            <div className="listachats">
                <div className="headerChats">
                    <p>Chats</p>
                </div>
                <ChatItemComponent />
            </div>
            <div className="imagemPadraoDiv"></div>
            <div className="chatMessage d-none">
                <div className="headerChatMessage">
                    <img src={foto} alt="perfil usuario" className="fotoUsuarioChat" />
                    <p>Max Kellerman</p>
                    <ul className="menu">
            <li><button className="menuDropdownIcon"><img src={menuDropdownIcon} alt="menu Dropdown Icon" /></button></li>
            <ul className="listaDropdown">
                <button onClick={onOpen}><li>excluir chat</li></button>
            </ul>
        </ul>
                </div>
                <div className="containerMensagens">
                <ChatBoxRecebida/>
                   <ChatBoxEnviada/>
                    </div>               
{/* <MessageBox
  position={"left"}
  type={"photo"}
  data={{
      uri: "https://picsum.photos/200/200",
  }}
  
/> */}


<div className="mensagemEnviarContainer">
                 <input type="text" placeholder="type here..." className="inputChat"/>
                 <button><img src={enviarIcon} alt="icone de enviar mensagem" /></button>
                 <label  htmlFor="galeriaFile" tabIndex="0">
                 <img src={galeriaIcon} alt="icone de ver a galeria" />
      </label>
                
                 <input type="file" name="galeriaFile" id="galeriaFile" />
                </div>
                </div>
                
        </div>
    )
}

export default Chat