import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import AnuncioCard from './AnuncioCard'; 
import { baseUrl } from '../url';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

function 

CardLivro() {
  const [anuncios, setAnuncios] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  

  useEffect(() => {
    axios.get(`${baseUrl}v1/sbook/anuncio`)
      .then(response => {
        const anunciosData = response.data.anuncios;
        console.log('Anuncios data:', anunciosData);
        setAnuncios(anunciosData);
      })
      .catch(error => {
        console.error('Erro ao obter dados dos anúncios:', error);
      });
  }, []);

  const inputPesquisa = document.getElementById('inputPesquisa');

  const handlePesquisaChange = _.debounce(event => {
    setTermoPesquisa(inputPesquisa.value);
  }, 100);

  if (inputPesquisa) {
    inputPesquisa.addEventListener('input', handlePesquisaChange);
  }
  
  localStorage.setItem('quantidadeLivros', anuncios.length);
  
  return (
    <div className="livrosContainer">
      {termoPesquisa === '' ? (
        anuncios.map((anuncio) => (
          <AnuncioCard key={anuncio.anuncio.id} anuncio={anuncio.anuncio} autor={anuncio.autores[0].nome} tipo={anuncio.tipo_anuncio[0]} endereco = {anuncio.endereco} foto = {anuncio.foto[0].foto}/>
        ))
      ) : (
        (() => {
          const filteredAnuncios = anuncios.filter((anuncio) =>
            anuncio.anuncio && anuncio.anuncio.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
          );

          if (filteredAnuncios.length === 0) {
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

          return filteredAnuncios.map((anuncio) => (
            <AnuncioCard key={anuncio.anuncio.id} anuncio={anuncio.anuncio || {}} autor={anuncio.autores[0].nome} tipo={anuncio.tipo_anuncio[0]} endereco = {anuncio.endereco} foto = {anuncio.foto[0].foto} />
          ));
          
        })()
      )}
    </div>
  );
}

export default CardLivro;
