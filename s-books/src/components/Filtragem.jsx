import './css/Filtragem.css';

import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import slider from './img/Slider.png';

import Local from './img/Local.png'

import { Input, Stack, InputGroup, InputRightElement, InputLeftElement, Checkbox } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import ApiGenero from './ApiGenero';


function Filtragem() {

    const [visibleLeft, setVisibleLeft] = useState(false);
    const [livrosSelecionados, setLivrosSelecionados] = useState([]);

    const handleCheckboxChange = (event) => {

        const { name, checked } = event.target;

        if (checked) {

            setLivrosSelecionados((prevSelected) => [...prevSelected, name]);
        } else {

            setLivrosSelecionados((prevSelected) => prevSelected.filter((item) => item !== name));
        }
    };

    const filtrar = () => {
        const enderecoValor = document.getElementById('enderecoValor').value
        const anoLivro = document.getElementById('anoLivro').value
       
        const generos =  JSON.parse(localStorage.getItem('gênerosSelecionados'));

        if (!enderecoValor && !anoLivro && !generos && livrosSelecionados.length === 0) {
            console.log('Nenhum filtro foi aplicado.');
        } else {
            console.log('Filtros aplicados:');

            if (enderecoValor) {
                console.log('Endereço Valor:', enderecoValor);
            }

            if (anoLivro) {
                console.log('Ano do Livro:', anoLivro);
            }

        
            if (generos.length === 0) {
                console.log('vazio', generos); 
              } else{
                console.log('certo', generos); 
              }
              
            if (livrosSelecionados.length > 0) {
                console.log('Livros Selecionados:', livrosSelecionados);
            }
        }
        document.getElementById('secaoLivro').textContent = ''
    }

    const sidebarFunction = () => {
        setVisibleLeft(true)
        document.body.classList.add('privarRolagem');
    }
    
    const hideSidebar = () => {
        setVisibleLeft(false);
        document.body.classList.remove('privarRolagem');
    };

    return (
        <div className="Filtragem">
            <div className="menuLocalContainer">
                <button className='botaoMenu' onClick={sidebarFunction }><img src={slider} alt='ícone do botao de menu' /></button>
                {/* <span className='nomeDaCidade'>Carapicuíba</span> */}
            </div>

            <Sidebar className='sideBar' visible={visibleLeft} onClick={hideSidebar} position="left" onHide={() => setVisibleLeft(false)}>
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
                            onChange={handleCheckboxChange}
                            checked={livrosSelecionados.includes('Novos')}
                        >
                            Novos
                        </Checkbox>
                        <Checkbox
                            colorScheme='gray'
                            className='opcaoChecagem'
                            name='Seminovos'
                            onChange={handleCheckboxChange}
                            checked={livrosSelecionados.includes('Seminovos')}
                        >
                            Seminovos
                        </Checkbox>
                        <Checkbox
                            colorScheme='gray'
                            className='opcaoChecagem'
                            name='Usados'
                            onChange={handleCheckboxChange}
                            checked={livrosSelecionados.includes('Usados')}
                        >
                            Usados
                        </Checkbox>
                    </Stack>
                </div>
                <div className="generoContainer">
                    <h4 className='titleSection'>Gênero</h4>
                    <ApiGenero />
                </div>
                <div className="anoDoLivroContainer">
                    <h4 className='titleSection'>Ano</h4>
                    <Stack spacing={5} className='stackDigitarLocal'>
                        <InputGroup >
                            <Input
                                type='number'
                                placeholder='Digite o ano do livro'
                                h='48px'
                                id='anoLivro'
                                className='inputField'
                                fontSize={['sm', 'md', 'lg']}
                            />
                        </InputGroup>
                        <span className='opcaoChecagem'>Ex: 2008</span>
                    </Stack>
                </div>
                <div className="limparContainer">
                    <button title='Clique aqui para Enviar os dados' onClick={filtrar} >Limpar</button>
                    {/* <button title='Clique aqui para limpar os dados'>Limpar</button> */}
                </div>
            </Sidebar>


            <Stack className='stackSearch' spacing={2}>
                <InputGroup className='inputGroupSearch' >
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='black' />
                    </InputLeftElement>
                    <Input
                        type='tel'
                        placeholder='Digite o nome do livro'
                        className='inputField'
                        fontSize={['sm', 'md', 'lg']}
                        id='inputPesquisa'
                    />
                </InputGroup>
            </Stack>

        </div>
    )
}

export default Filtragem