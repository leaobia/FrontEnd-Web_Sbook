
import logo from './img/Logo.png';
import imageLogin from './img/imagemLogin.png'
import userProfile from './img/Vector.png'
import userFavorites from './img/coracao.png'
import userChats from './img/chat.png'
import PasswordInput from './PasswordInput';

import { Input, Stack, InputGroup, InputRightElement} from '@chakra-ui/react';
import PasswordConfirmInput from './PasswordConfirmInput';
import { EmailIcon } from '@chakra-ui/icons';

import './css/Header.css'

import { Link } from "react-router-dom"

import './css/Login.css'

import './css/Cadastro.css'

function Header() {

    function openModalPai(){
        document.getElementById('modalPai').classList.remove('d-none')
        document.getElementById('modalPai').classList.add('d-flex')

        document.getElementById('containerCadastro').classList.add('d-none')
        document.getElementById('containerCadastro').classList.remove('d-flex')

        document.getElementById('containerLogin').classList.remove('d-none')
        document.getElementById('containerLogin').classList.add('d-flex')
    }

    function abrirContainerCadastro(){
        document.getElementById('containerLogin').classList.remove('d-flex')
        document.getElementById('containerLogin').classList.add('d-none')

        document.getElementById('containerCadastro').classList.remove('d-none')
        document.getElementById('containerCadastro').classList.add('d-flex')
    }

    function abrirContainerLogin(){
        document.getElementById('containerCadastro').classList.remove('d-flex')
        document.getElementById('containerCadastro').classList.add('d-none')

        document.getElementById('containerLogin').classList.remove('d-none')
        document.getElementById('containerLogin').classList.add('d-flex')
    }

    function closeModalPai(){
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
                                <Link className='forgotPassword'>Esqueci a senha</Link>
                            </Stack>
                        </div>

                        <span className='solicitandoConta'>Não tem conta? <Link className='linkCadastreAqui' id='botaoCadastro' onClick={abrirContainerCadastro}>Cadastre-se aqui.</Link></span>
                        <button className='buttonLogar'>Entrar</button>

                    </div>
                    <div className="imgLogin">
                        <img src={imageLogin} alt="imagem de um homem e uma mulher na biblioteca" />
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
                        <button className='userProfileButton' id='botaoLogin' onClick={openModalPai}><img src={userProfile} alt="icone de pessoa" /> <span>Entrar</span></button>
                        <div className='userMenuIcons'>
                            <Link to='/favoritos' className='link'><img src={userFavorites} alt="icone de coração para ver os favoritos" /></Link>
                            <Link to='/chat' className='link'><img src={userChats} alt="icone de chat para ver os chats enviados" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    )
}

export default Header