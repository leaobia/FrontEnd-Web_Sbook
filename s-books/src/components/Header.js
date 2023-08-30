
import logo from './Logo.png';
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
                    <li><Link to='/doacoes' className='link'>Doacoes</Link></li>
                    </ul>
                </nav>
                <div className="userMenu">
                    <span>Nada por enquanto</span>
                </div>
            </div>
        </div>
    )
}

export default Header