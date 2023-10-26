
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import logo from './img/Logo.png';
import imageLogin from './img/imagemLogin.png'
import userProfile from './img/Vector.png'
import userFavorites from './img/coracao.png'
import userChats from './img/chat.png'
import imagemResetSenha from './img/imagemResetSenha.png'
import imagemSenhaRedefinidaComSucesso from './img/redefinidacomsucesso.png'
import imagemCodigoRecuperacao from './img/imgCodigoDeRecuperacao.png'
import imagemRedefinirSenha from './img/recuperarContaimg.png'
import { baseUrl } from '../url';


import PasswordInput from './PasswordInput';

import { Input, Stack, InputGroup, InputRightElement, HStack, Checkbox } from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react'

import { EmailIcon } from '@chakra-ui/icons';
import { Select } from '@chakra-ui/react'



import './css/Header.css'

import { Link } from "react-router-dom"

import './css/Login.css'

import './css/Cadastro.css'

import './css/Reset.css'

let idUsuario = localStorage.getItem('id_usuarioLogin') 


function Header() {

    const [fotoUsuario, setFotoUser] = useState('');

    useEffect(() => {
        axios.get(`${baseUrl}v1/sbook/usuario/${idUsuario}`)
          .then(response => {
          
            let foto = response.data.dados.foto
    
    
           setFotoUser(foto)
          })
          .catch(error => {
            console.error('Erro ao obter dados do usuario:', error);
          })
      });
    
    setTimeout(() => {
        if(idUsuario){
            document.getElementById('iconeDePessoa').src = fotoUsuario
            document.getElementById('iconeDePessoa').classList.add('fotoIconPequeno')
        }
      });


    const storedUsuario = localStorage.getItem('usuario');
    // Inicializa o estado com base no valor armazenado ou false se não houver valor
    const [usuario, setUsuario] = useState(storedUsuario === 'true');


    // Efeito para atualizar o localStorage sempre que o estado 'usuario' mudar
    useEffect(() => {
        localStorage.setItem('usuario', usuario.toString());
        if (storedUsuario === 'true') {
            document.getElementById('userProfileButton').classList.remove('d-none')
            document.getElementById('userProfileButton').classList.add('d-flex')
    
            document.getElementById('botaoLogin').classList.remove('d-flex')
            document.getElementById('botaoLogin').classList.add('d-none')
    
            document.getElementById('userMenu').classList.remove('grid-colun2')
        }
    }, [usuario, storedUsuario]);

    console.log('Usuário logado:', localStorage.getItem('usuario'));



    function hideElement(id) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.remove('d-flex');
            element.classList.add('d-none');
        }
    }

    function showElement(id) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.remove('d-none');
            element.classList.add('d-flex');
        }
    }

    function openModalPai() {

        document.getElementById('body').classList.remove('overflow-auto');
        document.getElementById('body').classList.add('overflow-hidden');

        hideElement('containerCadastro');
        hideElement('resetSenha');
        hideElement('trocarSenha');
        hideElement('senhaRedefinida');
        hideElement('codigoRecuperacao');
        hideElement('containerCadastroContinuacao');
        hideElement('codigoValidacaoEmail');
        hideElement('containerCadastroCategoria');

        showElement('modalPai');
        showElement('containerLogin');


    }

    function abrirContainerCadastro() {
        hideElement('containerLogin');
        hideElement('resetSenha');
        hideElement('trocarSenha');
        hideElement('senhaRedefinida');
        hideElement('containerCadastroContinuacao');
        hideElement('codigoValidacaoEmail');
        hideElement('containerCadastroCategoria');
        showElement('containerCadastro');
    }


    function abrirContainerCadastroContinuacao() {

        hideElement('containerCadastro');
        hideElement('containerLogin');
        hideElement('trocarSenha');
        hideElement('senhaRedefinida');
        hideElement('resetSenha');
        hideElement('containerCadastroCategoria');
        showElement('containerCadastroContinuacao');
        hideElement('codigoValidacaoEmail');

    }

    function abrirContainerCadastroCategoria() {
        hideElement('containerCadastro');
        hideElement('containerCadastroContinuacao');
        hideElement('containerLogin');
        hideElement('trocarSenha');
        hideElement('senhaRedefinida');
        hideElement('resetSenha');
        hideElement('codigoValidacaoEmail');

        showElement('containerCadastroCategoria');

        const generosSelecionados = [];
        const categoriasContainer = document.getElementById('categorias');

        fetch(`${baseUrl}v1/sbook/generos`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    const generos = data.dados;

                    generos.forEach(genero => {
                        const buttonCategoria = document.createElement('button');
                        buttonCategoria.className = 'buttonCategoria';
                        buttonCategoria.textContent = genero.nome;

                        buttonCategoria.addEventListener('click', () => {

                            const generoObj = {
                                id: parseInt(genero.id),
                                nome: genero.nome
                            };

                            const generoIndex = generosSelecionados.findIndex(item => item.id === genero.id);

                            if (generoIndex === -1) {
                                generosSelecionados.push(generoObj);
                                buttonCategoria.classList.add('buttonSelecionado');
                            } else {
                                generosSelecionados.splice(generoIndex, 1);
                                buttonCategoria.classList.remove('buttonSelecionado');
                            }

                            localStorage.setItem('generosSelecionados', JSON.stringify(generosSelecionados));

                        });

                        categoriasContainer.appendChild(buttonCategoria);
                    });
                } else {
                    console.error('Falha ao obter os gêneros.');
                }
            })
            .catch(error => {
                console.error('Erro ao fazer a solicitação:', error);
            });
    }





    function abrirContainerLogin() {

        hideElement('containerCadastro');
        hideElement('trocarSenha');
        hideElement('codigoValidacaoEmail');
        hideElement('senhaRedefinida');
        hideElement('resetSenha');
        hideElement('containerCadastroCategoria');
        hideElement('containerCadastroContinuacao');

        showElement('containerLogin');
    }

    function abrirContainerResetSenha() {

        hideElement('containerCadastro');
        hideElement('trocarSenha');
        hideElement('senhaRedefinida');
        hideElement('codigoValidacaoEmail');
        hideElement('containerLogin');
        hideElement('containerCadastroContinuacao');

        showElement('resetSenha');
    }

    // api

    function verificarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
        let primeiroDigito = 11 - (soma % 11);
        if (primeiroDigito > 9) primeiroDigito = 0;
        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
        let segundoDigito = 11 - (soma % 11);
        if (segundoDigito > 9) segundoDigito = 0;
        return parseInt(cpf.charAt(9)) === primeiroDigito && parseInt(cpf.charAt(10)) === segundoDigito;
    }


    function verificarCadastroDadosPessoais() {

        const nomeUser = document.getElementById('nomeCadastro').value
        const cpf = document.getElementById('cpfCadastro').value.replace(/[.-]/g, '');
        const date = document.getElementById('dateCadastro').value
        const cadastroSenha = document.getElementById('cadastroSenha').value
        const confirmarCadastroSenha = document.getElementById('confirmarCadastroSenha').value


        if (nomeUser && cpf && date && cadastroSenha && confirmarCadastroSenha) {

            localStorage.setItem('nomeUserCadastro', nomeUser)

            localStorage.setItem('dateCadastro', date)

            if (verificarCPF(cpf)) {
                localStorage.setItem('cpfCadastro', cpf)

                if (cadastroSenha === confirmarCadastroSenha) {
                    localStorage.setItem('cadastroSenha', cadastroSenha)
                    validarEmail()

                } else {
                    document.getElementById('erroSenhaOuFaltaCampos').textContent = 'Por favor, preencha senhas iguais.'
                }
            } else {
                document.getElementById('erroSenhaOuFaltaCampos').textContent = 'Por favor, preencha um cpf válido.'
            }
        } else {
            document.getElementById('erroSenhaOuFaltaCampos').textContent = 'Por favor, preencha todos os campos'
        }
    }


    function abrirCodigoRecuperacao() {
        const emailInput = document.getElementById('emailRecuperarSenha').value;


        const dados = {
            email: emailInput
        };


        if (emailInput) {
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if (emailRegex.test(emailInput)) {
                const url = `${baseUrl}v1/sbook/esqueci-senha`;


                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dados)
                };

                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(data => {

                        if (data.status === 200) {

                            hideElement('containerLogin');
                            hideElement('resetSenha');
                            hideElement('containerCadastro');
                            hideElement('trocarSenha');
                            hideElement('codigoValidacao');
                            hideElement('senhaRedefinida');
                            showElement('codigoRecuperacao');
                            localStorage.setItem('emailRecuperarCadastro', emailInput)
                            document.getElementById('emailMessage').textContent = '';
                        } else if (data.status === 404) {

                            document.getElementById('emailMessage').textContent = 'Email não encontrado.';
                        } else {

                            console.error("Erro na solicitação GET:", data.status);
                        }
                    })
                    .catch(error => {
                        console.error("Erro na solicitação GET:", error);
                    });
            } else {
                document.getElementById('emailMessage').textContent = 'Por favor, insira um endereço de e-mail válido.';
            }
        } else {
            document.getElementById('emailMessage').textContent = 'Por favor, digite um e-mail.';
        }

    }


    function abrirCodigoRecuperacaoComCodigo() {

        hideElement('containerLogin');
        hideElement('resetSenha');
        hideElement('containerCadastro');
        hideElement('trocarSenha');
        hideElement('senhaRedefinida');
        hideElement('codigoValidacaoEmail');

        showElement('codigoRecuperacao');
        document.getElementById('emailMessage').textContent = ''
    }

    function abrirTrocarSenha() {
        hideElement('containerLogin');
        hideElement('resetSenha');
        hideElement('containerCadastro');
        hideElement('codigoRecuperacao');
        hideElement('senhaRedefinida');
        hideElement('codigoValidacaoEmail');

        showElement('trocarSenha');
    }

    function validarEmail() {

        hideElement('containerLogin');
        hideElement('resetSenha');
        hideElement('containerCadastro');
        hideElement('codigoRecuperacao');
        hideElement('senhaRedefinida');
        hideElement('trocarSenha');
        hideElement('resetSenha');
        hideElement('containerCadastroContinuacao');

        showElement('codigoValidacaoEmail');
    }


    function abrirSenhaRedefinidaComSucesso() {
        hideElement('containerLogin');
        hideElement('resetSenha');
        hideElement('containerCadastro');
        hideElement('codigoRecuperacao');
        hideElement('trocarSenha');
        hideElement('codigoValidacao');
        hideElement('codigoValidacaoEmail');

        showElement('senhaRedefinida');
    }

    function closeModalPai() {
        document.getElementById('body').classList.add('overflow-auto');
        document.getElementById('body').classList.remove('overflow-hidden');
        hideElement('codigoValidacaoEmail');
        hideElement('modalPai');
    }

    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');


    const checkPin = () => {
        const enteredPin = [pin1, pin2, pin3, pin4];
        const email = localStorage.getItem('emailRecuperarCadastro')
        const token = parseInt(enteredPin.join(''), 10);

        const dados = {
            email: email,
            token: token
        };

        console.log(dados);

        const url = `${baseUrl}v1/sbook/validar-token`;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    document.getElementById('pinMessage').textContent = ''
                    abrirTrocarSenha();
                    return response.json();
                } else {
                    document.getElementById('pinMessage').textContent = 'PIN inválido'
                    console.error('Erro na solicitação GET:', response.status);
                    return Promise.reject('Erro na solicitação GET');
                }
            })
            .then(dadosUsuario => {

                console.log('Dados do usuário:', dadosUsuario);
                localStorage.setItem('idResetSenha', dadosUsuario.id)
            })
            .catch(error => {

                document.getElementById('pinMessage').textContent = 'PIN inválido'
                console.error('Erro na solicitação:', error);
            });
    };


    const [pin1Cadastro, setPin1Cadastro] = useState('');
    const [pin2Cadastro, setPin2Cadastro] = useState('');
    const [pin3Cadastro, setPin3Cadastro] = useState('');
    const [pin4Cadastro, setPin4Cadastro] = useState('');
    const [isValidCadastro, setIsValidCadastro] = useState(true);



    const verifiqueEmail = () => {
        const emailCadastro = document.getElementById('emailCadastro').value;
        const pinValidarMessage = document.getElementById('pinValidarMessage');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailCadastro)) {
            pinValidarMessage.textContent = 'Email inválido';
            return;
        }

        enviarPin();
        pinValidarMessage.textContent = '';
    };




    const enviarPin = () => {
        const pinCorreto = ['1', '2', '3', '4'];

        localStorage.setItem('correctPinCadastro', JSON.stringify(pinCorreto));

    }

    const checkPin2 = () => {
        const emailCadastro = document.getElementById('emailCadastro').value;

        const storedCorrectPin = JSON.parse(localStorage.getItem('correctPinCadastro'));

        const enteredPin = [pin1Cadastro, pin2Cadastro, pin3Cadastro, pin4Cadastro];

        if (!storedCorrectPin || storedCorrectPin.length !== 4) {
            setIsValidCadastro(false);
            document.getElementById('pinValidarMessage').textContent = 'PIN inválido';
            return;
        }

        const isPinValid = enteredPin.every((value, index) => value === storedCorrectPin[index]);

        setIsValidCadastro(isPinValid);

        if (isPinValid) {
            abrirContainerCadastroContinuacao();
            localStorage.setItem('emailCadastro', emailCadastro)
            document.getElementById('pinValidarMessage').textContent = '';
        } else {
            document.getElementById('pinValidarMessage').textContent = 'PIN inválido';
        }
    };




    function verificarSenhasTroca() {
        const inputNovaSenha = document.getElementById('novaSenha').value;
        const inputNovaSenhaConfirmar = document.getElementById('confirmarSenhaTroca').value;

        if (inputNovaSenha !== '' && inputNovaSenhaConfirmar !== '') {
            if (inputNovaSenha === inputNovaSenhaConfirmar) {
                document.getElementById('senhaMessage').textContent = '';
                const data = {
                    id: localStorage.getItem('idResetSenha'),
                    password: inputNovaSenha
                };
                fetch(`${baseUrl}v1/sbook/recuperar-conta`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        if (response.ok) {
                            abrirSenhaRedefinidaComSucesso();
                            return response.json();
                        } else {
                            throw new Error('Erro ao fazer a solicitação');
                        }
                    })
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                document.getElementById('senhaMessage').textContent = 'Por favor, verifique as senhas, elas estão diferentes.';
            }
        } else {
            document.getElementById('senhaMessage').textContent = 'Por favor, preencha ambas as senhas.';
        }
    }

    function fazerLogin(email, senha) {
        email = document.getElementById('emailLoginInput').value
        senha = document.getElementById('senhaLoginInput').value

        const credentials = {
            "email": email,
            "senha": senha
        };

        const url = `${baseUrl}v1/sbook/login`;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
            .then(response => response.json())
            .then(data => {

                console.log('Login:', data);

                document.getElementById('erroLogin').textContent = ''

                const token = data.token;

                localStorage.setItem('id_usuarioLogin', data.usuario.usuario.id)
                localStorage.setItem('id_endereco', data.usuario.endereco.id)
                localStorage.setItem('token', token);
                setUsuario('true')

                closeModalPai()

                document.getElementById('userProfileButton').classList.remove('d-none')
                document.getElementById('userProfileButton').classList.add('d-flex')

                document.getElementById('botaoLogin').classList.remove('d-flex')
                document.getElementById('botaoLogin').classList.add('d-none')

                document.getElementById('userMenu').classList.remove('grid-colun2')
            })
            .finally(function() {
               window.location.reload()
             })
            .catch(error => {
                console.error("Erro ao fazer login:", error);
                document.getElementById('erroLogin').textContent = 'Me desculpe, usuário ou senha incorretos, por favor, verifique suas credenciais.'
            });

    }

    function pegarEnderecosDados() {

        const cepInput = document.getElementById('pegarCEP').value;
        const cidadeInput = document.getElementById('pegarCidade').value;
        const bairroInput = document.getElementById('pegarBairro').value;
        const logradouroInput = document.getElementById('pegarLogradouro').value;
        const selectEstado = document.getElementById('selectEstado').value;


        const nomeUsuario = localStorage.getItem('nomeUserCadastro')
        const email = localStorage.getItem('emailCadastro')
        const dataNascimento = localStorage.getItem('dateCadastro')
        const cpf = localStorage.getItem('cpfCadastro')
        const senha = localStorage.getItem('cadastroSenha')

        if (cepInput && cidadeInput && bairroInput && logradouroInput && selectEstado) {
            const credentials = {
                "logradouro_endereco": logradouroInput,
                "bairro_endereco": bairroInput,
                "cidade_endereco": cidadeInput,
                "estado_endereco": selectEstado,
                "cep_endereco": cepInput,
                "nome_usuario": nomeUsuario,
                "cpf_usuario": cpf,
                "data_nascimento_usuario": dataNascimento,
                "email_usuario": email,
                "senha_usuario": senha
            };
            const url = `${baseUrl}v1/sbook/registro-usuario`;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
                .then(response => response.json())
                .then(data => {

                    localStorage.setItem('id_usuario', data.usuario[0].id_usuario)
                    abrirContainerCadastroCategoria()
                    document.getElementById('erroEndereco').textContent = ''
                })
                .catch(error => {
                    console.error("Erro ao fazer cadastro:", error);
                });

        } else {
            document.getElementById('erroEndereco').textContent = 'Por favor, preencha todas as credenciais corretamente!'
        }

    }



    function fetchViaCep() {

        const cepInput = document.getElementById('pegarCEP');
        const cidadeInput = document.getElementById('pegarCidade');
        const bairroInput = document.getElementById('pegarBairro');
        const logradouroInput = document.getElementById('pegarLogradouro');
        const selectEstado = document.getElementById('selectEstado');



        const cep = cepInput.value.replace(/\D/g, '');;


        if (/^\d{8}$/.test(cep)) {

            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    cidadeInput.value = data.localidade
                    bairroInput.value = data.bairro
                    logradouroInput.value = data.logradouro
                    selectEstado.value = data.uf

                    document.getElementById('erroEndereco').textContent = ''
                })
                .catch(error => {
                    document.getElementById('erroEndereco').textContent = 'CEP inválido. Certifique-se de inserir 8 dígitos numéricos.'
                });
        } else {
            document.getElementById('erroEndereco').textContent = 'CEP inválido. Certifique-se de inserir 8 dígitos numéricos.'
        }

    }

    function enviarCategoriasFavoritasDoUsuario() {

        const generosSelecionados = JSON.parse(localStorage.getItem('generosSelecionados'));

        const id_usuario = parseInt(localStorage.getItem('id_usuario'));

        const dados = {
            "id_usuario": id_usuario,
            "generos_preferidos": generosSelecionados
        }

        console.log(dados);

        fetch(`${baseUrl}v1/sbook/generos-preferidos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
            .then(response => {
                if (response.ok) {
                    abrirContainerLogin()
                    return response.json();
                } else {
                    throw new Error('Erro ao fazer a solicitação');
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (


        <div className="Header">

            {/* login */}

            <div className='loginModal d-none' id='modalPai'>

                <div className="containerLogin d-flex" id='containerLogin'>
                    <button onClick={closeModalPai} className='botaoFecharModalLogin'>X</button>
                    <div className="formLogin">
                        <div className="textoLogin">
                            <img src={logo} alt="logotipo da empresa" className='imgLogo' />
                            <h1>Olá</h1>
                            <h4>Bem vindo de volta</h4>
                            <Stack spacing={4}>
                                <InputGroup >
                                    <InputRightElement h='2.8rem' pointerEvents='none'>
                                        <EmailIcon color='gray' />
                                    </InputRightElement>
                                    <Input
                                        type='email'
                                        placeholder='Email'
                                        w={[250, 350, 400]}
                                        h='48px'
                                        className='inputField'
                                        id='emailLoginInput'
                                        fontSize={['sm', 'md', 'lg']}
                                    />
                                    <span id="erroEmailMessage"></span>
                                </InputGroup>
                                <PasswordInput placeholder='Senha' id='senhaLoginInput' />
                                <span id="erroSenhaMessage"></span>
                                <button className='forgotPassword' onClick={abrirContainerResetSenha}>Esqueci a senha</button>
                            </Stack>
                        </div>

                        <span className='solicitandoConta'>Não tem conta? <Link className='linkCadastreAqui' id='botaoCadastro' onClick={abrirContainerCadastro}>Cadastre-se aqui.</Link></span>
                        <div className='buttonLogarContainer'>
                            <button className='buttonLogar' onClick={fazerLogin}>Entrar</button>
                            <span id='erroLogin'></span>
                        </div>


                    </div>
                    <div className="imgLogin">
                        <img src={imageLogin} alt="imagem de um homem e uma mulher na biblioteca" />
                    </div>
                </div>

                {/* reset senha */}

                <div className="resetSenha d-none" id='resetSenha'>

                    <div className="imgEsqueciSenha">
                        <img src={imagemResetSenha} alt="imagem de um menino pensando e com dúvida" />
                    </div>
                    <div className="contentReset">
                        <button onClick={closeModalPai} className='botaoFecharModalLogin resetButtonClose'>X</button>
                        <div className="formEsqueciSenha">
                            <div className="imgTitle">
                                <img src={logo} alt="logotipo da empresa" className='imgLogo resetLogo' />
                                <h1>Esqueci minha senha</h1>
                            </div>
                            <div className="pegarEmailContainer">
                                <h3>Prezado cliente, digitar seu email para recuperação de senha</h3>
                                <Input
                                    type='email'
                                    placeholder='Email'
                                    w={[250, 350, 400]}
                                    h='48px'
                                    required
                                    id='emailRecuperarSenha'
                                    fontSize={['sm', 'md', 'lg']}
                                />
                                <span id='emailMessage'></span>
                            </div>
                            <div className="solicitarCodigoContainer">
                                <button className='linkCodigo' onClick={abrirCodigoRecuperacaoComCodigo}>Já tenho o código de redefinição</button>
                                <button className='solicitarCodigoButton' onClick={abrirCodigoRecuperacao}>Solicitar código</button>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="codigoRecuperacao d-none" id='codigoRecuperacao'>

                    <div className="imgEsqueciSenha">
                        <img src={imagemCodigoRecuperacao} alt="imagem de uma mulher com a mão na cabeça e com dúvidas" />
                    </div>
                    <div className="contentReset">
                        <button onClick={closeModalPai} className='botaoFecharModalLogin resetButtonClose'>X</button>
                        <div className="formEsqueciSenha">
                            <div className="imgTitle">
                                <img src={logo} alt="logotipo da empresa" className='imgLogo resetLogo' />
                                <h1>Informe o código de verificação</h1>
                                <p>Agora, insira o código que enviamos por e-mail para criar uma nova senha.</p>
                            </div>
                            <HStack>
                                <PinInput otp>
                                    <PinInputField value={pin1}
                                        onChange={(e) => setPin1(e.target.value)} />
                                    <PinInputField value={pin2}
                                        onChange={(e) => setPin2(e.target.value)} />
                                    <PinInputField value={pin3}
                                        onChange={(e) => setPin3(e.target.value)} />
                                    <PinInputField value={pin4}
                                        onChange={(e) => setPin4(e.target.value)} />
                                </PinInput>

                            </HStack>
                            <span id="pinMessage"></span>
                            <div className="buttonContainer">
                                <button className='buttonContainerContinuar' onClick={checkPin}>Continuar</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="trocarSenha d-none" id='trocarSenha'>

                    <div className="imgEsqueciSenha">
                        <img src={imagemRedefinirSenha} alt="imagem de uma mulher com a mão na cabeça e com dúvidas" />
                    </div>
                    <div className="contentReset">
                        <button onClick={closeModalPai} className='botaoFecharModalLogin resetButtonClose'>X</button>
                        <div className="formEsqueciSenha">
                            <div className="imgTitle">
                                <img src={logo} alt="logotipo da empresa" className='imgLogo resetLogo' />
                                <h1>Recuperação de conta</h1>
                                <p>Crie sua nova senha.</p>
                            </div>

                            <Stack spacing={4}>
                                <PasswordInput placeholder='Nova senha' id='novaSenha' />
                                <PasswordInput placeholder='Confirmar senha' id='confirmarSenhaTroca' />
                                <span id="senhaMessage"></span>
                            </Stack>

                            <div className="buttonContainer">
                                <button className='buttonContainerReenviar' id='redefinirSenha' onClick={verificarSenhasTroca}>Redefinir senha</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="trocarSenha d-none" id='senhaRedefinida'>

                    <div className="imgEsqueciSenha">
                        <img src={imagemSenhaRedefinidaComSucesso} alt="imagem de uma mulher animada" />
                    </div>
                    <div className="contentReset">
                        <button onClick={closeModalPai} className='botaoFecharModalLogin resetButtonClose'>X</button>
                        <div className="formEsqueciSenha">
                            <div className="imgTitle">
                                <img src={logo} alt="logotipo da empresa" className='imgLogo resetLogo' />
                                <h1>Senha redefinida com sucesso!</h1>
                                <p>Sua nova senha foi registrada com sucesso!</p>
                            </div>

                            <div className="buttonContainer">
                                <button className='buttonContainerReenviar' id='botaoRedefinidaComSucesso' onClick={abrirContainerLogin}>Entrar</button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* //Cadastro */}


                <div className="containerCadastro d-none" id='containerCadastro'>
                    <div className="containerLeft">
                        <img src={imageLogin} alt="imagem de um homem e uma mulher na biblioteca" className='imgCadastro' />
                    </div>
                    <div className="formCadastro">
                        <div className="textoCadastro">
                            <img src={logo} alt="logotipo da empresa" className='imgLogo' />
                            <h1>Criar Conta</h1>
                            <Stack spacing={4}>
                                <InputGroup >
                                    <Input
                                        type='text'
                                        placeholder='Nome'
                                        w={[250, 350, 400]}
                                        id='nomeCadastro'
                                        h='48px'
                                        className='inputField'
                                        fontSize={['sm', 'md', 'lg']}
                                    />
                                </InputGroup>
                                <InputGroup >
                                    <Input
                                        type='number'
                                        placeholder='Cpf'
                                        id='cpfCadastro'
                                        w={[250, 350, 400]}
                                        h='48px'
                                        className='inputField'
                                        fontSize={['sm', 'md', 'lg']}
                                    />
                                </InputGroup>
                                <InputGroup >
                                    <Input
                                        type='date'
                                        placeholder='Data de nascimento'
                                        id='dateCadastro'
                                        w={[250, 350, 400]}
                                        h='48px'
                                        className='inputField'
                                        fontSize={['sm', 'md', 'lg']}
                                    />
                                </InputGroup>
                                <PasswordInput placeholder='Senha' id='cadastroSenha' />
                                <PasswordInput placeholder='Confirmar senha' id='confirmarCadastroSenha' />
                                <span id="erroSenhaOuFaltaCampos"></span>
                            </Stack>
                        </div>
                        <button onClick={verificarCadastroDadosPessoais} className='buttonLogar'>Continuar</button>
                        <span className='loginConta'>Já tem uma conta? <Link className='linkCadastreAqui' onClick={abrirContainerLogin}>Entre aqui.</Link></span>
                    </div>
                    <button onClick={closeModalPai} className='botaoFecharModalCadastro'>X</button>
                </div>

                <div className="d-none" id='codigoValidacaoEmail'>

                    <div className="imgEsqueciSenha">
                        <img src={imagemCodigoRecuperacao} alt="imagem de uma mulher com a mão na cabeça e com dúvidas" />
                    </div>
                    <div className="contentReset">
                        <button onClick={closeModalPai} className='botaoFecharModalLogin resetButtonClose'>X</button>
                        <div className="formEsqueciSenha">
                            <div className="imgTitle">
                                <img src={logo} alt="logotipo da empresa" className='imgLogo resetLogo' />
                                <h1>Informe o código de validação</h1>
                                <p>Agora, insira o código que enviamos por e-mail para verificar se o seu e-mail existe.</p>
                            </div>

                            <Input
                                type='email'
                                placeholder='Email'
                                w={[250, 350, 400]}
                                id='emailCadastro'
                                h='48px'
                                className='inputField'
                                fontSize={['sm', 'md', 'lg']}
                            />

                            <HStack>
                                <PinInput otp>
                                    <PinInputField value={pin1Cadastro}
                                        onChange={(e) => setPin1Cadastro(e.target.value)}
                                        isInvalid={!isValidCadastro} />
                                    <PinInputField value={pin2Cadastro}
                                        onChange={(e) => setPin2Cadastro(e.target.value)}
                                        isInvalid={!isValidCadastro} />
                                    <PinInputField value={pin3Cadastro}
                                        onChange={(e) => setPin3Cadastro(e.target.value)}
                                        isInvalid={!isValidCadastro} />
                                    <PinInputField value={pin4Cadastro}
                                        onChange={(e) => setPin4Cadastro(e.target.value)}
                                        isInvalid={!isValidCadastro} />
                                </PinInput>

                            </HStack>
                            <span id="pinValidarMessage"></span>
                            <div className="buttonContainer">
                                <button className='buttonContainerReenviar' onClick={verifiqueEmail}>Enviar Código</button>
                                <button className='buttonContainerContinuar' onClick={checkPin2}>Continuar</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="containerCadastro d-none" id='containerCadastroContinuacao'>
                    <div className="containerLeft">
                        <img src={imageLogin} alt="imagem de um homem e uma mulher na biblioteca" className='imgCadastro' />
                    </div>
                    <div className="formCadastroContinuacao">
                        <div className="textoCadastro">
                            <img src={logo} alt="logotipo da empresa" className='imgLogo' />
                            <h1>Criar Conta</h1>
                            <Stack spacing={4}>
                                <Input
                                    placeholder='CEP'
                                    w={[250, 350, 400]}
                                    id='pegarCEP'
                                    h='48px'
                                    onBlur={fetchViaCep}
                                    className='inputField'
                                    fontSize={['sm', 'md', 'lg']}
                                />
                                <Select placeholder='Estado' height='48px' color="#9F9898" id='selectEstado' disabled>
                                    <option value='AC'>Acre</option>
                                    <option value='AL'>Alagoas</option>
                                    <option value='AP'>Amapá</option>
                                    <option value='AM'>Amazonas</option>
                                    <option value='BA'>Bahia</option>
                                    <option value='CE'>Ceará</option>
                                    <option value='DF'>Distrito Federal</option>
                                    <option value='ES'>Espírito Santo</option>
                                    <option value='GO'>Goiás</option>
                                    <option value='MA'>Maranhão</option>
                                    <option value='MT'>Mato Grosso</option>
                                    <option value='MS'>Mato Grosso do Sul</option>
                                    <option value='MG'>Minas Gerais</option>
                                    <option value='PA'>Pará</option>
                                    <option value='PB'>Paraíba</option>
                                    <option value='PR'>Paraná</option>
                                    <option value='PE'>Pernambuco</option>
                                    <option value='PI'>Piauí</option>
                                    <option value='RJ'>Rio de Janeiro</option>
                                    <option value='RN'>Rio Grande do Norte</option>
                                    <option value='RS'>Rio Grande do Sul</option>
                                    <option value='RO'>Rondônia</option>
                                    <option value='RR'>Roraima</option>
                                    <option value='SC'>Santa Catarina</option>
                                    <option value='SP'>São Paulo</option>
                                    <option value='SE'>Sergipe</option>
                                    <option value='TO'>Tocantins</option>
                                </Select>

                                <Input
                                    placeholder='Cidade'
                                    w={[250, 350, 400]}
                                    id='pegarCidade'
                                    h='48px'
                                    disabled
                                    className='inputField'
                                    fontSize={['sm', 'md', 'lg']}
                                />

                                <Input
                                    placeholder='Bairro'
                                    w={[250, 350, 400]}
                                    h='48px'
                                    id='pegarBairro'
                                    disabled
                                    className='inputField'
                                    fontSize={['sm', 'md', 'lg']}
                                />

                                <Input
                                    placeholder='Logradouro'
                                    w={[250, 350, 400]}
                                    id='pegarLogradouro'
                                    h='48px'
                                    disabled
                                    className='inputField'
                                    fontSize={['sm', 'md', 'lg']}
                                />

                                <div className='containerTermos'>
                                    <p className='termos'>Li e concordo com os termos & politicas</p>
                                    <Checkbox colorScheme='gray' className='opcaoChecagem' id='opcaoChecagem'></Checkbox>
                                </div>
                                <span id="erroEndereco"></span>
                            </Stack>
                        </div>
                        <button className='buttonLogar' onClick={pegarEnderecosDados}>Entrar</button>
                    </div>
                    <button onClick={validarEmail} className='botaoFecharModalCadastro'>back</button>
                    <button onClick={closeModalPai} className='botaoFecharModalCadastro'>X</button>
                </div>

                {/* Categoria Preferida */}

                <div className="containerCategoria d-none" id='containerCadastroCategoria'>
                    <div className="containerLeft">
                        <img src={imageLogin} alt="imagem de um homem e uma mulher na biblioteca" className='imgCadastro' />
                    </div>
                    <div className="formCategoria">
                        <img src={logo} alt="logotipo da empresa" className='imgLogo' />
                        <p className='textoCategoria'>Por último, para uma melhor interação selecione algumas categorias que interessam você</p>
                        <h1 className='titleCategoria'>Categorias</h1>
                        <div className='categorias' id='categorias'>
                            {/* <div className='buttonCategoria'>
                                Teologia
                            </div> */}
                        </div>
                        <button className='buttonLogar' onClick={enviarCategoriasFavoritasDoUsuario}>Entrar</button>
                    </div>
                    <button onClick={closeModalPai} className='botaoFecharModalCadastro'>X</button>
                </div>

            </div>



            <div className="headerLinksContainer">
                <img src={logo} alt="logotipo da empresa" className='logo' />
                <nav>
                    <ul>
                        <li><Link to='/' className='link'>Home</Link></li>
                        {/* <li><Link to='/anuncios' className='link'> Anúncios Próximos</Link></li> */}
                        <li><Link to='/anunciar' className='link'>Quero anunciar</Link></li>
                    </ul>
                </nav>
                <div className='userMenuContainer'>
                    <div className='divborda'></div>
                    <div className="userMenu grid-colun2" id='userMenu'>
                        <button className='userProfileButton d-flex' id='botaoLogin' onClick={openModalPai} ><img src={userProfile} alt="icone de pessoa" className='imgHeader' /> <span>Entrar</span></button>

                        <div className='userMenuIcons'>
                            <Link to='/perfil' className='d-none' id='userProfileButton'><img src={userProfile} alt="icone de pessoa" id='iconeDePessoa'/></Link>
                            <Link to='/favoritos' className='link'><img src={userFavorites} alt="icone de coração para ver os favoritos" className='imgHeader' /></Link>
                            <Link to='/chat' className='link'><img src={userChats} alt="icone de chat para ver os chats enviados" className='imgHeader' /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Header