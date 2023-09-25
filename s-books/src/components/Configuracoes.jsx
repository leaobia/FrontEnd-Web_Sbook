import React, { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import iconSidebar from '../components/img/sidebarClick.png'
import '../components/css/Perfil.css'
import perfilIcon from '../components/img/iconePerfil.png'
import anunciosIcon from '../components/img/iconeAnuncios.png'
import favoritosIcon from '../components/img/CoracaoIcon 2.png'
import configIcon from '../components/img/ConfigIcon.png'
import sairIcon from '../components/img/sairIcon.png'

import { Link } from "react-router-dom"

let nomeUsuario = localStorage.getItem('nomeUsuario')
let perfilFoto = localStorage.getItem('perfilFoto')
let cidadeUsuario = localStorage.getItem('cidadeUsuario')

function Configuracoes() {
    const [visibleLeft, setVisibleLeft] = useState(false);
    return (
        <div className='configContainer'>
            <div className="sideBarContainer">
                <button className='botaoMenu' onClick={() => setVisibleLeft(true)}><img src={iconSidebar} alt='ícone do botao de menu' /></button>
                <div className="menuLocalContainer">
                    <span className='nomeDaCidade'>{cidadeUsuario}</span>
                </div>
                <Sidebar className='sideBar perfilLateral' visible={visibleLeft} position="left" onHide={() => setVisibleLeft(false)}>
                    <div className="dadosUserSideBar">
                        <div className="nomeFotoUser">
                            <p>{nomeUsuario}</p>
                            <img src={perfilFoto} alt="foto de perfil do usuário" className='fotoUser' />
                        </div>
                        <div className="sideBarConfig">
                            <span className='titleConfigSidebar'>PERFIL</span>
                            <div className="linksConfig">
                                <Link className='link' to='/perfil'> <img src={perfilIcon} alt="icone foto de perfil" /> Perfil</Link>
                                <Link className='link'> <img src={anunciosIcon} alt="icone foto de anuncios" /> Meus anúncios</Link>
                                <Link className='link'> <img src={favoritosIcon} alt="icone foto de favoritos" />Favoritos</Link>
                                <Link className='link' to='/configuracoes'> <img src={configIcon} alt="icone foto de favoritos" />Configurações</Link>
                            </div>
                            <button className='botaoLogOut bold'><img src={sairIcon} alt="sair" />Sair</button>
                        </div>
                    </div>
                </Sidebar>
            </div>
            <div className="configContent">
            <div className="tabelaConfigDados">
                <table border="1">
                    <h3>Dados pessoais</h3>
                    {/* <tr>
                        <th>Coluna 1</th>
                        <th>Coluna 2</th>
                    </tr> */}
                    <tr>
                        <td>Dado 1A</td>
                        <td>Dado 1B</td>
                    </tr>
                    <tr>
                        <td>Dado 2A</td>
                        <td>Dado 2B</td>
                    </tr>
                    <tr>
                        <td>Dado 3A</td>
                        <td>Dado 3B</td>
                    </tr>
                </table>
            </div>
            <div className="contentUserDireita">
                <div className="userContainerDireita">
                    img user
                </div>
                <div className="userContainerDireitaLink">
                    config
                </div>
            </div>
            </div>
        </div>
    )
}

export default Configuracoes