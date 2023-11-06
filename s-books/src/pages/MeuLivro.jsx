import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom"
import { baseUrl } from '../url';
import axios from 'axios';
import '../components/css/Livro.css'
import { Spinner } from '@chakra-ui/react'
import excluirIcon from '../components/img/excluir.png'
import editarIcon from '../components/img/editar.png'
import { FetchEstadoLivro, FetchGeneros, FetchTipoAnuncio } from '../module/Funcoes'; 

import { Button, Modal, ModalOverlay, useDisclosure, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalFooter,
   Drawer, DrawerBody, DrawerCloseButton, DrawerHeader, DrawerOverlay, DrawerContent,
  Textarea, Input } from '@chakra-ui/react';

  import Upload from '../components/Upload';


  import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'


function MeuLivro() {

  const [isLoading, setIsLoading] = useState(false); 

const currentYear = new Date().getFullYear();
const startYear = 1900; 


const years = [];
for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
}



const [selectElement, setSelectElement] = useState(null);
const [selectElementIdiomas, setSelectElementIdiomas] = useState(null);
const [selectElementAutores, setSelectElementAutores] = useState(null);
const [selectElementEditora, setSelectElementEditora] = useState(null);

const [estadoLivro, setEstadoLivro] = useState([]);
const [generosLivro, setGenerosLivro] = useState([]);
const [tipoAnuncio, setTipoAnuncio] = useState([]);

useEffect(() => {
  if (selectElement) {
    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      selectElement.appendChild(option);
    });
  }
}, [years]);

useEffect(() => {
  
  axios.get(`${baseUrl}v1/sbook/idiomas`)
    .then(response => {
              let idiomas = response.data.idiomas
              idiomas.forEach(idioma => {
                const option = document.createElement('option');
      option.value = idioma.id;
      option.textContent = idioma.nome;
      selectElementIdiomas.appendChild(option);
              })
             
    })
    .catch(error => {
      console.error('Erro ao obter dados dos idiomas', error);
    });
});
useEffect(() => {
  
  axios.get(`${baseUrl}v1/sbook/autores`)
    .then(response => {
              let idiomas = response.data.autores
              idiomas.forEach(idioma => {
                const option = document.createElement('option');
      option.value = idioma.id;
      option.textContent = idioma.nome;
      selectElementAutores.appendChild(option);
              })
             
    })
    .catch(error => {
      console.error('Erro ao obter dados dos idiomas', error);
    });
});
useEffect(() => {
  
  axios.get(`${baseUrl}v1/sbook/editoras`)
    .then(response => {
              let idiomas = response.data.editoras
              idiomas.forEach(idioma => {
                const option = document.createElement('option');
      option.value = idioma.id;
      option.textContent = idioma.nome;
      selectElementEditora.appendChild(option);
              })
             
    })
    .catch(error => {
      console.error('Erro ao obter dados dos idiomas', error);
    });
});


  let cidadeUsuario = localStorage.getItem('cidadeUsuarioHome')
  let idPegarAnuncio = parseInt(localStorage.getItem('getAnuncioById'))

 
  const [anuncio, setAnuncio] = useState([]);
  const [generos, setGeneros] = useState([]);
 // const [nomeAnuncio, setNomeAnuncio] = useState(anuncio.anuncio.nome);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
  //const firstFieldRef = React.useRef(null)




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

  let anunciante = localStorage.getItem('id_anunciante')
  const [idAnunciante, setIdAnunciante] = useState(anunciante)

  useEffect(() => {

    setIsLoading(true);

    if(idAnunciante){

      axios.get(`${baseUrl}v1/sbook/usuario/${idAnunciante}`)
      .then(response => {
        localStorage.setItem('nome_anunciante', response.data.dados.nome)
        localStorage.setItem('perfilFotoAnunciante', response.data.dados.foto)
        setTimeout(() => {
          console.log(idAnunciante);
          setIsLoading(false);
        }, 100); 
      })
      .catch(error => {
        console.error('Erro ao obter dados do usuario:', error);
       
      })
    }else{
      setTimeout(() => {
      
       window.location.reload()
       setIsLoading(true);
      }, 1000); 
    }


  
  }, [idPegarAnuncio], [idAnunciante])
  
  let anuncianteNome = localStorage.getItem('nome_anunciante')
  let perfilFotoAnunciante = localStorage.getItem('perfilFotoAnunciante')

  const excluirAnuncio = () => {
    const url = `${baseUrl}v1/sbook/anuncio/${idPegarAnuncio}`;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        console.log(response.status);
        if(response.status === 200){
          window.location.href = '/meusAnuncios'
        }
    })
    .catch(error => {
        if(error){
          console.log(error);
          return(
            <div className="queroAnunciar componenteErro">  
            <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='45vh'
        width='40vw'
        borderRadius='20'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>
          Erro!
        </AlertTitle>
        <AlertDescription maxWidth='sm'>
          Ocorreu um erro ao excluir o anuncio
        </AlertDescription>
      </Alert></div>
          )
        }
    });
}

