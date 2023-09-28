import React, { useState } from 'react';
import { Link } from "react-router-dom";
import imagemCarrinho from './img/carrinho.png';
import imagemCoracao from './img/coracaoIcon.png';
import imagemCoracaoPreenchido from './img/coracaoPreenchido.png';

function AnuncioCard({ anuncio, autor, tipo, endereco , foto}) {

      //const baseUrl = 'https://app-nodejs.cyclic.cloud/'
      const baseUrl = 'http://10.107.144.7:8080/'


  const [coracaoPreenchido, setCoracaoPreenchido] = useState(false);

  //let coracoes = []
  const valorAtualCoracao = coracaoPreenchido;

  const  anuncioId = anuncio.id
  const idUser = localStorage.getItem('id_usuarioLogin')

  const preencher = () => {
    setCoracaoPreenchido(true);
    
  }

  const despreencher = () => {
    setCoracaoPreenchido(false);
  }


  if(valorAtualCoracao === true){

    const dados = {
      id_usuario: idUser,
      id_anuncio: anuncioId
  };

  const url = `${baseUrl}v1/sbook/favoritar-anuncio`;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

            })
            .catch(error => {
                console.error("Erro ao favoritar:", error);
            });
    
  }


  if(valorAtualCoracao === false){
    
    const dados = {
      id_usuario: idUser,
      id_anuncio: anuncioId
  };

  const url = `${baseUrl}v1/sbook/remover-favorito`;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })
            .then(response => response.json())
            .then(data => {

                console.log(data);

            })
            .catch(error => {
                console.error("Erro ao favoritar:", error);
            });
    
  }



  return (
    <div className="personagem-card">
      <img src={foto} alt={anuncio.nome} className='imgLivro' />
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


