import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FetchEstadoLivro, FetchGeneros, FetchTipoAnuncio } from '../module/Funcoes';

// import RadioGroup from "@mui/material/RadioGroup";
// import Radio from "@mui/material/Radio";

function Anunciar3() {

  const [generos, setGeneros] = useState([]);
  const [estadoLivro, setEstadoLivro] = useState([]);
  const [tipoAnuncio, setTipoAnuncio] = useState([]);

  const [generosSelecionados, setGenerosSelecionados] = useState([]);
  // const [generosSelecionadosId, setGenerosSelecionadosId] = useState([]);
  // const [generosSelecionadosNome, setGenerosSelecionadosNome] = useState([]);
  const [estadosSelecionados, setEstadosSelecionados] = useState([]);
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

  const handleCheckboxChange2 = (estadoLivro) => {
    setEstadosSelecionados(estadoLivro)
  };

  function handleCheckboxChange3(tipoAnuncio) {
    if (tipoAnuncioSelecionados.includes(tipoAnuncio)) {
      setTipoAnuncioSelecionados(tipoAnuncioSelecionados.filter(item => item !== tipoAnuncio));
    } else {
      setTipoAnuncioSelecionados([...tipoAnuncioSelecionados, tipoAnuncio]);
    }
  }

  function coletarDados() {
    console.log('Dados crus: ', estadosSelecionados, tipoAnuncioSelecionados,generosSelecionados);

    let arrayId = []
    let arrayNome = []

    generosSelecionados.map(generosSelecionados => {
      arrayNome.push(generosSelecionados.nome)
      arrayId.push(generosSelecionados.id)
    })

    console.log('ArrayNome', arrayNome);
    console.log('ArrayId', arrayId);

    localStorage.setItem('tipoAnuncioSelecionados', tipoAnuncioSelecionados)
    localStorage.setItem('estadosSelecionados', estadosSelecionados)
    localStorage.setItem('generosSelecionados', arrayNome)  
    localStorage.setItem('generosSelecionadosId', arrayId)  
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
    <label key={genero.id}>
      <input
        type="checkbox"
        value={genero.id}
        className='check'
        onChange={() => handleCheckboxChange(genero)}
      />
      {genero.nome}
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
          type="radio"
          name="estadosSelecionados"
          value={estado}
          onChange={(event) => handleCheckboxChange2(event.target.value)}
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



