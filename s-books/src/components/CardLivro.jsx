import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash'; // Importe o lodash
import PersonagemCard from './PersonagemCard';

function CardLivro() {
  const [personagens, setPersonagens] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');

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

  const inputPesquisa = document.getElementById('inputPesquisa');

  const handlePesquisaChange = _.debounce(event => {
    setTermoPesquisa(inputPesquisa.value);
  }, 100); 

  if (inputPesquisa) {
    inputPesquisa.addEventListener('input', handlePesquisaChange);
  }

  return (
    <div className='livrosContainer'>
      {personagens
        .filter(personagem =>
          personagem.name.toLowerCase().includes(termoPesquisa.toLowerCase())
        )
        .map(personagem => (
          <PersonagemCard key={personagem.id} personagem={personagem} />
        ))}
    </div>
  );
}

export default CardLivro;

