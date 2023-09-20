
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from "react-router-dom"

function Perfil() {
    const [visibleLeft, setVisibleLeft] = useState(false);
    const idUser = localStorage.getItem('id_usuarioLogin')
    
    console.log(idUser);
    //const baseUrl = 'https://app-nodejs.cyclic.cloud/'
    const baseUrl = 'http://10.107.144.7:8080/'
    useEffect(() => {
  
        axios.get(`${baseUrl}v1/sbook/usuario/${idUser}`)
          .then(response => {
                    console.log(response);
                    console.log(response.data.dados[0]);
                    let nomeUser = response.data.dados[0].nome
                    let perfilFoto = response.data.dados[0].foto
                    let estadoUsuario = response.data.dados[0].estado
                    let logradouroUsuario = response.data.dados[0].logradouro
                    let data_nascimento = response.data.dados[0].data_nascimento
                    let email = response.data.dados[0].email

                    localStorage.setItem('nomeUsuario', nomeUser )
                    localStorage.setItem('perfilFoto', perfilFoto )
                    localStorage.setItem('estadoUsuario', estadoUsuario )
                    localStorage.setItem('logradouroUsuario', logradouroUsuario)
                    localStorage.setItem('data_nascimento', data_nascimento)
                    localStorage.setItem('email', email)
          })
          .catch(error => {
            console.error('Erro ao obter dados do usuario', error);
          });
      }, []);

      let nomeUsuario = localStorage.getItem('nomeUsuario')
      let perfilFoto = localStorage.getItem('perfilFoto')
      let estadoUsuario = localStorage.getItem('estadoUsuario')
      let logradouroUsuario = localStorage.getItem('logradouroUsuario')
      let data_nascimento = localStorage.getItem('data_nascimento')
      let email = localStorage.getItem('email')
      
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
                        <p>{nomeUsuario}</p>
                    <img src={perfilFoto} alt="foto de perfil do usuário"  className='fotoUser'/>
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
                            <img src={perfilFoto} alt="foto de perfil do usuário" className='fotoUser'/>
                            <p>{nomeUsuario}</p>
                        </div>
                        <div className="dadosUser">
                            <span> <img src={mundoIcon} alt="icone do planeta Terra" /> {estadoUsuario}</span>
                            <span> <img src={localIcon} alt="icone de localizacao" />{logradouroUsuario}</span>
                            <span> <img src={emailIcon} alt="icone de email" />{email}</span>
                            <span><img src={boloIcon} alt="icone de bolo" />{data_nascimento}</span>
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