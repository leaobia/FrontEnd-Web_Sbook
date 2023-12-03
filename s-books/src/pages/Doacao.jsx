import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import SecaoLivroDoacao from '../components/SecaoLivroDoacao';
import '../components/css/Home.css'

function Doacao() {
    
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [anunciosFiltrados, setAnunciosFiltrados] = useState([]);
  
    let idUsuario = localStorage.getItem('id_usuarioLogin')
    let nomeBemVindo = '';
  
    if (nomeUsuario) {
      nomeBemVindo = nomeUsuario
    } else {
      nomeBemVindo = 'Usuário'
    }
  
    const [mostrarMais, setMostrarMais] = useState(false);
  
    return (
      <div className="Home">
        <div className="welcome-group">
        </div>
        <div className="apresentacaoLivros">
          <p>Doações</p>
        </div>
        <SecaoLivroDoacao />
        <Footer />
      </div>
    );

}

export default Doacao