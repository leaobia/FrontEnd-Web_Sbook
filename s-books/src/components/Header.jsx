
import logo from './img/Logo.png';
import imageLogin from './img/imagemLogin.png'
import userProfile from './img/Vector.png'
import userFavorites from './img/coracao.png'
import userChats from './img/chat.png'
import imagemResetSenha from './img/imagemResetSenha.png'
import imagemCodigoRecuperacao from './img/imgCodigoDeRecuperacao.png'
import PasswordInput from './PasswordInput';

import { Input, Stack, InputGroup, InputRightElement , HStack} from '@chakra-ui/react';
import { PinInput, PinInputField } from '@chakra-ui/react'
import PasswordConfirmInput from './PasswordConfirmInput';
import { EmailIcon } from '@chakra-ui/icons';


import './css/Header.css'

import { Link } from "react-router-dom"

import './css/Login.css'

import './css/Cadastro.css'

import './css/Reset.css'

function Header() {

    function openModalPai() {


        document.getElementById('body').classList.remove('overflow-auto')
        document.getElementById('body').classList.add('overflow-hidden')

        document.getElementById('modalPai').classList.remove('d-none')
        document.getElementById('modalPai').classList.add('d-flex')

        document.getElementById('containerCadastro').classList.add('d-none')
        document.getElementById('containerCadastro').classList.remove('d-flex')

        document.getElementById('containerLogin').classList.remove('d-none')
        document.getElementById('containerLogin').classList.add('d-flex')

        document.getElementById('resetSenha').classList.remove('d-flex')
        document.getElementById('resetSenha').classList.add('d-none')

        document.getElementById('codigoRecuperacao').classList.remove('d-flex')
        document.getElementById('codigoRecuperacao').classList.add('d-none')
    }

    function abrirContainerCadastro() {
        document.getElementById('containerLogin').classList.remove('d-flex')
        document.getElementById('containerLogin').classList.add('d-none')


        document.getElementById('resetSenha').classList.remove('d-flex')
        document.getElementById('resetSenha').classList.add('d-none')

        document.getElementById('containerCadastro').classList.remove('d-none')
        document.getElementById('containerCadastro').classList.add('d-flex')
    }

    function abrirContainerLogin() {
        document.getElementById('containerCadastro').classList.remove('d-flex')
        document.getElementById('containerCadastro').classList.add('d-none')

        document.getElementById('containerLogin').classList.remove('d-none')
        document.getElementById('containerLogin').classList.add('d-flex')

        document.getElementById('resetSenha').classList.remove('d-flex')
        document.getElementById('resetSenha').classList.add('d-none')
    }

    function abrirContainerResetSenha() {
        document.getElementById('resetSenha').classList.remove('d-none')
        document.getElementById('resetSenha').classList.add('d-flex')

        document.getElementById('containerCadastro').classList.remove('d-flex')
        document.getElementById('containerCadastro').classList.add('d-none')

        document.getElementById('containerLogin').classList.remove('d-flex')
        document.getElementById('containerLogin').classList.add('d-none')
    }

    function abrirCodigoRecuperacao() {

        const emailInput = document.getElementById('emailRecuperarSenha').value;


        if (emailInput) {

            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if (emailRegex.test(emailInput)) {

                document.getElementById('containerLogin').classList.remove('d-flex');
                document.getElementById('containerLogin').classList.add('d-none');

                document.getElementById('resetSenha').classList.remove('d-flex');
                document.getElementById('resetSenha').classList.add('d-none');

                document.getElementById('containerCadastro').classList.remove('d-flex');
                document.getElementById('containerCadastro').classList.add('d-none');

                document.getElementById('codigoRecuperacao').classList.add('d-flex');
                document.getElementById('codigoRecuperacao').classList.remove('d-none');
            } else {
                alert('Por favor, insira um endereço de e-mail válido.');
            }
        } else {
            alert('Por favor, preencha o campo de e-mail.');
        }
    }


    function closeModalPai() {


        document.getElementById('body').classList.add('overflow-auto')
        document.getElementById('body').classList.remove('overflow-hidden')

        document.getElementById('modalPai').classList.remove('d-flex')
        document.getElementById('modalPai').classList.add('d-none')
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
                                <PasswordInput />
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
                            </div>
                            <HStack>
                                <PinInput otp>
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                </PinInput>
                            </HStack>
                            <div className="buttonContainer">
                                    <button className='buttonContainerContinuar'>Continuar</button>
                                    <button className='buttonContainerReenviar'>Reenviar Código</button>
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
                                <PasswordInput />
                                <PasswordConfirmInput />
                            </Stack>
                        </div>
                        <button className='buttonLogar'>Entrar</button>
                        <span className='loginConta'>Já tem uma conta? <Link className='linkCadastreAqui' id='botaoCadastro' onClick={abrirContainerLogin}>Entre aqui.</Link></span>
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