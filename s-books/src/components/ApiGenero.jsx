import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GeneroList from './GeneroList';

function ApiGenero() {
  const [personagens, setPersonagens] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        const personagensData = response.data.results;
        setPersonagens(personagensData);
      })
      .catch(error => {
        console.error('Erro ao obter dados dos personagens:', error);
      });
  }, []);

  return (
    <>
      {personagens.map(genero => (
        <GeneroList key={genero.id} genero ={genero} />
      ))}
    </>
  );
}

export default ApiGenero;
