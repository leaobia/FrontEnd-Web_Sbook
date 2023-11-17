import { Sidebar } from 'primereact/sidebar';
import iconSidebar from '../components/img/sidebarClick.png'
import '../components/css/Perfil.css'
import perfilIcon from '../components/img/iconePerfil.png'
import anunciosIcon from '../components/img/iconeAnuncios.png'
import favoritosIcon from '../components/img/CoracaoIcon 2.png'
import configIcon from '../components/img/ConfigIcon.png'
import sairIcon from '../components/img/sairIcon.png'

import React, { useState } from 'react';
import SecaoLivroFav from '../components/SecaoLivroFav';

import { logOut } from '../url';

import { Link } from "react-router-dom"

let nomeUsuario = localStorage.getItem('nomeUsuarioHome')
let perfilFoto = localStorage.getItem('fotoUsuarioHome')
let cidadeUsuario = localStorage.getItem('cidadeUsuarioHome')

function Favoritos() {

    const [visibleLeft, setVisibleLeft] = useState(false);
  
    return (
        <div className='meusFav'>
             <div className="sideBarContainer">
                <button className='botaoMenu' onClick={() => setVisibleLeft(true)}><img src={iconSidebar} alt='ícone do botao de menu' /></button>
                <div className="menuLocalContainer">
                    <span className='nomeDaCidade'>{cidadeUsuario}</span>
                </div>
                <Sidebar className='sideBar perfilLateral' visible={visibleLeft} position="left" onHide={() => setVisibleLeft(false)}>
                    <div className="dadosUserSideBar">
                        <div className="nomeFotoUser">
                        <p>{nomeUsuario}</p>
                    <img src={perfilFoto} alt="foto de perfil do usuário"  className='fotoUser'/>
                        </div>
                        <div className="sideBarConfig">
                            <span className='titleConfigSidebar'>PERFIL</span>
                            <div className="linksConfig">
                                <Link className='link' to='/perfil'> <img src={perfilIcon} alt="icone foto de perfil" /> Perfil</Link>
                                <Link className='link' to='/meusAnuncios'> <img src={anunciosIcon} alt="icone foto de anuncios" /> Meus anúncios</Link>
                                <Link className='link' to='/favoritos'> <img src={favoritosIcon} alt="icone foto de favoritos" />Favoritos</Link>
                                <Link className='link' to='/configuracoes'> <img src={configIcon} alt="icone foto de favoritos" />Configurações</Link>
                            </div>
                            <button className='botaoLogOut bold' onClick={logOut}><img src={sairIcon} alt="sair" />Sair</button>
                        </div>
                    </div>
                </Sidebar>
            </div>
            <SecaoLivroFav/>
        </div>
    )
}

export default Favoritos