import React, { useState,  useEffect  } from 'react';
import { Link } from "react-router-dom";
import imagemCarrinho from './img/carrinho.png';
import imagemCoracaoPreenchido from './img/coracaoPreenchido.png';
import imagemCoracao from './img/coracaoIcon.png';
import { baseUrl } from "../url";

function AnuncioCardAnunciante({ anuncio, autor, tipo, cidade, estado , foto}) {


  const [coracaoPreenchido, setCoracaoPreenchido] = useState(false);

  const  anuncioId = anuncio.id
  const idUser = localStorage.getItem('id_usuarioLogin')


  const despreencher = () => {
    setCoracaoPreenchido(false);

    const url = `${baseUrl}v1/sbook/remover-favorito/${idUser}/${anuncioId}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {

        console.log(data);

      })
      .catch(error => {
        console.error("Erro ao desfavoritar:", error);
      });


  }

  useEffect(() => {
    if (idUser && anuncioId) {
      const url = `${baseUrl}v1/sbook/verificar-favorito/${idUser}/${anuncioId}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) {
            setCoracaoPreenchido(true);
          }
        })
        .catch(error => {
          console.error("Erro ao verificar favorito:", error);
        });
    }
  }, [idUser, anuncioId]);

  const preencher = () => {
    setCoracaoPreenchido(true);

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
        //console.log(data);

      })
      .catch(error => {
        console.error("Erro ao favoritar:", error);
        alert('para favoritar um anuncio, se logue primeiro')
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
          {cidade}, {estado}
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

export default AnuncioCardAnunciante;