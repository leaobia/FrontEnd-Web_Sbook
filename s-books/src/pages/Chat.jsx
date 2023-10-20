import ChatItemComponent from "../components/ChatItem"
import '../components/css/Chat.css'
import { MessageBox } from "react-chat-elements";
import enviarIcon from '../components/img/enviarbutton.png'
import galeriaIcon from '../components/img/verImagensGaleria.png'
import menuDropdownIcon from '../components/img/menuDropdownIcon.png'
import { Button, Modal, ModalOverlay, useDisclosure, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalFooter  } from '@chakra-ui/react';

function Chat() {

  

    let foto = localStorage.getItem('fotoUsuarioHome')
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <div className="chat">
                                <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir conta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <p>Tem certeza de que deseja excluir esse chat? Essa ação é irreversível.</p>
          </ModalBody>
          <ModalFooter>
            <Button>Excluir</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
            <div className="listachats">
                <ChatItemComponent/>
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
                <ChatItemComponent />
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
                    <MessageBox
                    className="mensagemRecebida"
                        position='left'
                        title='Burhan'
                        type='text'
                        text="Hi there !"
                        date={Date.now()}
                    />

<MessageBox
  position={"left"}
  type={"photo"}
  title={"Kursat"}
  data={{
      uri: "https://picsum.photos/200/200",
  }}
/>
                </div>
                <div className="mensagemEnviarContainer">
                 <input type="text" placeholder="type here..." className="inputChat"/>
                 <button><img src={enviarIcon} alt="icone de enviar mensagem" /></button>
                 <button><img src={galeriaIcon} alt="icone de ver a galeria" /></button>
                </div>
               
            </div>
        </div>
    )
}

export default Chat