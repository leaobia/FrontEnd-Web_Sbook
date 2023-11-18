import React from 'react'
import "react-chat-elements/dist/main.css"
import { MessageBox } from "react-chat-elements";

export const ChatBoxEnviada = () => {
  
  return (
   <div className="enviadaContainer">
                    <div className="enviada">
                        <button className="verCancelado iconEditarMensagem">...</button>
                    <MessageBox
                    className="mensagemEnviada"
                        position='right'
                        type='text'
                        text="Oieee teste aqqqqq!"
                        date={Date.now()}
                    />
                    </div>
                    </div>
  )
  }


export default ChatBoxEnviada