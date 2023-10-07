import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FetchGeneros } from '../module/Funcoes';

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
        const generosData = await FetchGeneros();
        setGeneros(generosData);
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
      }
    }

    async function fetchDataTipoLivro() {
      try {
        const generosData = await FetchGeneros();
        setGeneros(generosData);
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
      }
    }

    // chamando os fetchNasApi
    fetchDataGenero();

    const cidade = localStorage.getItem('cidadeUsuario');
    setCidadeUsuario(cidade);
  }, []);

  // manipulando useState
  function handleCheckboxChange(genero) {
    if (generosSelecionados.includes(genero)) {
      setGenerosSelecionados(generosSelecionados.filter(item => item !== genero));
    } else {
      setGenerosSelecionados([...generosSelecionados, genero]);
    }
  }

  // Ação clique 
  function coletarDados() {
    console.log('Gêneros selecionados:', generosSelecionados);
  }

  return (
    <div className="queroAnunciar">
      <div className="sideBarContainer">
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
          {generos.map(genero => (
            <label key={genero}>
              <input
                type="checkbox"
                value={genero}
                onChange={() => handleCheckboxChange(genero)}
              />
              {genero}
            </label>
          ))}
        </div>
      </div>
      <div className="dadosPersonalizados">
        <p>Que tipo de negociação será feita com o livro:</p>
        <div className="dadosGenero">
          {generos.map(genero => (
            <label key={genero}>
              <input
                type="checkbox"
                value={genero}
                onChange={() => handleCheckboxChange(genero)}
              />
              {genero}
            </label>
          ))}
        </div>
      </div>
      <Link id='continuarAnuncio' to='/anunciar4'><button onClick={coletarDados}>Continuar</button></Link>
    </div>
  );
}

export default Anunciar3;



