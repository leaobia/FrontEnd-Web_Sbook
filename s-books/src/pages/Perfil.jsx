import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import iconSidebar from '../components/img/sidebarClick.png'
import '../components/css/Perfil.css'
import userImage from '../components/img/userImage.png'

function Perfil() {
    const [visibleLeft, setVisibleLeft] = useState(false);
    return (
        <div className="meuPerfi">
            <div className="sideBarContainer">
                <button className='botaoMenu' onClick={() => setVisibleLeft(true)}><img src={iconSidebar} alt='ícone do botao de menu' /></button>
                <div className="menuLocalContainer">
                    <span className='nomeDaCidade'>Carapicuíba</span>
                </div>
                <Sidebar className='sideBar' visible={visibleLeft} position="left" onHide={() => setVisibleLeft(false)}>
                    oi
                </Sidebar>
            </div>
            <div className="perfilContent">
                <h1 className='perfilContent_title'>Perfil</h1>
                <div className="contentPerfil">
                    <div className="resumoPerfil">
                        <h3>Resumo do seu perfil</h3>
                        <div className="perfilUsuario">
                            <img src={userImage} alt="foto de perfil do usuário" />
                            <p>Thiago Freitas</p>
                        </div>
                        <div className="dadosUser">
                            <span>Brasil</span>
                            <span>Carapicuíba, SP</span>
                            <span>tifreitas10@gmail.com</span>
                            <span>14/06/2006</span>
                        </div>
                    </div>
                    <div className="generoDiv">
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil