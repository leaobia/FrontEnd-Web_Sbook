import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from 'primereact/sidebar';
import iconSidebar from '../components/img/sidebarClick.png'
import '../components/css/Perfil.css'
import perfilIcon from '../components/img/iconePerfil.png'
import anunciosIcon from '../components/img/iconeAnuncios.png'
import favoritosIcon from '../components/img/CoracaoIcon 2.png'
import configIcon from '../components/img/ConfigIcon.png'
import sairIcon from '../components/img/sairIcon.png'
import { baseUrl } from '../url';
import UploadFotoPerfil from './UploadFotoPerfil';

import { logOut } from '../url';

import { Link } from "react-router-dom"


import { Button, Modal, ModalOverlay, useDisclosure, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalFooter  } from '@chakra-ui/react';


function Configuracoes() {
    const [visibleLeft, setVisibleLeft] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    let nomeUsuario = localStorage.getItem('nomeUsuario')
    let perfilFoto = localStorage.getItem('perfilFoto')
    let cidadeUsuario = localStorage.getItem('cidadeUsuario')
    let data_nascimento = localStorage.getItem('data_nascimento')
    let formattedDate;
    let cepUsuario = localStorage.getItem('cepUsuario')

    let idUsuario = localStorage.getItem('id_usuarioLogin') 


    const [nameValue, setNameValue] = useState('');
    const [cepValue, setCepValue] = useState(cepUsuario);

    useEffect(() => {
        axios.get(`${baseUrl}v1/sbook/usuario/${idUsuario}`)
          .then(response => {
            let bairro = response.data.dados.bairro
            let cidade = response.data.dados.cidade
            let estado = response.data.dados.estado
            let foto = response.data.dados.foto
            let logradouro = response.data.dados.logradouro
            let email = response.data.dados.email
            let data_nascimento = response.data.dados.data_nascimento

console.log('oi');
           setNameValue(response.data.dados.nome)
          })
          .catch(error => {
            console.error('Erro ao obter dados do usuario:', error);
          })
      }, [idUsuario]);


    if (data_nascimento) {
        const parts = data_nascimento.split('-');

        if (parts.length === 3) {
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];

            formattedDate = `${year}-${month}-${day}`;
        } else {
            console.error('Invalid date format in localStorage');
        }
    }




    const [dateValue, setDateValue] = useState(formattedDate);

    const fecharPerguntasEditar = () => {
        const desejaEditarDiv = document.getElementById('desejaEditarDiv')
        desejaEditarDiv.classList.remove('d-flex')
        desejaEditarDiv.classList.add('d-none')
        window.location.reload()
    }

    function fetchViaCep() {

        const cepInput = document.getElementById('pegarCEPEdit');

        const cep = cepInput.value.replace(/\D/g, '');;


        if (/^\d{8}$/.test(cep)) {

            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    let cidade = data.localidade
                    let bairro = data.bairro
                    let logradouro = data.logradouro
                    let estado = data.uf

                    localStorage.setItem('cepEdit', cep)
                    localStorage.setItem('cidadeEdit', cidade)
                    localStorage.setItem('bairroEdit', bairro)
                    localStorage.setItem('logradouroEdit', logradouro)
                    localStorage.setItem('estadoEdit', estado)

                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            console.log('CEP inválido. Certifique-se de inserir 8 dígitos numéricos.');
        }

    }

    const abrirPerguntasEditar = () => {
        const desejaEditarDiv = document.getElementById('desejaEditarDiv')
        desejaEditarDiv.classList.add('d-flex')
        desejaEditarDiv.classList.remove('d-none')

        fetchViaCep()
    }

    function editarUsuario() {
        let cep = localStorage.getItem('cepEdit')
        let cidade = localStorage.getItem('cidadeEdit')
        let logradouro = localStorage.getItem('logradouroEdit')
        let estado = localStorage.getItem('estadoEdit')
        let bairro = localStorage.getItem('bairroEdit')

        let id_endereco = localStorage.getItem('id_endereco')
        let id_usuario = localStorage.getItem('id_usuarioLogin')

        let dateEdit = document.getElementById('dateEdit').value
        //let emailEdit = document.getElementById('emailEdit').value
        let nomeEdit = document.getElementById('nomeEdit').value

        const dados = {
            "id_usuario": parseInt(id_usuario),
            "id_endereco": parseInt(id_endereco),
            "logradouro_endereco": logradouro,
            "bairro_endereco": bairro,
            "cidade_endereco": cidade,
            "estado_endereco": estado,
            "cep_endereco": cep,
            "nome_usuario": nomeEdit,
            "data_nascimento_usuario": dateEdit
        };

        const url = `${baseUrl}v1/sbook/atualizar-usuario`;
        const tokenJWT = localStorage.getItem('token');
        console.log('token:', tokenJWT);

        console.log(dados);

        fetch(`${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `x-acccess-token ${tokenJWT}`
            },
            body: JSON.stringify(dados)
        })
            .then(response => {
                console.log('Response:', response);
       
                const desejaEditarDiv = document.getElementById('desejaEditarDiv')
                desejaEditarDiv.classList.remove('d-flex')
                desejaEditarDiv.classList.add('d-none')

              if(response.status === 200){
                window.location.reload()
              }
            })
            .catch(error => {
                console.error(error);
            });
        const url2 = `${baseUrl}v1/sbook/atualizar-foto-usuario`;
        let urlPerfil = localStorage.getItem('dataImageURLPerfil')
        if(urlPerfil){
            const dados2 = {
                "id": parseInt(id_usuario),
                "foto": urlPerfil
            };
    
            console.log(dados2);
    
            fetch(`${url2}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `x-acccess-token ${tokenJWT}`
                },
                body: JSON.stringify(dados2)
            })
                .then(response => {
                    console.log('Response:', response);
           
                    const desejaEditarDiv = document.getElementById('desejaEditarDiv')
                    desejaEditarDiv.classList.remove('d-flex')
                    desejaEditarDiv.classList.add('d-none')
    
                  
                })
                .catch(error => {
                    console.error(error);
                });
        }
       




    }

    return (
        <div className='configContainer'>
                    <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir conta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <p>Tem certeza de que deseja excluir sua conta? Ficaríamos gratos se você pudesse nos dizer o motivo para nos ajudar a melhorar. Por favor, compartilhe seus comentários antes de prosseguir com a exclusão.</p>
           <select id="motivo" name="motivo">
  <option value="mudanca-plataforma">Mudança de plataforma</option>
  <option value="problemas-privacidade">Problemas de privacidade</option>
  <option value="nao-interessado">Não estou mais interessado</option>
  <option value="problemas-tecnicos">Problemas técnicos</option>
  <option value="preocupacoes-seguranca">Preocupações de segurança</option>
  <option value="alternativa-melhor">Encontrei uma alternativa melhor</option>
  <option value="excesso-notificacoes">Excesso de notificações</option>
  <option value="problemas-usabilidade">Problemas de usabilidade</option>
  <option value="outro">Outro (por favor, especifique)</option>
</select>
          </ModalBody>
          <ModalFooter>
            <Button>Excluir</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
                                <Link className='link' to='/meusAnuncios'> <img src={anunciosIcon} alt="icone foto de anuncios" /> Meus anúncios</Link>
                                <Link className='link' to='/favoritos'> <img src={favoritosIcon} alt="icone foto de favoritos" />Favoritos</Link>
                                <Link className='link' to='/configuracoes'> <img src={configIcon} alt="icone foto de favoritos" />Configurações</Link>
                            </div>
                            <button className='botaoLogOut bold' onClick={logOut}><img src={sairIcon} alt="sair" />Sair</button>
                        </div>
                    </div>
                </Sidebar>
            </div>
            <div className="configContent">
                <div className="tabelaConfigDados">
                    <div className="titleConfigDados">
                        <h3>Dados pessoais</h3>
                    </div>
                    <div className="inputContainer">
                        <div className="inputContainer1">
                            <div className="inputGroup">
                                Nome:
                                <input type="text" value={nameValue} onChange={(e) => setNameValue(e.target.value)} id='nomeEdit' />
                            </div>
                            <div className="inputGroup">
                                CEP:
                                <input type="number" id='pegarCEPEdit' onBlur={fetchViaCep} value={cepValue} onChange={(e) => setCepValue(e.target.value)} />
                            </div>
                        </div>
                        <div className="inputContainer2">
                            <div className="inputGroup">
                                Data de nascimento:
                                <input type="date" value={dateValue} id='dateEdit' onChange={(e) => setDateValue(e.target.value)} />
                            </div>
                            <div className="inputGroup">
                            <UploadFotoPerfil/>
                            </div>

                        </div>

                    </div>
                    <button className='editarConfig' onClick={abrirPerguntasEditar}>Editar</button>
                    <div className="desejaEditarDiv d-none" id='desejaEditarDiv'>
                        <h3>Deseja realmente editar suas informações?</h3>
                        <div className="botoesEditarOpcao">
                            <button onClick={editarUsuario}>Sim</button>
                            <button onClick={fecharPerguntasEditar}>Não</button>
                        </div>
                    </div>
                </div>
                <div className="contentUserDireita">
                    <div className="userContainerDireita">
                        <p>PERFIL</p>
                        <img src={perfilFoto} alt="foto do usuário" className='fotoUser' />
                        <p>{nameValue}</p>
                    </div>
                    <div className="userContainerDireitaLink">
                        <Link>Categorias ➔ </Link>
                    </div>
                    {/* <div className="userContainerDireitaLink excluirButton">
                        <button>Excluir conta </button>
                    </div> */}
                </div>

                <Button onClick={onOpen}>Excluir conta</Button>


            </div>

        </div>
    )
}

export default Configuracoes