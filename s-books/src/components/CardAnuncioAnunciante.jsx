import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnuncioCardAnunciante from './AnuncioCardAnunciante';
import { baseUrl } from '../url';
import { Spinner } from '@chakra-ui/react'

function CardAnuncioAnunciante() {
    const [anuncios, setAnuncios] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const anunciante = localStorage.getItem('id_anunciante');
   // console.log(anunciante);
    let idPegarAnuncio = parseInt(localStorage.getItem('getAnuncioById'))

    useEffect(() => {
      setIsLoading(true);
    
      axios.get(`${baseUrl}v1/sbook/anuncio-usuario/${anunciante}`)
        .then(response => {

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
    }, [anunciante]);
    
    console.log(anuncios);

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
) :  Array.isArray(anuncios) ? (
  anuncios
      //.filter((anuncio) => anuncio.anuncio.id !== idPegarAnuncio)
      .map((anuncio) => (
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
  <div className='nenhumFav'>
  <p>Só postou esse por enquanto 😞</p>
</div>
)}

</div>

  
    );
}

export default CardAnuncioAnunciante;


