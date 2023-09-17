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

    return (
        <div className="Filtragem">
            <div className="menuLocalContainer">
                <button className='botaoMenu' onClick={() => setVisibleLeft(true)}><img src={slider} alt='ícone do botao de menu' /></button>
                <span className='nomeDaCidade'>Carapicuíba</span>
            </div>

            <Sidebar className='sideBar' visible={visibleLeft} position="left" onHide={() => setVisibleLeft(false)}>
                <div className="filtragemContainer">
                    <h1>Filtragem</h1>
                    <Stack spacing={5} className='stackDigitarLocal'>
                        <h4 className='titleSection'>Localização</h4>
                        <InputGroup >
                            <InputRightElement pointerEvents='none'>
                                <img src={Local} alt="icone de localização" className='iconLocal' />
                            </InputRightElement>
                            <Input
                                id='enderecoValor'
                                placeholder='Digite seu estado ou cidade'
                                h='48px'
                                className='inputField'
                                fontSize={['sm', 'md', 'lg']}
                            />
                        </InputGroup>
                    </Stack>
                </div>
                <div className="livrosContainerSidebar">
                    <h4 className='titleSection'>Livros</h4>
                    <Stack spacing={5} direction='row'>
                        <Checkbox colorScheme='gray' className='opcaoChecagem'>
                            Novos
                        </Checkbox>
                        <Checkbox colorScheme='gray' className='opcaoChecagem'>
                            Seminovos
                        </Checkbox>
                        <Checkbox colorScheme='gray' className='opcaoChecagem'>
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
                                className='inputField'
                                fontSize={['sm', 'md', 'lg']}
                            />
                        </InputGroup>
                        <span className='opcaoChecagem'>Ex: 2008</span>
                    </Stack>
                </div>
                <div className="limparContainer">
                    <button title='Clique aqui para Enviar os dados' >Enviar</button>
                    <button title='Clique aqui para limpar os dados'>Limpar</button>
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