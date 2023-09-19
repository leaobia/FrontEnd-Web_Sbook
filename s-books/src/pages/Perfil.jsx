import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import iconSidebar from '../components/img/sidebarClick.png'
import '../components/css/Perfil.css'

function Perfil() {
    const [visibleLeft, setVisibleLeft] = useState(false);
    return (
        <div className="meuPerfi">
            <div className="sideBarContainer">
            <button className='botaoMenu' onClick={() => setVisibleLeft(true)}><img src={iconSidebar} alt='ícone do botao de menu' /></button>
                <Sidebar className='sideBar' visible={visibleLeft} position="left" onHide={() => setVisibleLeft(false)}>
                    oi
            </Sidebar>
            </div>
        </div>
    )
}

export default Perfil