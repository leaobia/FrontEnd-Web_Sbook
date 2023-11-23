import './css/Filtragem.css';
import React, { useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import slider from './img/Slider.png';
import { Stack, Checkbox, Input, InputGroup } from '@chakra-ui/react';  // Importando Input e InputGroup
import ApiGenero from './ApiGenero';

function Filtragem() {
    const [visibleLeft, setVisibleLeft] = useState(false);
    const [livrosSelecionados, setLivrosSelecionados] = useState([]);
    const [anoLivroValue, setAnoLivroValue] = useState('');
    const [generos, setGeneros] = useState([]);

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
        // useEffect(() => {
        //     axios.get(`${baseUrl}v1/sbook/anuncios-favoritados/${idUser}`)
        //         .then(response => {
        //             const anunciosData = response.data.anuncios;
        //             setAnuncios(anunciosData);
        //             console.log(anunciosData[0]);
        //         })
        //         .catch(error => {
        //             console.error('Erro ao obter dados dos anúncios:', error);
        //         });
        // }, [idUser]);
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
    }, [anoLivroValue, livrosSelecionados, generos]);

    const sidebarFunction = () => {
        setVisibleLeft(true);
        document.body.classList.add('privarRolagem');
    };

    const hideSidebar = () => {
        setVisibleLeft(false);
        document.body.classList.remove('privarRolagem');
    };

    filtrar()

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
                            onChange={() => handleCheckboxChange('Novos')}
                            isChecked={livrosSelecionados.includes('Novos')}
                        >
                            Novos
                        </Checkbox>
                        <Checkbox
                            colorScheme='gray'
                            className='opcaoChecagem'
                            name='Seminovos'
                            onChange={() => handleCheckboxChange('Seminovos')}
                            isChecked={livrosSelecionados.includes('Seminovos')}
                        >
                            Seminovos
                        </Checkbox>
                        <Checkbox
                            colorScheme='gray'
                            className='opcaoChecagem'
                            name='Usados'
                            onChange={() => handleCheckboxChange('Usados')}
                            isChecked={livrosSelecionados.includes('Usados')}
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
