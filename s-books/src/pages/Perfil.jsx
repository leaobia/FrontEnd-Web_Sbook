import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import iconSidebar from '../components/img/sidebarClick.png'
import '../components/css/Perfil.css'
import userImage from '../components/img/userImage.png'
import mundoIcon from '../components/img/mundoIcon.png'
import localIcon from '../components/img/localIcon.png'
import emailIcon from '../components/img/EmailIcon.png'
import boloIcon from '../components/img/BoloIcon.png'
import perfilIcon from '../components/img/iconePerfil.png'
import anunciosIcon from '../components/img/iconeAnuncios.png'
import favoritosIcon from '../components/img/CoracaoIcon 2.png'
import configIcon from '../components/img/ConfigIcon.png'
import sairIcon from '../components/img/sairIcon.png'

import { Link } from "react-router-dom"

function Perfil() {
    const [visibleLeft, setVisibleLeft] = useState(false);
    return (
        <div className="meuPerfi">
            <div className="sideBarContainer">
                <button className='botaoMenu' onClick={() => setVisibleLeft(true)}><img src={iconSidebar} alt='ícone do botao de menu' /></button>
                <div className="menuLocalContainer">
                    <span className='nomeDaCidade'>Carapicuíba</span>
                </div>
                <Sidebar className='sideBar perfilLateral' visible={visibleLeft} position="left" onHide={() => setVisibleLeft(false)}>
                    <div className="dadosUserSideBar">
                        <div className="nomeFotoUser">
                        <p>Thiago Freitas</p>
                    <img src={userImage} alt="foto de perfil do usuário" />
                        </div>
                        <div className="sideBarConfig">
                            <span className='titleConfigSidebar'>PERFIL</span>
                            <div className="linksConfig">
                                <Link className='link' to='/perfil'> <img src={perfilIcon} alt="icone foto de perfil" /> Perfil</Link>
                                <Link className='link'> <img src={anunciosIcon} alt="icone foto de anuncios" /> Meus anúncios</Link>
                                <Link className='link'> <img src={favoritosIcon} alt="icone foto de favoritos" />Favoritos</Link>
                                <Link className='link'> <img src={configIcon} alt="icone foto de favoritos" />Configurações</Link>
                            </div>
                            <button className='botaoLogOut bold'><img src={sairIcon} alt="sair" />Sair</button>
                        </div>
                    </div>
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
                            <span> <img src={mundoIcon} alt="icone do planeta Terra" /> Brasil</span>
                            <span> <img src={localIcon} alt="icone de localizacao" />  Carapicuíba, SP</span>
                            <span> <img src={emailIcon} alt="icone de email" /> tifreitas10@gmail.com</span>
                            <span><img src={boloIcon} alt="icone de bolo" /> 14/06/2006</span>
                        </div>
                    </div>
                    <div className="generoDiv">
                        <h1>Categorias</h1>
                        <div className="containerCategorias">
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero maior</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        <span className='nomeDaCidade'>Gênero</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil