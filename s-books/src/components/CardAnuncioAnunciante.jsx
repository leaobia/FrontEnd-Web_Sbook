import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnuncioCardAnunciante from './AnuncioCardAnunciante';
import { baseUrl } from '../url';
import { Spinner } from '@chakra-ui/react'

function CardAnuncioAnunciante() {
    const [anuncios, setAnuncios] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Definir como false inicialmente
    const anunciante = localStorage.getItem('id_anunciante');
    console.log(anunciante);

    useEffect(() => {
      setIsLoading(true);
    
      axios.get(`${baseUrl}v1/sbook/anuncio-usuario/${anunciante}`)
        .then(response => {

          let anuncio = response.data.anuncios
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
) : Array.isArray(anuncios) ? (
    anuncios.map((anuncio) => (
        <AnuncioCardAnunciante
            key={anuncio.anuncio.id_anuncio}
            anuncio={anuncio.anuncio}
            autor={anuncio.autores[0].nome}
            tipo={anuncio.tipo_anuncio[0]}
            endereco={anuncio.endereco}
            foto={anuncio.foto[0].foto}
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


