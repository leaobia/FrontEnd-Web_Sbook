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
import axios from 'axios';

import React, { useRef, useState, useEffect } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../adapters/firebase";

function Chat() {

    const [socketInstance] = useState(socket());
    const [chatMessage, setChatMessage] = useState('')
    let anuncianteChatInit = localStorage.getItem('anuncianteChatInit')
    console.log('anuncioChatInit', anuncianteChatInit);

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


    // const abrirMensagemConfig = () => {
    //     document.querySelector('.buttonCancelarMensagem').classList.add('d-flex')
    //     document.querySelector('.buttonCancelarMensagem').classList.remove('d-none')
    // }

    // const sumirDaTela = () => {
    //     document.querySelector('.buttonCancelarMensagem').classList.remove('d-flex')
    //     document.querySelector('.buttonCancelarMensagem').classList.add('d-none')
    // }


    let foto = localStorage.getItem('fotoUsuarioHome')
    const { isOpen,  onClose } = useDisclosure()
  

    const enviarMensagem = () => {

         document.getElementById('galeriaFile').value = ''
          document.querySelector('.divPreviewImage').classList.add('d-none')
        document.querySelector('.divPreviewImage').classList.remove('d-flex')

        let mensagemTexto = document.getElementById('inputChat').value
        let idConversante = parseInt(localStorage.getItem('idConversante'))
        let idUsuario = parseInt(localStorage.getItem('id_usuarioLogin'));
        let  chatId = localStorage.getItem('chatId')
        let image = chatMessage
        console.log(mensagemTexto, idConversante, idUsuario, chatId);

        const credentials = {
            "messageBy": idUsuario,
            "messageTo": idConversante,
            "message": mensagemTexto,
            "image": image,
            "chatId": chatId
        }
     
            socketInstance.emit('message', credentials);
     
    
            socketInstance.on('receive_message', (lista) => {
            
                console.log(lista);
             
            });


            document.getElementById('inputChat').value = ''
            setChatMessage('')
      
    }

    const pegarFoto = (e) => {
      
        
        const inputFile = e.target;

        const file = inputFile.files[0];

        console.log(file);

        const storageRef = ref(storage, `images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      if(file){

      uploadTask.on(
        "state_changed",
        snapshot => {

        },
        error => {
          alert(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
          
            const key = '2cd580a43d674328bff821cb0c9d6ed0'
            const subscriptionKey = key;
            const endpoint = 'https://sbook.cognitiveservices.azure.com/vision/v3.2/analyze'; 
            
            const imageUrl = url;
            
            const headers = new Headers({
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key': subscriptionKey
            });
            
            const body = JSON.stringify({
              url: imageUrl
            });
            
            const requestOptions = {
              method: 'POST',
              headers: headers,
              body: body
            };
            
            fetch(endpoint, requestOptions)
              .then(response => response.json())
              .then(data => {

                let categorias = data.categories;

                categorias.forEach(categoria => {
                  if (categoria.name === 'people' || categoria.name === 'people_portrait' || categoria.name === 'people_') {
                    alert('Foi encontrado um conteúdo de imagem não apropiado para fins da aplicação web.')
                    setChatMessage('')
                    document.querySelector('.divPreviewImage').classList.add('d-none')
                    document.querySelector('.divPreviewImage').classList.remove('d-flex')
                  } else {
                    console.log(categoria);
                    setChatMessage(url)
                    document.querySelector('.divPreviewImage').classList.remove('d-none')
                    document.querySelector('.divPreviewImage').classList.add('d-flex')
                    let img = document.querySelector('.imgChatPreview')
                    img.src = url
                  }
                });
                
             
              })
              .catch(error => {
                console.error('Erro na solicitação:', error);
              });
            
          })
        }
      )
      }

    }

    const fecharPreview = () => {

        document.getElementById('inputChat').value = ''
        setChatMessage('')

        document.querySelector('.divPreviewImage').classList.add('d-none')
        document.querySelector('.divPreviewImage').classList.remove('d-flex')

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

          

            <ChatItemComponent />

            <div className="imagemPadraoDiv"></div>
            <div className="chatMessage d-none">
                <div className="headerChatMessage">
                    <img  src={foto} alt="perfil usuario" className="fotoUsuarioChat" id="fotoUsuarioTrocaMensagem"/>
                    <p id="nomeUsuarioTrocaMensagem"></p>
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

<div className="divPreviewImage d-none">
                        <button onClick={fecharPreview}>X</button>
                        <img src="" alt="imagemChat" className="imgChatPreview" />
                    </div>

                <div className="footerMensagens">

                <div className="mensagemEnviarContainer">
                    <input type="text" placeholder="digite sua mensagem" className="inputChat" id="inputChat"/>
                    <button onClick={enviarMensagem}><img src={enviarIcon} alt="icone de enviar mensagem" /></button>
                   
                </div>
                <label htmlFor="galeriaFile" tabIndex="0">
                        <img src={galeriaIcon} alt="icone de ver a galeria" />
                    </label>

                    <input type="file" name="galeriaFile" id="galeriaFile" onChange={pegarFoto}/>
                </div>

               
            </div>

        </div>
    )
}

export default Chat