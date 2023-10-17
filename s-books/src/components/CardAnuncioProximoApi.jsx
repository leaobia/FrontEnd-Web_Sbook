import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import AnuncioCardProximos from './AnuncioCardProximos'; 
import { baseUrl } from '../url';
import { Spinner } from '@chakra-ui/react'

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

function 

CardAnuncioProximoApi() {
  const [anuncios, setAnuncios] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const credentials = {
        "bairro": 'Vila Marcondes',
        "cidade": 'Carapicuíba',
        "estado": 'SP'
    };

    const url = `${baseUrl}v1/sbook/anuncio-proximos?page=1`;
    
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error('A resposta da rede não foi bem-sucedida');
        }
    })
    .then(data => {
        console.log('Dados da resposta:', data);
        const anunciosData = data.anuncios;
        setAnuncios(anunciosData);
    })
    .catch(error => {
        console.error('Erro ao obter dados dos anúncios:', error);
    })
    .finally(() => {
        setIsLoading(false);
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
  {isLoading ? (
     <div className="spinnerContainer">
     <Spinner
       thickness='4px'
       speed='0.65s'
       color='brown' 
       size='xl'
     />
   </div>
  ) : termoPesquisa === '' ? (
    anuncios.map((anuncio) => (
      <AnuncioCardProximos key={anuncio.anuncio.id} anuncio={anuncio.anuncio} autor={anuncio.autores[0].nome} tipo={anuncio.tipo_anuncio[0]} endereco={anuncio.endereco} foto={anuncio.foto[0].foto} />
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
        <AnuncioCardProximos key={anuncio.anuncio.id} anuncio={anuncio.anuncio || {}} autor={anuncio.autores[0].nome} tipo={anuncio.tipo_anuncio[0]} endereco={anuncio.endereco} foto={anuncio.foto[0].foto} />
      ));

    })()
  )}
</div>

  );
}

export default CardAnuncioProximoApi;