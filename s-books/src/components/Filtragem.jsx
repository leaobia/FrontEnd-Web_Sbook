import './css/Filtragem.css';
import React, { useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import slider from './img/Slider.png';
import { Stack, Checkbox, Input, InputGroup } from '@chakra-ui/react';
import axios from 'axios';
import { baseUrl } from '../url';
import ApiGenero from './ApiGenero';

function Filtragem({ onFilterChange }) {
    const [visibleLeft, setVisibleLeft] = useState(false);
    const [livrosSelecionados, setLivrosSelecionados] = useState([]);
    const [anoLivroValue, setAnoLivroValue] = useState('');
    const [generos, setGeneros] = useState([]);
    const [anuncios, setAnuncios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleCheckboxChange = (name) => {
        setLivrosSelecionados((prevSelected) => {
            if (prevSelected.includes(name)) {
                const updatedSelection = prevSelected.filter((item) => item !== name);
                console.log('Livros Selecionados Atualizados:', updatedSelection);
                return updatedSelection;
            } else {
                const updatedSelection = [...prevSelected, name];
                console.log('Livros Selecionados Atualizados:', updatedSelection);
                return updatedSelection;
            }
        });
    };

    const filtrar = () => {

        let url = `${baseUrl}v1/sbook/anuncios-filtros?`;

        if (livrosSelecionados.length > 0) {
            url += `array_estado_livro=[${livrosSelecionados}]`;
        }

        if (generos.length > 0 && livrosSelecionados.length > 0) {
            url += `&array_generos=[${generos}]`;
        } else if (generos.length > 0) {
            url += `array_generos=[${generos}]`;
        }

        if (url.length == 61) {
            console.log('entrou 1');
            axios
                .get(`${baseUrl}v1/sbook/anuncio?page=${currentPage}`)
                .then((response) => {
                    console.log('entrou 2');
                    const anunciosData = response.data.anuncios;
                    setAnuncios(anunciosData);
                    onFilterChange(anunciosData);
                })
                .catch((error) => {
                    console.error('Erro ao obter dados dos anúncios:', error);
                })
        } else {
            axios.get(url).then(response => {
                const anunciosData = response.data.anuncios;
                setAnuncios(anunciosData);
                console.log(anunciosData);
                onFilterChange(anunciosData);
            })
                .catch(error => {
                    console.error('Erro ao obter dados dos anúncios:', error);
                });
        }

        console.log('Filtros aplicados:');

        if (anoLivroValue) {
            console.log('Ano do Livro:', anoLivroValue);
        }

        if (generos && generos.length > 0) {
            console.log('Gêneros:', generos);
        }

        if (livrosSelecionados.length > 0) {
            console.log('Livros Selecionados:', livrosSelecionados);
        }


    };

    const limparFiltros = () => {
        setAnoLivroValue('');
        setLivrosSelecionados([]);
        setGeneros([]);
        document.getElementById('botaoLimparGenerosId').click();
    };

    useEffect(() => {
        filtrar()
        onFilterChange(anuncios);
    }, [anoLivroValue, livrosSelecionados, generos]);

    const sidebarFunction = () => {
        setVisibleLeft(true);
        document.body.classList.add('privarRolagem');
    };

    const hideSidebar = () => {
        setVisibleLeft(false);
        document.body.classList.remove('privarRolagem');
    };

    return (
        <div className="Filtragem">
            <div className="menuLocalContainer">
                <button className='botaoMenu' onClick={sidebarFunction}><img src={slider} alt='ícone do botao de menu' /></button>
            </div>

            <Sidebar className='sideBar' visible={visibleLeft} position="left" onHide={() => hideSidebar()}>
                <div className="filtragemContainer">
                    <h1>Filtragem</h1>
                </div>
                <div className="livrosContainerSidebar">
                    <h4 className='titleSection'>Livros</h4>
                    <Stack spacing={5} direction='row'>
                        <Checkbox
                            colorScheme='gray'
                            className='opcaoChecagem'
                            name='Novos'
                            onChange={() => handleCheckboxChange('Novo')}
                            isChecked={livrosSelecionados.includes('Novo')}
                        >
                            Novos
                        </Checkbox>
                        <Checkbox
                            colorScheme='gray'
                            className='opcaoChecagem'
                            name='Seminovos'
                            onChange={() => handleCheckboxChange('Seminovo')}
                            isChecked={livrosSelecionados.includes('Seminovo')}
                        >
                            Seminovos
                        </Checkbox>
                        <Checkbox
                            colorScheme='gray'
                            className='opcaoChecagem'
                            name='Usados'
                            onChange={() => handleCheckboxChange('Usado')}
                            isChecked={livrosSelecionados.includes('Usado')}
                        >
                            Usados
                        </Checkbox>
                    </Stack>
                </div>
                <div className="generoContainer">
                    <h4 className='titleSection'>Gênero</h4>
                    <ApiGenero setGeneros={setGeneros} />
                </div>
                <div className="anoDoLivroContainer">
                    <h4 className='titleSection'>Ano</h4>
                    <Stack spacing={5} className='stackDigitarLocal'>
                        <InputGroup>
                            <Input
                                type='number'
                                placeholder='Digite o ano do livro'
                                h='48px'
                                id='anoLivro'
                                className='inputField'
                                value={anoLivroValue}
                                onChange={(e) => setAnoLivroValue(e.target.value)}
                            />
                        </InputGroup>
                        <span className='opcaoChecagem'>Ex: 2008</span>
                    </Stack>
                </div>
                <div className="limparContainer">
                    <button title='Clique aqui para Enviar os dados' onClick={limparFiltros}>Limpar</button>
                </div>
            </Sidebar>
        </div>
    );
}

export default Filtragem;
