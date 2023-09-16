import React from 'react';
import { Link } from "react-router-dom";
import imagemCarrinho from './img/carrinho.png';

function AnuncioCard({ anuncio, autor, tipo }) {
  return (
    <div className="personagem-card">
      <img src={anuncio.foto} alt={anuncio.nome} className='imgLivro' />
      <div className='sobreLivro'>
        <h2>{anuncio.nome}</h2>
        <div className="autorAno">
        <p>{autor}</p> 
        <p className='dataLancamento'>{anuncio.ano_lancamento}</p>
        </div>
       <p>{tipo}</p>
      </div>
      <Link to='/livro' className='botaoLinkLivro'>
        <button className='botaoContainer'>Comprar <img src={imagemCarrinho} alt='icone de carrinho' /></button>
      </Link>
    </div>
  );
}

export default AnuncioCard;

