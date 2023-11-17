import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MeuAnuncioCard from './MeuAnuncioCard';
import { baseUrl } from '../url';
import { Spinner } from '@chakra-ui/react'

function MeuAnuncioApi() {
    const [anuncios, setAnuncios] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    let idPegarAnuncio = parseInt(localStorage.getItem('getAnuncioById'))
      
  const idUser = localStorage.getItem('id_usuarioLogin')


    useEffect(() => {


      setIsLoading(true);
    
      axios.get(`${baseUrl}v1/sbook/anuncio-usuario/${idUser}`)
        .then(response => {

          let anuncio = response.data.anuncios

          console.log(anuncio);
          setAnuncios(anuncio);
          setTimeout(() => {
            setIsLoading(false);
          }, 50); 
        })
        .catch(error => {
          console.error('Erro ao obter dados do anúncio pelo seu proprio id: ', error);
          

          setTimeout(() => {
            setIsLoading(true);
          }, 50); 
        });
    }, [idUser]);
    

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
        ) : (
          anuncios.length > 0 ? (
            anuncios
              //.filter((anuncio) => anuncio.anuncio.id !== idPegarAnuncio)
              .map((anuncio) => (
                <MeuAnuncioCard
                  key={anuncio.anuncio.id}
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
              <p>Você ainda não publicou anúncios 😞</p>
            </div>
          )
        )}
      </div>
      

  
    );
}

export default MeuAnuncioApi;