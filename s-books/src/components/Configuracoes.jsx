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
import {
    Button, Modal, ModalOverlay, useDisclosure, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalFooter,
    Drawer, DrawerBody, DrawerCloseButton, DrawerHeader, DrawerOverlay, DrawerContent,
    Textarea, Input
} from '@chakra-ui/react';


import { logOut } from '../url';

import { Link } from "react-router-dom"


function Configuracoes() {


    let cep = localStorage.getItem('cepEdit')
    // let cidade = localStorage.getItem('cidadeEdit')
    // let logradouro = localStorage.getItem('logradouroEdit')
    // let estado = localStorage.getItem('estadoEdit')
    // let bairro = localStorage.getItem('bairroEdit')
    const [visibleLeft, setVisibleLeft] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();


    let cidadeUsuario = localStorage.getItem('cidadeUsuarioHome')

    let formattedDate;


    let idUsuario = localStorage.getItem('id_usuarioLogin')


    const [nameValue, setNameValue] = useState('');
    const [dataNasc, setDataNascValue] = useState('');
    const [perfilFotoValue, setPerfilFotoValue] = useState('');
    const [cepValue, setCepValue] = useState('');
    const [logradouroValue, setLogradouroValue] = useState('');
    const [bairroValue, setBairroValue] = useState('');
    const [cidadeValue, setCidadeValue] = useState('');
    const [estadoValue, setEstadoValue] = useState('');
    let [generosValue, setGenerosValue] = useState([]);



    axios.get(`${baseUrl}v1/sbook/generos`)
        .then(response => {
            let generos = response.data.dados
            setGenerosValue(generos)

        })
        .catch(error => {
            console.error('Erro ao obter dados do usuario:', error);
        })

    useEffect(() => {
        axios.get(`${baseUrl}v1/sbook/usuario/${idUsuario}`)
            .then(response => {
                 let bairro = response.data.dados.bairro
                 let cidade = response.data.dados.cidade
                 let estado = response.data.dados.estado
                let foto = response.data.dados.foto
                let cep = response.data.dados.cep
                 let logradouro = response.data.dados.logradouro
                // let email = response.data.dados.email
                let data_nascimento = response.data.dados.data_nascimento

                setNameValue(response.data.dados.nome)
                setPerfilFotoValue(foto)
                setDataNascValue(data_nascimento)
                setCepValue(cep)
                setEstadoValue(estado)
                setBairroValue(bairro)
                setCidadeValue(cidade)
                setLogradouroValue(logradouro)
                //  localStorage.setItem('perfilFotoConfig', foto)
            })
            .catch(error => {
                console.error('Erro ao obter dados do genero:', error);
            })
    }, [idUsuario]);


    if (dataNasc) {
        const parts = dataNasc.split('-');

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

    useEffect(() => {
        setDateValue(formattedDate);
    }, [formattedDate]);




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

                   setCepValue(cep)
                   setCidadeValue(cidade)
                   setBairroValue(bairro)
                   setLogradouroValue(logradouro)
                   setEstadoValue(estado)

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

        let id_endereco = localStorage.getItem('id_endereco')
        let id_usuario = localStorage.getItem('id_usuarioLogin')

        let dateEdit = document.getElementById('dateEdit').value
        //let emailEdit = document.getElementById('emailEdit').value
        let nomeEdit = document.getElementById('nomeEdit').value

        const dados = {
            "id_usuario": parseInt(id_usuario),
            "id_endereco": parseInt(id_endereco),
            "logradouro_endereco": logradouroValue,
            "bairro_endereco": bairroValue,
            "cidade_endereco": cidadeValue,
            "estado_endereco": estadoValue,
            "cep_endereco": cepValue,
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

                if (response.status === 200) {
                    window.location.reload()
                }
            })
            .catch(error => {
                console.error(error);
            });
        const url2 = `${baseUrl}v1/sbook/atualizar-foto-usuario`;
        let urlPerfil = localStorage.getItem('dataImageURLPerfil')
        if (urlPerfil) {
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

                    if (response.status === 200) {
                        window.location.reload()

                    }

                    const desejaEditarDiv = document.getElementById('desejaEditarDiv')
                    desejaEditarDiv.classList.remove('d-flex')
                    desejaEditarDiv.classList.add('d-none')


                })
                .catch(error => {
                    console.error(error);
                });
        }

    }

    const editandoCategorias = () => {

    }

    return (
        <div className='configContainer'>

            <Drawer onClose={onClose2} isOpen={isOpen2} size={'xl'}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <div className="contentEditGeneros">
                            <h1 className='editCategorias'>Editar categorias</h1>
                            <div className="checkboxesgeneros">
                                {generosValue.map((genero) => (
                                    <div className='checkGroup'>
                                        <input
                                            type="checkbox"
                                            id={`checkbox-${genero.id}`}
                                            value={genero.nome}
                                        />
                                        <label htmlFor={`checkbox-${genero.id}`}>{genero.nome}</label>
                                    </div>
                                ))}
                            </div>
                            <button className='editGenCateg' onClick={editandoCategorias}>Editar</button>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>



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
                            <p>{nameValue}</p>
                            <img src={perfilFotoValue} alt="foto de perfil do usuário" className='fotoUser' />
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
                            <div className='container-endereco'>
                                <p className='title-endereco'>{logradouroValue}</p>
                                <p className='info-endereco'>{cidadeValue}, {estadoValue}</p>
                            </div>
                        </div>
                        <div className="inputContainer2">
                            <div className="inputGroup">
                                Data de nascimento:
                                <input type="date" value={dateValue} id='dateEdit' onChange={(e) => setDateValue(e.target.value)} />
                            </div>
                            <div className="inputGroup">
                                <UploadFotoPerfil />
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
                        <img src={perfilFotoValue} alt="foto do usuário" className='fotoUser' />
                        <p>{nameValue}</p>
                    </div>
                    <div className="userContainerDireitaLink">
                        <button onClick={onOpen2}>Categorias</button>
                    </div>
                    {/* <div className="userContainerDireitaLink excluirButton">
                        <button>Excluir conta </button>
                    </div> */}
                </div>

                {/* <Button onClick={onOpen}>Excluir conta</Button> */}


            </div>

        </div>
    )
}

export default Configuracoes