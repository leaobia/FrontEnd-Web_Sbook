import slider from './Slider.png'
//import search from './search.png'
import './Filtragem.css'
import { Input, Stack, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { PhoneIcon, SearchIcon } from '@chakra-ui/icons'
function Filtragem() {

    function ativarMenu(){
        console.log('Ativado');
    }


    return (
        <div className="Filtragem">
            <div className="menuLocalContainer">
                <button className='botaoMenu' onClick={ativarMenu}><img src={slider} alt='ícone do botao de menu' /></button>
                <span className='nomeDaCidade'>Carapicuíba</span>
            </div>
            <Stack spacing={4} className='stackSearch'>
                <InputGroup className='inputGroupSearch' >
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='black' />
                    </InputLeftElement>
                    <Input type='tel' placeholder='Digite o nome do livro'/>
                </InputGroup>
            </Stack>

        </div>
    )
}

export default Filtragem