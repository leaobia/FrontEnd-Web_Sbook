import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import AnuncioCard from './AnuncioCard';
import { baseUrl } from '../url';
import { Spinner } from '@chakra-ui/react';
import Pages from './Pages';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

function CardLivro({ filteredAds }) {
  const [anuncios, setAnuncios] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // useEffect(() => {
  //   setIsLoading(true);

  //   if (filteredAds.length > 0) {
  //     // Se houver anúncios filtrados, use-os
  //     setAnuncios(filteredAds);
  //     setIsLoading(false);
  //   } else {
  //     // Se não houver anúncios filtrados, faça a busca normalmente
  //     axios.get(`${baseUrl}v1/sbook/anuncio?page=${currentPage}`)
  //       .then(response => {
  //         const anunciosData = response.data.anuncios;
  //         setAnuncios(anunciosData);
  //       })
  //       .catch(error => {
  //         console.error('Erro ao obter dados dos anúncios:', error);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // }, [currentPage, filteredAds]);  // Adiciona currentPage como dependência

  useEffect(() => {
    setIsLoading(true);

    if (filteredAds.length > 0) {
      setAnuncios(filteredAds);
      setIsLoading(false);
    } else {
      axios
        .get(`${baseUrl}v1/sbook/anuncio?page=${currentPage}`)
        .then((response) => {
          const anunciosData = response.data.anuncios;
          setAnuncios(anunciosData);
        })
        .catch((error) => {
          console.error('Erro ao obter dados dos anúncios:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentPage, filteredAds]);

  const handlePesquisaChange = _.debounce(event => {
    setTermoPesquisa(event.target.value);
  }, 100);

  return (
    <div>
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
            <AnuncioCard key={anuncio.anuncio.id} anuncio={anuncio.anuncio} autor={anuncio.autores[0].nome} tipo={anuncio.tipo_anuncio[0]} endereco={anuncio.endereco} foto={anuncio.foto[0].foto} />
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
              <AnuncioCard key={anuncio.anuncio.id} anuncio={anuncio.anuncio || {}} autor={anuncio.autores[0].nome} tipo={anuncio.tipo_anuncio[0]} endereco={anuncio.endereco} foto={anuncio.foto[0].foto} />
            ));

          })()
        )}
      </div>
      <Pages onPageChange={handlePageChange} />
    </div>
  );
}

export default CardLivro;
