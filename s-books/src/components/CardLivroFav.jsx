import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnuncioCardFav from './AnuncioCardFav';

const baseUrl = 'http://10.107.144.7:8080/'

function CardLivroFav() {
    const [anuncios, setAnuncios] = useState([]);
    const idUser = localStorage.getItem('id_usuarioLogin')

    useEffect(() => {
        axios.get(`${baseUrl}v1/sbook/anuncios-favoritados/${idUser}`)
            .then(response => {
                const anunciosData = response.data.anuncios_favoritados;
                setAnuncios(anunciosData);
                console.log(response);
                console.log('anuncios data: ', anunciosData[0].id_anuncio);
            })
            .catch(error => {
                console.error('Erro ao obter dados dos anúncios:', error);
            });
    }, [idUser]);

    return (
        <div className="livrosContainer">
            {anuncios.length > 0 ? (
                anuncios.map((anuncio) => (
                    <AnuncioCardFav
                        key={anuncio.id_anuncio}
                        anuncio={anuncio}
                        autor={anuncio.autor}
                        tipo={anuncio.estado_livro}
                        endereco={anuncio.endereco}
                        foto={anuncio.foto}
                        cidade={anuncio.cidade}
                        estado={anuncio.estado}
                    />
                ))
            ) : (
                <div className='nenhumFav'>
                    <p>Nenhum favorito ainda 😞</p>
                    <p>Escolha o que voce mais gostou</p>
                </div>

            )}
        </div>
    );
}

export default CardLivroFav;
