import slider from './Slider.png'
import search from './search.png'
import './Filtragem.css'
//import { Input } from '@chakra-ui/react'
//import {
   // Editable,
   // EditableInput,
  //  EditableTextarea,
   // EditablePreview,
  //} from '@chakra-ui/react'

function Filtragem(){
    return(
        <div className="Filtragem">
            <div className="menuLocalContainer">
                <button className='botaoMenu'><img src={slider} alt='ícone do botao de menu'/></button>
                <span className='nomeDaCidade'>Carapicuíba</span>
            </div>
       

            
        </div>
    )
}

export default Filtragem