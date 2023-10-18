import ChatItemComponent from "../components/ChatItem"
import '../components/css/Chat.css'
import { MessageBox } from "react-chat-elements";

function Chat() {

    let foto = localStorage.getItem('fotoUsuarioHome')
    return (
        <div className="chat">
            <div className="listachats">
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
                <ChatItemComponent />
            </div>
            <div className="chatMessage">
                <div className="headerChatMessage">
                    <img src={foto} alt="perfil usuario" className="fotoUsuarioChat" />
                    <p>Max Kellerman</p>
                </div>
                <div className="containerMensagens">
                    <MessageBox
                    className="mensagemRecebida"
                        position='left'
                        title='Burhan'
                        type='text'
                        text="Hi there !"
                        date={new Date()}
                    />

                    <MessageBox
                        position="right"
                        title="Emre"
                        type="meetingLink"
                        text="Click to join the meeting"
                        date={new Date()}
                    />
                       <MessageBox
                    className="mensagemRecebida"
                        position='left'
                        title='Burhan'
                        type='text'
                        text="Hi there !"
                        date={new Date()}
                    />

                    <MessageBox
                        position="right"
                        title="Emre"
                        type="meetingLink"
                        text="Click to join the meeting"
                        date={new Date()}
                    />
                       <MessageBox
                    className="mensagemRecebida"
                        position='left'
                        title='Burhan'
                        type='text'
                        text="Hi there !"
                        date={new Date()}
                    />

                    <MessageBox
                        position="right"
                        title="Emre"
                        type="meetingLink"
                        text="Click to join the meeting"
                        date={new Date()}
                    />
                       <MessageBox
                    className="mensagemRecebida"
                        position='left'
                        title='Burhan'
                        type='text'
                        text="Hi there !"
                        date={new Date()}
                    />

                    <MessageBox
                        position="right"
                        title="Emre"
                        type="meetingLink"
                        text="Click to join the meeting"
                        date={new Date()}
                    />
                       <MessageBox
                    className="mensagemRecebida"
                        position='left'
                        title='Burhan'
                        type='text'
                        text="Hi there !"
                        date={new Date()}
                    />

                    <MessageBox
                        position="right"
                        title="Emre"
                        type="meetingLink"
                        text="Click to join the meeting"
                        date={new Date()}
                    />
                       <MessageBox
                    className="mensagemRecebida"
                        position='left'
                        title='Burhan'
                        type='text'
                        text="Hi there !"
                        date={new Date()}
                    />

                    <MessageBox
                        position="right"
                        title="Emre"
                        type="meetingLink"
                        text="Click to join the meeting"
                        date={new Date()}
                    />
                       <MessageBox
                    className="mensagemRecebida"
                        position='left'
                        title='Burhan'
                        type='text'
                        text="Hi there !"
                        date={new Date()}
                    />

                    <MessageBox
                        position="right"
                        title="Emre"
                        type="meetingLink"
                        text="Click to join the meeting"
                        date={new Date()}
                    />
                       <MessageBox
                    className="mensagemRecebida"
                        position='left'
                        title='Burhan'
                        type='text'
                        text="Hi there !"
                        date={new Date()}
                    />

                    <MessageBox
                        position="right"
                        title="Emre"
                        type="meetingLink"
                        text="Click to join the meeting"
                        date={new Date()}
                    />
                </div>
            </div>
        </div>
    )
}

export default Chat