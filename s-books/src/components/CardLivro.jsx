import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash'; // Importe o lodash
import PersonagemCard from './PersonagemCard';


import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

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
    <div className="livrosContainer">
      {termoPesquisa === '' ? (
        personagens.map((personagem) => (
          <PersonagemCard key={personagem.id} personagem={personagem} />
        ))
      ) : (
        (() => {
          const filteredPersonagens = personagens.filter((personagem) =>
            personagem.name.toLowerCase().includes(termoPesquisa.toLowerCase())
          );
  
          if (filteredPersonagens.length === 0) {
            return (
            
              <Alert
              status='error'
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              height='40vh'
            >
              <AlertIcon boxSize='40px' mr={0} />
              <AlertTitle mt={4} mb={1} fontSize='lg'>
                Erro!
              </AlertTitle>
              <AlertDescription maxWidth='sm'>
                Nenhum resultado foi encontrado para sua pesquisa.
              </AlertDescription>
            </Alert>
             
            );
          }
  
          return filteredPersonagens.map((personagem) => (
            <PersonagemCard key={personagem.id} personagem={personagem} />
          ));
        })()
      )}
    </div>
  );
  
  
}

export default CardLivro;

