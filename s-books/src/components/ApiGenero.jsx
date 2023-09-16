import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox } from '@chakra-ui/react'; 

import seta from './img/seta.png'

function ApiGenero() {
  const [nomes, setNomes] = useState([]);
  const [selecionados, setSelecionados] = useState({}); 
  const [mostrarTodos, setMostrarTodos] = useState(false);

  useEffect(() => {
    axios.get('https://app-nodejs.cyclic.cloud/v1/sbook/generos')
      .then(response => {
       
        const personagensData = response.data.dados;
        const nomesDosPersonagens = personagensData.map(personagem => personagem.nome);
        setNomes(nomesDosPersonagens); 
      })
      .catch(error => {
        console.error('Erro ao obter dados dos personagens:', error);
      });
  }, []);

  const toggleSelecionado = (nome) => {
    setSelecionados(prevSelecionados => ({
      ...prevSelecionados,
      [nome]: !prevSelecionados[nome] 
    }));
  };

  const toggleMostrarTodos = () => {
    setMostrarTodos(!mostrarTodos); 
  };

  return (
    <>
      <ul className='listaDeGeneros'>
        {nomes.slice(0, mostrarTodos ? nomes.length : 8).map((nome, index) => (
          <li key={index}>
            <label>
              <Checkbox
                isChecked={selecionados[nome] || false}
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
