//import React, { useState } from 'react';
import { Link } from "react-router-dom";
import imagemCarrinho from './img/carrinho.png';
import imagemCoracaoPreenchido from './img/coracaoPreenchido.png';
//import imagemCoracao from './img/coracaoIcon.png';
import { baseUrl } from "../url";

function AnuncioCardFav({ anuncio, autor, tipo, cidade, estado , foto}) {


  const  anuncioId = anuncio.id
  const idUser = localStorage.getItem('id_usuarioLogin')

  const despreencher = () => {
    const dados = {
      id_usuario: parseInt(idUser),
      id_anuncio: anuncioId
  };

  console.log(dados);

  const url = `${baseUrl}v1/sbook/remover-favorito`;

        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })
            .then(response => response.json())
            .then(data => {

                console.log(data);
                window.location.reload()

            })
            .catch(error => {
                console.error("Erro ao desfavoritar:", error);
            });
  }

  return (
    /*<div className="personagem-card">
      <img src={foto} alt={anuncio.nome} className='imgLivro' />
      <div className='sobreLivro'>
        <h2>{anuncio.nome}</h2>
        <div className="autorAno">
          <p>{autor}</p>
          <p className='dataLancamento'>{anuncio.ano_lancamento}</p>
        </div>
        <p className='tipo'>{tipo.tipo === 'Doação' ? tipo.tipo :
              tipo.tipo === 'Troca' ? tipo.tipo : 'R$ ' + anuncio.preco}</p>
      </div>
      <Link to='/livro' className='botaoLinkLivro'>
        <button className='botaoContainer'>Comprar <img src={imagemCarrinho} alt='icone de carrinho' /></button>
      </Link>
      <div className="containerEnderecoFav">
        <p>
          {cidade}, {estado}
        </p>
        <div className="coracoesFav">
            <button id='coracaoFav' onClick={despreencher}><img src={imagemCoracaoPreenchido} alt='coração preenchido' id='corPreenchido' /></button>
        </div>
      </div>
    </div>*/
    <div className="card-favorito">
        <img src={foto} alt={anuncio.nome} className='img-livro_favorito' />
        <div className="container-conteudo">
          <div>
          <h2 className="nome_favorito">{anuncio.nome}</h2>
            <div className="autorAno">
              <p>{autor}</p>
              <p className='dataLancamento'>{anuncio.ano_lancamento}</p>
            </div>
          </div>
            <div>
                <p className='tipo_favorito'>{tipo.tipo === 'Doação' ? tipo.tipo : tipo.tipo === 'Troca' ? tipo.tipo : 'R$ ' + anuncio.preco}</p>
                <Link to='/livro' className='botaoLinkLivro_favorito'>
                  <button className='botaoContainer_favorito'>Comprar <img src={imagemCarrinho} alt='icone de carrinho' /></button>
                  <div className="coracoesFav">
                      <button id='coracaoFav' onClick={despreencher}><img src={imagemCoracaoPreenchido} alt='coração preenchido' id='corPreenchido' /></button>
                  </div>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default AnuncioCardFav;