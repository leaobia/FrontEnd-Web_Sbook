import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FetchEstadoLivro, FetchGeneros, FetchTipoAnuncio } from '../module/Funcoes';

function Anunciar3() {

  const [generos, setGeneros] = useState([]);
  const [estadoLivro, setEstadoLivro] = useState([]);
  const [tipoAnuncio, setTipoAnuncio] = useState([]);

  const [generosSelecionados, setGenerosSelecionados] = useState([]);
  const [estadosSelecionados, setestadosSelecionados] = useState([]);
  const [tipoAnuncioSelecionados, setTipoAnuncioSelecionados] = useState([]);

  const [cidadeUsuario, setCidadeUsuario] = useState('');

  useEffect(() => {

    //fetch nas apis
    async function fetchDataGenero() {
      try {
        const generosData = await FetchGeneros();
        setGeneros(generosData);
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
      }
    }

    async function fetchDataEstadoLivro() {
      try {
        const estadoData = await FetchEstadoLivro();
        setEstadoLivro(estadoData);
      } catch (error) {
        console.error('Erro ao buscar estados do livro:', error);
      }
    }

    async function fetchDataTipoLivro() {
      try {
        const tipoAnuncioData = await FetchTipoAnuncio();
        setTipoAnuncio(tipoAnuncioData);
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
      }
    }

    // chamando os fetchNasApi
    fetchDataGenero();
    fetchDataEstadoLivro();
    fetchDataTipoLivro();


    const cidade = localStorage.getItem('cidadeUsuario');
    setCidadeUsuario(cidade);
  }, []);

  // manipulando useState
  function handleCheckboxChange(genero) {
    if (generosSelecionados.includes(genero)) {
      setGenerosSelecionados(generosSelecionados.filter(item => item !== genero));
      localStorage.setItem('generosSelecionados', generosSelecionados)    } else {
      setGenerosSelecionados([...generosSelecionados, genero]);
    }
  }

  function handleCheckboxChange2(estadoLivro) {
    if (estadosSelecionados.includes(estadoLivro)) {
      setestadosSelecionados(estadosSelecionados.filter(item => item !== estadoLivro));
    } else {
      setestadosSelecionados([...estadosSelecionados, estadoLivro]);
    }
  }

  function handleCheckboxChange3(tipoAnuncio) {
    if (tipoAnuncioSelecionados.includes(tipoAnuncio)) {
      setTipoAnuncioSelecionados(tipoAnuncioSelecionados.filter(item => item !== tipoAnuncio));
    } else {
      setTipoAnuncioSelecionados([...tipoAnuncioSelecionados, tipoAnuncio]);
    }
  }

  // Ação clique 
  function coletarDados() {
    localStorage.setItem('tipoAnuncioSelecionados', tipoAnuncioSelecionados)
    localStorage.setItem('estadosSelecionados', estadosSelecionados)
    localStorage.setItem('generosSelecionados', generosSelecionados)  
    
  }

  return (
    <div className="queroAnunciar3">
      <div className="sideBarContainer">
      <Link to='/anunciar2'>&larr;</Link>
        <div className="menuLocalContainer">
          <span className='nomeDaCidade'>{cidadeUsuario}</span>
        </div>
      </div>
      <h1>Estamos quase lá!</h1>
      <div className="dadosPersonalizados">
        <p>Selecione os gêneros que seu livro mais se encaixa:</p>
        <div className="dadosGenero">
          {generos.map(genero => (
            <label key={genero}>
              <input
                type="checkbox"
                value={genero}
                className='check'
                onChange={() => handleCheckboxChange(genero)}
              />
              {genero}
            </label>
          ))}
        </div>
      </div>
      <div className="dadosPersonalizados">
        <p>Selecione as condições do livro:</p>
        <div className="dadosGenero">
          {estadoLivro.map(estado => (
            <label key={estado}>
              <input
                type="checkbox"
                className='check'
                value={estado}
                onChange={() => handleCheckboxChange2(estado)}
              />
              {estado}
            </label>
          ))}
        </div>
      </div>
      <div className="dadosPersonalizados">
        <p>Que tipo de negociação será feita com o livro:</p>
        <div className="dadosGenero">
          {tipoAnuncio.map(tipo => (
            <label key={tipo}>
              <input
                type="checkbox"
                className='check'
                value={tipo}
                onChange={() => handleCheckboxChange3(tipo)}
              />
              {tipo}
            </label>
          ))}
        </div>
      </div>
      <Link id='continuarAnuncio' to='/anunciar4'><button onClick={coletarDados}>Continuar</button></Link>
    </div>
  );
}

export default Anunciar3;