async function fetchDataEstadoLivro() {
  try {
    const estadoData = await FetchEstadoLivro();
    setEstadoLivro(estadoData);
  } catch (error) {
    console.error('Erro ao buscar estados do livro:', error);
  }
}

async function fetchDataGenero() {
  try {
    const generosData = await FetchGeneros();
    setGenerosLivro(generosData);
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error);
  }
}


async function fetchDataTipoLivro() {
  try {
    const tipoAnuncioData = await FetchTipoAnuncio();
    setTipoAnuncio(tipoAnuncioData);
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error);
  }
}

fetchDataEstadoLivro()
fetchDataGenero();
fetchDataTipoLivro()

  if (anuncio.length === 0 || isLoading) {
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
            <Button onClick={excluirAnuncio}>Excluir</Button>
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

<select id="editora" className='dadoDoAnuncio' ref={setSelectElement}>
  <option value={anuncio.anuncio.ano_lancamento}>{anuncio.anuncio.ano_lancamento}</option>
</select>
<select id="idiomas" className='dadoDoAnuncio' ref={setSelectElementIdiomas}>
  <option value={anuncio.anuncio.idioma}>{anuncio.idioma.nome}</option>
</select>
<select id="autores" className='dadoDoAnuncio' ref={setSelectElementAutores}>
 <option value={anuncio.autores[0].nome}>{anuncio.autores[0].nome}</option>
</select>
<select id="editora" className='dadoDoAnuncio' ref={setSelectElementEditora}>
  <option value={anuncio.editora.nome}>{anuncio.editora.nome}</option>
</select>

<div className="dadosGenero">
<p>Condição do livro:</p>
  {estadoLivro.map(estado => (
    <label id={estado.id} htmlFor="estadosSelecionados" key={estado.id}>
      <input
        type="radio"
        name="estadosSelecionados"
        value={estado.estado}
        checked={estado.estado === anuncio.estado_livro.estado}
      />
      {estado.estado}
    </label>
  ))}
</div>


<div className="dadosGenero">
<p>Gêneros:</p>
  {generosLivro.map(tipo => (
    <label key={tipo.id}>
      <input
        type="checkbox"
        value={tipo.id}
        className='check'
        checked={generos.includes(tipo.nome)}
      />
      {tipo.nome}
    </label>
  ))}
</div>


        <div className="dadosGenero">
          <p>Tipo de negociação:</p>
          {tipoAnuncio.map(tipo => (
           <label key={tipo.id}>
           <input
             type="checkbox"
             value={tipo.id}
             className='check'
             checked={anuncio.tipo_anuncio[0].tipo.includes(tipo.tipo)}
           />
           {tipo.tipo}
         </label>
          ))}
        </div>

        <div className="containerUpload">
<div className="uploadContainer ">
      <label className="picture" htmlFor="picture__input" tabIndex="0">
        <span className="picture__image">
          <img src={anuncio.foto[0].foto} alt="foto do anuncio" />
        </span>
      </label>

      <input type="file" name="picture__input" id="picture__input"></input>
    </div>
    <div className="uploadContainer ">
      <label className="picture" htmlFor="picture__input" tabIndex="0">
        <span className="picture__image">
        <img src={anuncio.foto[1].foto} alt="foto do anuncio" />
        </span>
      </label>

      <input type="file" name="picture__input" id="picture__input"></input>
    </div>
    <div className="uploadContainer ">
      <label className="picture" htmlFor="picture__input" tabIndex="0">
        <span className="picture__image">
        <img src={anuncio.foto[2].foto} alt="foto do anuncio" />
        </span>
      </label>

      <input type="file" name="picture__input" id="picture__input"></input>
    </div>
</div>

<button className='editarAnuncioButton'>editar</button>

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
      {/* <Slider>
    <div className='div1'> <img src={anuncio.foto[0].foto} alt="foto do anuncio" className='fotoAnuncio' /></div> 
       <div><img src={anuncio.foto[1].foto} alt="foto do anuncio" className='fotoAnuncio' /></div> 
       <div><img src={anuncio.foto[2].foto} alt="foto do anuncio" className='fotoAnuncio' /></div> 
      </Slider> */}
      <div className="anuncioDados">
        <div className="imgLivroDiv">
        <img src={anuncio.foto[0].foto} alt="foto do anuncio" className='fotoAnuncio' />
        <img src={anuncio.foto[1].foto} alt="foto do anuncio" className='fotoAnuncio' />
        <img src={anuncio.foto[2].foto} alt="foto do anuncio" className='fotoAnuncio' />
        </div>
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