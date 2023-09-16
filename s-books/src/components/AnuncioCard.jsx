import React, { useState } from 'react';
import { Link } from "react-router-dom";
import imagemCarrinho from './img/carrinho.png';
import imagemCoracao from './img/coracaoIcon.png';
import imagemCoracaoPreenchido from './img/coracaoPreenchido.png';

function AnuncioCard({ anuncio, autor, tipo, endereco }) {
  const [coracaoPreenchido, setCoracaoPreenchido] = useState(false);

  const preencher = () => {
    setCoracaoPreenchido(true);
  }

  const despreencher = () => {
    setCoracaoPreenchido(false);
  }

  return (
    <div className="personagem-card">
      <img src={anuncio.foto} alt={anuncio.nome} className='imgLivro' />
      <div className='sobreLivro'>
        <h2>{anuncio.nome}</h2>
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
          {endereco.cidade}, {endereco.estado}
        </p>
        <div className="coracoesFav">
          {coracaoPreenchido ? (
            <button onClick={despreencher}><img src={imagemCoracaoPreenchido} alt='coração preenchido' /></button>
          ) : (
            <button onClick={preencher}><img src={imagemCoracao} alt='coração vazio' /></button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnuncioCard;


