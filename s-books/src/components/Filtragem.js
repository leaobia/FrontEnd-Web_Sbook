import './css/Filtragem.css';

import { Input, Stack, InputGroup, InputLeftElement} from '@chakra-ui/react'; 
import { SearchIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar'; 
import slider from './Slider.png'; 

function Filtragem() {

    const [visibleLeft, setVisibleLeft] = useState(false);

    return (
        <div className="Filtragem">
            <div className="menuLocalContainer">
                <button className='botaoMenu' onClick={() => setVisibleLeft(true)}><img src={slider} alt='ícone do botao de menu' /></button>
                <span className='nomeDaCidade'>Carapicuíba</span>
            </div>

            <Sidebar className='sideBar' visible={visibleLeft} position="left" onHide={() => setVisibleLeft(false)}>
                <h2>Sidebar</h2>
            </Sidebar>


            <Stack className='stackSearch' spacing={2}>
                <InputGroup className='inputGroupSearch' >
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='black' />
                    </InputLeftElement>
                    <Input type='tel' placeholder='Digite o nome do livro' className='inputField' fontSize={['sm', 'md', 'lg']}
                    />
                </InputGroup>
            </Stack>

        </div>
    )
}

export default Filtragem