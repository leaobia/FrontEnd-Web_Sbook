import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox } from '@chakra-ui/react';
import { baseUrl } from '../url';

import seta from './img/seta.png';

function ApiGenero({ setGeneros }) {
  const [nomes, setNomes] = useState([]);
  const [selecionados, setSelecionados] = useState(
    JSON.parse(localStorage.getItem('generosSelecionados')) || []
  );
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const toggleSelecionado = (nome) => {
    if (selecionados.includes(nome)) {
      setSelecionados(selecionados.filter((item) => item !== nome));
    } else {
      setSelecionados([...selecionados, nome]);
    }
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}v1/sbook/generos`)
      .then((response) => {
        const personagensData = response.data.dados;
        const nomesDosPersonagens = personagensData.map((personagem) => personagem.nome);
        setNomes(nomesDosPersonagens);

        // Remova a linha abaixo para não utilizar setGeneros diretamente
        // setGeneros(generosSelecionados);
      })
      .catch((error) => {
        console.error('Erro ao obter dados dos generos:', error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('generosSelecionados', JSON.stringify(selecionados));
    // Use setGeneros passado como propriedade para enviar os dados de gêneros para Filtragem.jsx
    setGeneros(selecionados);
  }, [selecionados, setGeneros]);

  const toggleMostrarTodos = () => {
    setMostrarTodos(!mostrarTodos);
  };

  const limparGeneros = () => {
    setSelecionados([]);
  };

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
        <button onClick={toggleMostrarTodos} className='botaoQuantidadeListaGenero'>
          Mostrar Mais <img src={seta} alt='icone de seta' />
        </button>
      )}
      {mostrarTodos && nomes.length > 8 && (
        <button onClick={() => setMostrarTodos(false)} className='botaoQuantidadeListaGenero'>
          Mostrar Menos
        </button>
      )}
      <button onClick={limparGeneros} id='botaoLimparGenerosId' className='botaoLimparGeneros'></button>
    </>
  );
}

export default ApiGenero;
