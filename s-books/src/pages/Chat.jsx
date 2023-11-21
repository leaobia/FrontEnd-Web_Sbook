import ChatItemComponent from "../components/ChatItem"
import '../components/css/Chat.css'
import enviarIcon from '../components/img/enviarbutton.png'
import galeriaIcon from '../components/img/verImagensGaleria.png'
import menuDropdownIcon from '../components/img/menuDropdownIcon.png'
import menuDropdownIcon2 from '../components/img/mais.png'
import { Button, Modal, ModalOverlay, useDisclosure, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalFooter } from '@chakra-ui/react';
import ChatBoxEnviada from "../components/ChatMessageEnviada";
import { MessageBox } from "react-chat-elements";
import ChatBoxRecebida from "../components/ChatMessageRecebida";
import { socket } from '../socket.ts';

import React, { useRef, useState, useEffect } from 'react'

function Chat() {

    const [socketInstance] = useState(socket());

    //  let [mensagemLista, setMensagemLISTA] = useState([])
   
    //  console.log(mensagemLista);
   
    // useEffect(() => {
    //     let lista = localStorage.getItem('ListaMensagem');
    //     setMensagemLISTA(lista)
    //   }, [localStorage.getItem('ListaMensagem')]);
  

    // setTimeout(() => {
    //     // Seleciona todos os elementos com a classe '.chatClique'
    //     const chatCliqueComponents = document.querySelectorAll('.chatClique');

    //     // Adiciona um evento de clique a cada elemento encontrado
    //     chatCliqueComponents.forEach(chatCliqueComponent => {
    //         chatCliqueComponent.addEventListener('click', () => {
    //             console.log(chatCliqueComponent);
              
    //         });
    //     });

    // }, 1000);


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

    const enviarMensagem = () => {
        let mensagemTexto = document.getElementById('inputChat').value
        let idConversante = parseInt(localStorage.getItem('idConversante'))
        let idUsuario = parseInt(localStorage.getItem('id_usuarioLogin'));
        let  chatId = localStorage.getItem('chatId')
        let image = ''
        console.log(mensagemTexto, idConversante, idUsuario, chatId);
     
            socketInstance.emit('message', idUsuario, idConversante, mensagemTexto, image, chatId );
     
    
            socketInstance.on('receive_message', (lista) => {
            
                console.log(lista);
             
            });
      
    }
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

            <ChatItemComponent />

            <div className="imagemPadraoDiv"></div>
            <div className="chatMessage d-none">
                <div className="headerChatMessage">
                    <img  src={foto} alt="perfil usuario" className="fotoUsuarioChat" id="fotoUsuarioTrocaMensagem"/>
                    <p id="nomeUsuarioTrocaMensagem"></p>
                    <ul className="menu">
                        <li><button className="menuDropdownIcon"><img src={menuDropdownIcon} alt="menu Dropdown Icon" /></button></li>
                        <ul className="listaDropdown">
                            <button onClick={onOpen}><li>excluir chat</li></button>
                        </ul>
                    </ul>
                </div>
                <div className="containerMensagens" id="containerMensagens">
                    {/* <ChatBoxRecebida />
                    <ChatBoxEnviada /> */}
                </div>
                {/* <MessageBox
  position={"left"}
  type={"photo"}
  data={{
      uri: "https://picsum.photos/200/200",
  }}
  
/> */}


                <div className="mensagemEnviarContainer">
                    <input type="text" placeholder="type here..." className="inputChat" id="inputChat"/>
                    <button onClick={enviarMensagem}><img src={enviarIcon} alt="icone de enviar mensagem" /></button>
                    <label htmlFor="galeriaFile" tabIndex="0">
                        <img src={galeriaIcon} alt="icone de ver a galeria" />
                    </label>

                    <input type="file" name="galeriaFile" id="galeriaFile" />
                </div>
            </div>

        </div>
    )
}

export default Chat