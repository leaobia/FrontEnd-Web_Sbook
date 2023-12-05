import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnuncioCardAnunciante from './AnuncioCardAnunciante';
import { baseUrl } from '../url';
import { Spinner } from '@chakra-ui/react'
import { Link } from "react-router-dom"

function CardAnuncioAnunciante() {
    const [anuncios, setAnuncios] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    let [id_anunciante, setId] = useState('');
    
   // console.log(anunciante);
    let idPegarAnuncio = parseInt(localStorage.getItem('getAnuncioById'))

    console.log(id_anunciante);

    useEffect(() => {
  
      axios.get(`${baseUrl}v1/sbook/anuncio/${idPegarAnuncio}`)
        .then( response => {
          const anuncioData = response.data.anuncios;
          setId(anuncioData.anuncio.anunciante)
    
        })
        .catch(error => {
          console.error('Erro ao obter dados do anúncio pelo id:', error);
        });
  
    }, [idPegarAnuncio]);

    useEffect(() => {
      setIsLoading(true);
    
      axios.get(`${baseUrl}v1/sbook/anuncio-usuario/${id_anunciante}`)
        .then(response => {

          console.log(response);

          let anuncio = response.data.anuncios
          console.log('anuncio do anunciante:', anuncio);
          console.log('anuncio do anunciante2:', anuncio[0].autores[0].nome);
  
          setAnuncios(anuncio);
          setTimeout(() => {
            setIsLoading(false);
          }, 100); 
        })
        .catch(error => {
          console.error('Erro ao obter dados do anúncio pelo id do anunciante:', error);
          

          setTimeout(() => {
            setIsLoading(false);
          }, 100); 
        });
    }, [id_anunciante]);
    
    console.log(anuncios);

    const anunciosFiltrados = anuncios.filter((anuncio) => anuncio.anuncio.id !== idPegarAnuncio);

 return (
    <div className="livrosContainer">
      {isLoading ? (
        <div className="spinnerContainer">
          <Spinner thickness="4px" speed="0.65s" color="brown" size="xl" />
        </div>
      ) : (
        <>
          {anunciosFiltrados.length > 0 ? (
            anunciosFiltrados.map((anuncio) => (
              <AnuncioCardAnunciante
                key={anuncio.anuncio.id}
                anuncio={anuncio.anuncio}
                autor={anuncio.autores && anuncio.autores.length > 0 ? anuncio.autores[0].nome : 'Nome não disponível'}
                tipo={anuncio.tipo_anuncio && anuncio.tipo_anuncio.length > 0 ? anuncio.tipo_anuncio[0] : 'Tipo não disponível'}
                endereco={anuncio.endereco}
                foto={anuncio.foto && anuncio.foto.length > 0 ? anuncio.foto[0].foto : 'URL da foto não disponível'}
                cidade={anuncio.endereco.cidade}
                estado={anuncio.endereco.estado}
              />
            ))
          ) : (
            <div className='nenhumFav2'>
            <p>Este anunciante postou apenas um anuncio</p>
            <p>Mas fique tranquilo nós temos muito mais anúncios para você <span><Link to = '/'>conferir</Link></span> &#128515;</p>
        </div>
          )}
        </>
      )}
    </div>
  );
}

export default CardAnuncioAnunciante;


