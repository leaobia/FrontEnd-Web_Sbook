
import logo from './Logo.png';
import userProfile from './Vector.png'
import userFavorites from './coracao.png'
import userChats from './chat.png'

import './Header.css'
import { Link } from "react-router-dom"       

function Header() {
    return (
        <div className="Header">
            <div className="headerLinksContainer">
                <img src={logo} alt="logotipo da empresa" />
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
                    <Link to='/login' className='link'><button className='userProfileButton'><img src={userProfile} alt="icone de pessoa" /> <span>Entrar</span></button></Link>
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