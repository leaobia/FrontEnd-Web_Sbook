import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../url';
import logo from './img/seta.png';
import logoBloqueada from './img/seta_bloqueada.png';
import './css/Page.css';

function Pages({ onPageChange }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [anuncios, setAnuncios] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            onPageChange(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            onPageChange(currentPage - 1);
        }
    };

    useEffect(() => {
        setIsLoading(true);

        axios.get(`${baseUrl}v1/sbook/paginacao/`)
            .then(response => {
                const total = response.data.pages;
                setTotalPages(total);
            })
            .catch(error => {
                console.error('Erro ao obter o número total de páginas:', error);
            });


        axios.get(`${baseUrl}v1/sbook/anuncio?page=${currentPage}`)
            .then(response => {
                const anunciosData = response.data.anuncios;
                setAnuncios(anunciosData);
            })
            .catch(error => {
                console.error('Erro ao obter dados dos anúncios:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [currentPage]);

    return (
        <div className='container-page'>
            <img
                src={currentPage === 1 ? logoBloqueada : logo}
                alt="Imagem"
                className={`seta_contrario ${currentPage === 1 ? 'img-cinza' : ''}`}
                onClick={handlePrevPage}
            />
            <p className='number-page'>{currentPage}</p>
            <img
                src={currentPage === totalPages ? logoBloqueada : logo}
                alt="Imagem"
                onClick={handleNextPage}
                className={currentPage === totalPages ? 'img-cinza' : ''}
            />
        </div>
    );
}

export default Pages;
