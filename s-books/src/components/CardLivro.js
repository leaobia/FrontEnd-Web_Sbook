import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonagemCard from './PersonagemCard';

function CardLivro() {
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
    <div className='livrosContainer'>
      {personagens.map(personagem => (
        <PersonagemCard key={personagem.id} personagem={personagem} />
      ))}
    </div>
  );
}

export default CardLivro;
