import React from 'react';

import { Link } from "react-router-dom"   
import imagemCarrinho from './img/carrinho.png'

function PersonagemCard({ personagem }) {
  return (
    <div className="personagem-card">
      <img src={personagem.image} alt={personagem.name} />
      <div className='sobreLivro'>
      <h2>{personagem.name}</h2>
      <p>Status: {personagem.status}</p>
      <p>Espécie: {personagem.species}</p>
      </div>
      <Link to= '/livro' className='botaoLinkLivro'><button className='botaoContainer'>Comprar <img src={imagemCarrinho} alt='icone de carrinho' /></button></Link>
    </div>
  );
}

export default PersonagemCard;
