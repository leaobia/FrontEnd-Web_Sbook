import React from 'react';
import { Link } from "react-router-dom";
import imagemCarrinho from './img/carrinho.png';

function AnuncioCard({ anuncio }) {
  return (
    <div className="personagem-card">
      <img src={anuncio.foto} alt={anuncio.nome} />
      <div className='sobreLivro'>
        <h2>{anuncio.nome}</h2>
        <p>Status: {anuncio.status_anuncio ? 'Disponível' : 'Indisponível'}</p>
        <p>Edição: {anuncio.edicao}</p>
        <p>Descrição: {anuncio.descricao}</p>
        {/* Adicione outras informações relevantes aqui */}
      </div>
      <Link to='/livro' className='botaoLinkLivro'>
        <button className='botaoContainer'>Comprar <img src={imagemCarrinho} alt='icone de carrinho' /></button>
      </Link>
    </div>
  );
}

export default AnuncioCard;
