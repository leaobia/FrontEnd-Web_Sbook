import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox } from '@chakra-ui/react';

import seta from './img/seta.png';

function ApiGenero() {
    //https://app-nodejs.cyclic.cloud/
  const baseUrl = 'http://10.107.144.7:8080/'

  const [nomes, setNomes] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const toggleSelecionado = (nome) => {
    if (selecionados.includes(nome)) {
      setSelecionados(selecionados.filter((item) => item !== nome));
    } else {
      setSelecionados([...selecionados, nome]);
    }
  };

  useEffect(() => {
  
    axios.get(`${baseUrl}v1/sbook/generos`)
      .then(response => {
        const personagensData = response.data.dados;
        const nomesDosPersonagens = personagensData.map(personagem => personagem.nome);
        setNomes(nomesDosPersonagens);

        // Obter os gêneros selecionados do localStorage
        const generosSelecionados = JSON.parse(localStorage.getItem('gênerosSelecionados')) || [];
        setSelecionados(generosSelecionados);
      })
      .catch(error => {
        console.error('Erro ao obter dados dos personagens:', error);
      });
  }, []);

  const toggleMostrarTodos = () => {
    setMostrarTodos(!mostrarTodos);
  };

  // Salvar os gêneros selecionados no localStorage sempre que houver alterações
  useEffect(() => {
    localStorage.setItem('gênerosSelecionados', JSON.stringify(selecionados));
  }, [selecionados]);

  return (
    <>
      <ul className='listaDeGeneros'>
        {nomes.slice(0, mostrarTodos ? nomes.length : 8).map((nome, index) => (
          <li key={index}>
            <label>
              <Checkbox
                isChecked={selecionados.includes(nome)}
                onChange={() => toggleSelecionado(nome)}
                colorScheme='gray'
                className='opcaoChecagem'
              >
                {nome}
              </Checkbox>
            </label>
          </li>
        ))}
      </ul>
      {!mostrarTodos && (
        <button onClick={toggleMostrarTodos} className='botaoQuantidadeListaGenero'>Mostrar Mais <img src={seta} alt="icone de seta" /></button>
      )}
      {mostrarTodos && nomes.length > 8 && (
        <button onClick={() => setMostrarTodos(false)} className='botaoQuantidadeListaGenero'>Mostrar Menos</button>
      )}
    </>
  );
}

export default ApiGenero;
