import React, { useEffect, useState } from 'react';
//import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom"
import { baseUrl } from '../url';
import axios from 'axios';
import '../components/css/Livro.css'
import { Spinner } from '@chakra-ui/react'
import excluirIcon from '../components/img/excluir.png'
import editarIcon from '../components/img/editar.png'

import { Calendar } from 'primereact/calendar';

import { Button, Modal, ModalOverlay, useDisclosure, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalFooter,
   Drawer, DrawerBody, DrawerCloseButton, DrawerHeader, DrawerOverlay, DrawerContent,
  Textarea,
  Stack, ButtonGroup, Input } from '@chakra-ui/react';

 // import { FaEye} from 'react-icons/fa';
import { EditIcon } from '@chakra-ui/icons';

function MeuLivro() {

  let cidadeUsuario = localStorage.getItem('cidadeUsuario')
  let idPegarAnuncio = parseInt(localStorage.getItem('getAnuncioById'))

 
  const [anuncio, setAnuncio] = useState([]);
  const [generos, setGeneros] = useState([]);
 // const [nomeAnuncio, setNomeAnuncio] = useState(anuncio.anuncio.nome);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
  //const firstFieldRef = React.useRef(null)


  let anunciante = localStorage.getItem('id_anunciante')

  useEffect(() => {

    axios.get(`${baseUrl}v1/sbook/anuncio/${idPegarAnuncio}`)
      .then(response => {
        const anuncioData = response.data.anuncios;
        setAnuncio(anuncioData);
        let generos = anuncioData.generos;
        localStorage.setItem('id_anunciante', anuncioData.anuncio.anunciante);
        const generosArray = generos.map((genero) => genero.nome);
        const generosString = generosArray.join(', ');
  
        setGeneros(generosString);
      })
      .catch(error => {
        console.error('Erro ao obter dados do anúncio pelo id:', error);
      });
      
  }, [idPegarAnuncio]);



  useEffect(() => {

    axios.get(`${baseUrl}v1/sbook/usuario/${anunciante}`)
      .then(response => {
        console.log(response);
        console.log(response);
        localStorage.setItem('nome_anunciante', response.data.dados.nome)
        localStorage.setItem('perfilFotoAnunciante', response.data.dados.foto )

      })
      .catch(error => {
        console.error('Erro ao obter dados do usuario:', error);
      });
      
  }, [idPegarAnuncio,anunciante]);
  
  let anuncianteNome = localStorage.getItem('nome_anunciante')
  let perfilFotoAnunciante = localStorage.getItem('perfilFotoAnunciante')

  const Form = ({ firstFieldRef, onCancel }) => {
    return (
      <Stack spacing={4}>
        <Input
          id='nome-anuncio'
          ref={firstFieldRef}
          defaultValue={anuncio.anuncio.nome}
        />
        <ButtonGroup display='flex' justifyContent='flex-end'>
          <Button colorScheme='teal'>
            Save
          </Button>
        </ButtonGroup>
      </Stack>
    )
  }

  if (anuncio.length === 0) {
    return (
      <div className="spinnerContainer2">
      <Spinner
        thickness='4px'
        speed='0.65s'
        color='brown' 
        size='xl'
      />
    </div>
    )
  }else{
     return (
    <div className='livroContainer'>

<Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir anúncio</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <p>Tem certeza de que deseja excluir esse anúncio? Essa ação é irreversível.</p>
          </ModalBody>
          <ModalFooter>
            <Button>Excluir</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Drawer onClose={onClose2} isOpen={isOpen2} size={'xl'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Editar anúncio</DrawerHeader>
          <DrawerBody>
         
         <div className="dadosEditar">
         <Input
          id='nome-anuncio'
          placeholder='nome do anuncio'
          defaultValue={anuncio.anuncio.nome}
        />

<Textarea placeholder='Descrição do anúncio'  defaultValue={anuncio.anuncio.descricao} />

<select id="editora" className='dadoDoAnuncio'>
  <option value={anuncio.anuncio.ano_lancamento}>{anuncio.anuncio.ano_lancamento}</option>
  <option value="2023">2023</option>
  <option value="2022">2022</option>
  <option value="2021">2021</option>
  <option value="2020">2020</option>
</select>
         </div>

        
          </DrawerBody>
        </DrawerContent>
      </Drawer>
                   <div className="sideBarContainer">
                <Link to='/'>&larr;</Link>
                <div className="menuLocalContainer">
                  <div className="botoesEditarMenuLocalContainer">
                  <button onClick={onOpen2}><img src={editarIcon} alt="icone de editar" className='editortrashicon'/></button>
                  <button onClick={onOpen
                  }><img src={excluirIcon} alt="icone de exclusao" className='editortrashicon' /></button>
                  </div>
                    <span className='nomeDaCidade'>{cidadeUsuario}</span>
                </div>
            </div>
      {/* <Slider {...settings}>
        {images.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt={`Imagem ${index + 1}`} />
          </div>
        ))}
      </Slider> */}
      <div className="anuncioDados">
        <img src={anuncio.foto[0].foto} alt="foto do anuncio" className='fotoAnuncio' />
        <div className="dadosAnuncioPrincipal">
          <div className="esquerdaDadosAnuncio">
          <p>{anuncio.anuncio.nome}</p>
         <p>Disponivel para: {anuncio.tipo_anuncio[0].tipo}</p>
         <p>{generos}</p>
          </div>
          <div className="direitaDadosAnuncio">
        <Link to='/chat'><button className='messageButton'>Enviar mensagem</button></Link> 
        <div className="anuncianteDados">
          <img src={perfilFotoAnunciante} alt="foto perfil do anunciante" className='fotoUser' />
          <div className="nomeAnunciante">
            <p>{anuncianteNome}</p>
            <p>{anuncio.endereco.cidade}, {anuncio.endereco.estado}</p>
          </div>
        </div>
          </div>
       
        </div>
        
      </div>
      <div className="descricaoContainer">
        <h3 className='titleContainerDesc'>Descrição:</h3>
        <p>{anuncio.anuncio.descricao}</p>
      </div>
      <div className="descricaoContainer">
        <h3 className='titleContainerDesc'>Informações:</h3>
       <div className="dadosLivro">
        <div className="dadoLivro">
          <h3>Ano de edição</h3>
          <p>{anuncio.anuncio.ano_lancamento}</p>
        </div>
        <div className="dadoLivro">
          <h3>Autor</h3>
          <p>{anuncio.autores[0].nome}</p>
        </div>
        <div className="dadoLivro">
          <h3>Editora</h3>
          <p>{anuncio.editora.nome}</p>
        </div>
        <div className="dadoLivro">
          <h3>Idioma</h3>
          <p>{anuncio.idioma.nome}</p>
        </div>
        <div className="dadoLivro">
          <h3>Estado do livro</h3>
          <p>{anuncio.estado_livro.estado}</p>
        </div>
       </div>
      </div>
    </div>
  );
  }
 
}

export default MeuLivro;