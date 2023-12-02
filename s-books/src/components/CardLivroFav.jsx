import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnuncioCardFav from './AnuncioCardFav';
import { baseUrl } from '../url';
import { Spinner } from '@chakra-ui/react';

function CardLivroFav() {
    const [anuncios, setAnuncios] = useState([]);
    const idUser = localStorage.getItem('id_usuarioLogin')
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${baseUrl}v1/sbook/anuncios-favoritados/${idUser}`)
            .then(response => {
                const anunciosData = response.data.anuncios;
                setAnuncios(anunciosData);
                console.log(anunciosData[0]);
            })
            .catch(error => {
                console.error('Erro ao obter dados dos anúncios:', error);
            })
            .finally(() => {
                setIsLoading(false);
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
                    anuncios.map((anuncio) => (
                        <AnuncioCardFav
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
                        <p>Nenhum favorito ainda 😞</p>
                        <p>Escolha o que voce mais gostou</p>
                    </div>

                )
            )}
        </div>
    );
}

export default CardLivroFav;
