import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import imagemCarrinho from './img/carrinho.png';
import imagemCoracao from './img/coracaoIcon.png';
import imagemCoracaoPreenchido from './img/coracaoPreenchido.png';
import { baseUrl } from '../url';



function AnuncioCard({ anuncio, autor, tipo, endereco, foto }) {


  const [coracaoPreenchido, setCoracaoPreenchido] = useState(false);

  //const valorAtualCoracao = coracaoPreenchido;

  const anuncioId = anuncio.id
  
  const idUser = localStorage.getItem('id_usuarioLogin')


   const pegarIdAnuncio = () => {
    const idAnuncio = anuncio.id
    localStorage.setItem('getAnuncioById', idAnuncio)
    console.log(anuncioId);
   }
 

  const preencher = () => {

    if(idUser){
      setCoracaoPreenchido(true);
    }else{
      document.getElementById('botaoLogin').click()
      document.body.scrollTop = 0; // Para navegadores da web
    document.documentElement.scrollTop = 0; // Para o Internet Explorer, Firefox, Chrome, etc.
    }

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

  const despreencher = () => {
    setCoracaoPreenchido(false);

    // const dados = {
    //   id_usuario: idUser,
    //   id_anuncio: anuncioId
    // };

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

  return (
    <div className="personagem-card">
      <div className="imgLivro">
        <img src={foto} alt={anuncio.nome} />
      </div>

      <div className='sobreLivro'>
        <h2>{anuncio.nome}</h2>
        <div className="autorAno">
          <p>{autor}</p>
          <p className='dataLancamento'>{anuncio.ano_lancamento}</p>
        </div>
        <p className='tipo'>{tipo.tipo === 'Doação' ? tipo.tipo :
              tipo.tipo === 'Troca' ? tipo.tipo : 'R$ ' + anuncio.preco}</p>
      </div>
      <button className='botaoLinkLivro'>
        <Link to='/livro'>
          <button className='botaoContainer' onClick={pegarIdAnuncio}>
            {tipo.tipo === 'Doação' ? 'Analisar' :
              tipo.tipo === 'Troca' ? 'Trocar' : 'Comprar'}
            <img src={imagemCarrinho} alt='icone de carrinho' />
          </button>
        </Link>
      </button>
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
  )
}

export default AnuncioCard;


