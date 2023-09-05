import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox } from '@chakra-ui/react'; 

function ApiGenero() {
  const [nomes, setNomes] = useState([]);
  const [selecionados, setSelecionados] = useState({}); 
  const [mostrarTodos, setMostrarTodos] = useState(false);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        const personagensData = response.data.results;
        const nomesDosPersonagens = personagensData.map(personagem => personagem.name);
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
        {nomes.slice(0, mostrarTodos ? nomes.length : 10).map((nome, index) => (
          <li key={index}>
            <label>
              <Checkbox
                isChecked={selecionados[nome] || false}
                onChange={() => toggleSelecionado(nome)}
                colorScheme='gray'
              >
                {nome}
              </Checkbox>
            </label>
          </li>
        ))}
      </ul>
      {!mostrarTodos && (
        <button onClick={toggleMostrarTodos}>Mostrar Mais</button>
      )}
      {mostrarTodos && nomes.length > 10 && (
        <button onClick={() => setMostrarTodos(false)}>Mostrar Menos</button>
      )}
    </>
  );
}

export default ApiGenero;
