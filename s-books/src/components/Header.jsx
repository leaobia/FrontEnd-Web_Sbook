
import logo from './Logo.png';
import imageLogin from './img/imagemLogin.png'
import userProfile from './Vector.png'
import userFavorites from './coracao.png'
import userChats from './chat.png'

import './css/Header.css'

import { Link } from "react-router-dom"

import './css/Login.css'

function Header() {

    function openModal(){
        document.getElementById('loginModal').classList.add('d-flex')
        document.getElementById('loginModal').classList.remove('d-none')
    }

    return (


        <div className="Header">

            <div className='loginModal d-none' id='loginModal'>
                <div className="containerLogin">
                    <div className="form">
                        <img src={logo} alt="logotipo da empresa" />
                    </div>
                    <div className="imgLogin">
                        <img src={imageLogin} alt="imagem de um homem e uma mulher na biblioteca" />
                    </div>
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
                        <button className='userProfileButton' id='botaoLogin' onClick={openModal}><img src={userProfile} alt="icone de pessoa" /> <span>Entrar</span></button>
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