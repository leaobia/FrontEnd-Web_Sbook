import React, { useState } from 'react';
import { Link } from "react-router-dom";
import imagemCarrinho from './img/carrinho.png';
import imagemCoracaoPreenchido from './img/coracaoPreenchido.png';

function AnuncioCardFav({ anuncio, autor, tipo, cidade, estado , foto}) {

  return (
    <div className="personagem-card">
      <img src={foto} alt={anuncio.nome} className='imgLivro' />
      <div className='sobreLivro'>
        <h2>{anuncio.nome_livro}</h2>
        <div className="autorAno">
          <p>{autor}</p>
          <p className='dataLancamento'>{anuncio.ano_lancamento}</p>
        </div>
        <p>{tipo.tipo}</p>
      </div>
      <Link to='/livro' className='botaoLinkLivro'>
        <button className='botaoContainer'>Comprar <img src={imagemCarrinho} alt='icone de carrinho' /></button>
      </Link>
      <div className="containerEnderecoFav">
        <p>
          {cidade}, {estado}
        </p>
        <div className="coracoesFav">
            <button><img src={imagemCoracaoPreenchido} alt='coração preenchido' /></button>
        </div>
      </div>
    </div>
  );
}

export default AnuncioCardFav;