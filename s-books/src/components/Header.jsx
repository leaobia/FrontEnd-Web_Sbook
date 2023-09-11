
import logo from './img/Logo.png';
import imageLogin from './img/imagemLogin.png'
import userProfile from './img/Vector.png'
import userFavorites from './img/coracao.png'
import userChats from './img/chat.png'
import imagemResetSenha from './img/imagemResetSenha.png'
import imagemSenhaRedefinidaComSucesso from './img/redefinidacomsucesso.png'
import imagemCodigoRecuperacao from './img/imgCodigoDeRecuperacao.png'
import imagemRedefinirSenha from './img/recuperarContaimg.png'
import imagemGoogle from './img/google.png'
import imagemFacebook from './img/facebook.png'


import PasswordInput from './PasswordInput';

import { Input, Stack, InputGroup, InputRightElement, HStack, Checkbox } from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react'

import { EmailIcon } from '@chakra-ui/icons';
import { Select } from '@chakra-ui/react'

import React, { useState } from 'react';


import './css/Header.css'

import { Link } from "react-router-dom"

import './css/Login.css'

import './css/Cadastro.css'

import './css/Reset.css'

var emailMessage;

function Header() {

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

        showElement('modalPai');
        hideElement('containerCadastro');
        showElement('containerLogin');
        hideElement('resetSenha');
        hideElement('trocarSenha');
        hideElement('senhaRedefinida');
        hideElement('codigoRecuperacao');
        hideElement('containerCadastroContinuacao');
    }

    function abrirContainerCadastro() {
        hideElement('containerLogin');
        hideElement('resetSenha');
        hideElement('trocarSenha');
        hideElement('senhaRedefinida');
        hideElement('containerCadastroContinuacao');
        showElement('containerCadastro');
    }

    function abrirContainerCadastroContinuacao() {
        hideElement('containerCadastro');
        showElement('containerCadastroContinuacao');
        hideElement('containerLogin');
        hideElement('trocarSenha');
        hideElement('senhaRedefinida');
        hideElement('resetSenha');
    }

    function abrirContainerLogin() {
        hideElement('containerCadastro');
        showElement('containerLogin');
        hideElement('trocarSenha');
        hideElement('senhaRedefinida');
        hideElement('resetSenha');
    }

    function abrirContainerResetSenha() {
        showElement('resetSenha');
        hideElement('containerCadastro');
        hideElement('trocarSenha');
        hideElement('senhaRedefinida');
        hideElement('containerLogin');
    }

    function abrirCodigoRecuperacao() {
        const emailInput = document.getElementById('emailRecuperarSenha').value;

        if (emailInput) {
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if (emailRegex.test(emailInput)) {
                hideElement('containerLogin');
                hideElement('resetSenha');
                hideElement('containerCadastro');
                hideElement('trocarSenha');
                hideElement('senhaRedefinida');
                showElement('codigoRecuperacao');
            } else {
                emailMessage = 'Por favor, insira um endereço de e-mail válido.'
            }
        } else {
            emailMessage = 'Por favor, insira um endereço de e-mail válido.'
        }
    }

    function abrirTrocarSenha() {
        hideElement('containerLogin');
        hideElement('resetSenha');
        hideElement('containerCadastro');
        hideElement('codigoRecuperacao');
        hideElement('senhaRedefinida');
        showElement('trocarSenha');
    }

    function abrirSenhaRedefinidaComSucesso() {
        hideElement('containerLogin');
        hideElement('resetSenha');
        hideElement('containerCadastro');
        hideElement('codigoRecuperacao');
        hideElement('trocarSenha');
        showElement('senhaRedefinida');
    }

    function closeModalPai() {
        document.getElementById('body').classList.add('overflow-auto');
        document.getElementById('body').classList.remove('overflow-hidden');
        hideElement('modalPai');
    }

    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');
    const [isValid, setIsValid] = useState(true);

    const checkPin = () => {
        const correctPin = ['1', '2', '3', '4'];
        const enteredPin = [pin1, pin2, pin3, pin4];
        const isPinValid = enteredPin.every((value, index) => value === correctPin[index]);

        setIsValid(isPinValid);

        if (isPinValid) {
            abrirTrocarSenha();
        } else {
            alert('PIN inválido');
        }
    };

    function verificarSenhasTroca() {
        const inputNovaSenha = document.getElementById('novaSenha').value;
        const inputNovaSenhaConfirmar = document.getElementById('confirmarSenhaTroca').value;

        if (inputNovaSenha === inputNovaSenhaConfirmar) {
            abrirSenhaRedefinidaComSucesso();
        } else {
            alert('Senhas diferentes');
        }
    }

    return (


        <div className="Header">

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
                                        fontSize={['sm', 'md', 'lg']}
                                    />
                                </InputGroup>
                                <PasswordInput placeholder='Senha' />
                                <button className='forgotPassword' onClick={abrirContainerResetSenha}>Esqueci a senha</button>
                            </Stack>
                        </div>

                        <span className='solicitandoConta'>Não tem conta? <Link className='linkCadastreAqui' id='botaoCadastro' onClick={abrirContainerCadastro}>Cadastre-se aqui.</Link></span>
                        <button className='buttonLogar'>Entrar</button>

                    </div>
                    <div className="imgLogin">
                        <img src={imageLogin} alt="imagem de um homem e uma mulher na biblioteca" />
                    </div>
                </div>

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
                                <span></span>
                            </div>
                            <div className="solicitarCodigoContainer">
                                <Link className='linkCodigo'>Já tenho o código de redefinição</Link>
                                <button onClick={abrirCodigoRecuperacao}>Solicitar código</button>
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
                                        onChange={(e) => setPin1(e.target.value)}
                                        isInvalid={!isValid} />
                                    <PinInputField value={pin2}
                                        onChange={(e) => setPin2(e.target.value)}
                                        isInvalid={!isValid} />
                                    <PinInputField value={pin3}
                                        onChange={(e) => setPin3(e.target.value)}
                                        isInvalid={!isValid} />
                                    <PinInputField value={pin4}
                                        onChange={(e) => setPin4(e.target.value)}
                                        isInvalid={!isValid} />
                                </PinInput>
                            </HStack>
                            <div className="buttonContainer">
                                <button className='buttonContainerContinuar' onClick={checkPin}>Continuar</button>
                                <button className='buttonContainerReenviar'>Reenviar Código</button>
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
                                        h='48px'
                                        className='inputField'
                                        fontSize={['sm', 'md', 'lg']}
                                    />
                                </InputGroup>
                                <InputGroup >
                                    <Input
                                        type='number'
                                        placeholder='Cpf'
                                        w={[250, 350, 400]}
                                        h='48px'
                                        className='inputField'
                                        fontSize={['sm', 'md', 'lg']}
                                    />
                                </InputGroup>
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
                                        fontSize={['sm', 'md', 'lg']}
                                    />
                                </InputGroup>
                                <InputGroup >
                                    <Input
                                        type='date'
                                        placeholder='Data de nascimento'
                                        w={[250, 350, 400]}
                                        h='48px'
                                        className='inputField'
                                        fontSize={['sm', 'md', 'lg']}
                                    />
                                </InputGroup>
                                <PasswordInput placeholder='Senha' />
                                <PasswordInput placeholder='Confirmar senha' />
                            </Stack>
                        </div>
                        <button onClick={abrirContainerCadastroContinuacao} className='buttonLogar'>Continuar</button>
                        <span className='loginConta'>Já tem uma conta? <Link className='linkCadastreAqui' onClick={abrirContainerLogin}>Entre aqui.</Link></span>
                    </div>
                    <button onClick={closeModalPai} className='botaoFecharModalCadastro'>X</button>
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
                                    type='number'
                                    placeholder='CEP'
                                    w={[250, 350, 400]}
                                    h='48px'
                                    className='inputField'
                                    fontSize={['sm', 'md', 'lg']}
                                />
                                <Select placeholder='Estado' height='48px' color="#9F9898">
                                    <option value='option1'>São Paulo</option>
                                    <option value='option2'>Rio de Janeiro</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                    <option value='option3'>Amazonas</option>
                                </Select>
                                <Select placeholder='Cidade' height='48px' color="#9F9898">
                                    <option value='option1'>São Paulo</option>
                                    <option value='option2'>Barueri</option>
                                    <option value='option3'>Carapicuíba</option>
                                </Select>
                                <Select placeholder='Bairro' height='48px' color="#9F9898">
                                    <option value='option1'>São Paulo</option>
                                    <option value='option2'>Barueri</option>
                                    <option value='option3'>Carapicuíba</option>
                                </Select>
                                <Select placeholder='Logradouro' height='48px' color="#9F9898">
                                    <option value='option1'>São Paulo</option>
                                    <option value='option2'>Barueri</option>
                                    <option value='option3'>Carapicuíba</option>
                                </Select>
                                <div className='containerContinue'>
                                    <div className='linha'></div>
                                    Ou continue com
                                    <div className='linha'></div>
                                </div>
                                <div className='buttons'>
                                    <div className='containerButton'>
                                        <div className='contentButton'>
                                            <img src={imagemGoogle} alt='Logo do google' />
                                            Google
                                        </div>
                                    </div>
                                    <div className='containerButton'>
                                        <div className='contentButton'>
                                            <img src={imagemFacebook} alt='Logo do facebook' />
                                            Facebook
                                        </div>
                                    </div>
                                </div>
                                <div className='containerTermos'>
                                    <p className='termos'>Li e concordo com os termos & politicas</p>
                                    <Checkbox colorScheme='gray'  className='opcaoChecagem'></Checkbox>
                                </div>
                            </Stack>
                        </div>
                        <button className='buttonLogar'>Entrar</button>
                    </div>
                    <button onClick={closeModalPai} className='botaoFecharModalCadastro'>X</button>
                </div>

            </div>

            <div className="headerLinksContainer">
                <img src={logo} alt="logotipo da empresa" className='logo' />
                <nav>
                    <ul>
                        <li><Link to='/' className='link'>Home</Link></li>
                        <li><Link to='/anuncios' className='link'> Anúncios</Link></li>
                        <li><Link to='/anunciar' className='link'>Quero anunciar</Link></li>
                    </ul>
                </nav>
                <div className='userMenuContainer'>
                    <div className='divborda'></div>
                    <div className="userMenu">
                        <button className='userProfileButton' id='botaoLogin' onClick={openModalPai}><img src={userProfile} alt="icone de pessoa" className='imgHeader' /> <span>Entrar</span></button>
                        <div className='userMenuIcons'>
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