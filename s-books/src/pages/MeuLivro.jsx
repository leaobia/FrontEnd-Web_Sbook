import React, { useEffect, useState, useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom"
import { baseUrl } from '../url';
import axios from 'axios';
import '../components/css/Livro.css'
import { Spinner } from '@chakra-ui/react'
import { FetchEstadoLivro, FetchGeneros, FetchTipoAnuncio } from '../module/Funcoes';

import {
  Button, Modal, ModalOverlay, useDisclosure, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalFooter,
  Drawer, DrawerBody, DrawerCloseButton, DrawerHeader, DrawerOverlay, DrawerContent,
  Textarea, Input
} from '@chakra-ui/react';

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../adapters/firebase";
import { set } from 'lodash';


function MeuLivro() {

  const [isLoading, setIsLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const startYear = 1900;

  const [fotoAnuncio1, setFotoAnuncio1] = useState('');

  const years = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }



  // const [selectElement, setSelectElement] = useState(null);

  // setSelectElement(years)

  const [selectIdiomas, setSelectIdiomas] = useState(null);
  const [selectElementAutores, setSelectElementAutores] = useState(null);
  const [selectElementEditora, setSelectElementEditora] = useState(null);

  const [estadoLivro, setEstadoLivro] = useState([]);
  const [generosLivro, setGenerosLivro] = useState([]);
  const [tipoAnuncio, setTipoAnuncio] = useState([]);

  // useEffect(() => {
  //   if (selectElement) {
  //     years.forEach(year => {
  //       const option = document.createElement('option');
  //       option.value = year;
  //       option.textContent = year;
  //       selectElement.appendChild(option);
  //     });
  //   }
  // }, [years]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}v1/sbook/autores`);
        setSelectElementAutores(response.data.autores);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}v1/sbook/idiomas`);
        setSelectIdiomas(response.data.idiomas);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}v1/sbook/editoras`);
        setSelectElementEditora(response.data.editoras);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  let cidadeUsuario = localStorage.getItem('cidadeUsuarioHome')
  let idPegarAnuncio = parseInt(localStorage.getItem('getAnuncioById'))


  const [anuncio, setAnuncio] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [generosId, setGenerosId] = useState([]);

  const [imgGrande, setImgGrade] = useState(null);


  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();

  useEffect(() => {

    axios.get(`${baseUrl}v1/sbook/anuncio/${idPegarAnuncio}`)
      .then(response => {
        const anuncioData = response.data.anuncios;
        setAnuncio(anuncioData);
        setFotoAnuncio1(anuncioData.foto[1].foto)
        setImgGrade(anuncioData.foto[0].foto)
        let generos = anuncioData.generos;
        console.log('anunciodata', anuncioData);
        localStorage.setItem('id_anunciante', anuncioData.anuncio.anunciante);
        const generosArray = generos.map((genero) => genero.nome);
        const generosString = generosArray.join(', ');

        const generosArray2 = generos.map((genero) => parseInt(genero.id));
        //const generosString2 = generosArray2.join(', ');

        console.log(typeof generosArray2);
        console.log(generosArray2);

        setGeneros(generosString);
        setGenerosId(generosArray2);
      })
      .catch(error => {
        console.error('Erro ao obter dados do anúncio pelo id:', error);
      });

  }, [idPegarAnuncio]);

  let anunciante = localStorage.getItem('id_anunciante')
  const [idAnunciante, setIdAnunciante] = useState(anunciante)

  useEffect(() => {

    setIsLoading(true);

    if (idAnunciante) {

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
    } else {
      setTimeout(() => {

        window.location.reload()
        setIsLoading(true);
      }, 1000);
    }



  }, [idPegarAnuncio], [idAnunciante])

  const excluirAnuncio = () => {
    const url = `${baseUrl}v1/sbook/anuncio-delete/${idPegarAnuncio}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log(response);
        console.log(response.status);
        if (response.status === 200) {
          window.location.href = '/meusAnuncios'
        }
      })
      .catch(error => {
        if (error) {
          console.log(error);
        }
      });
  }


  function mudarFoto(e) {

    const inputFile = e.target;
    console.log(inputFile);

    const pictureImage = document.getElementById('fotoAnuncio1')

    const file = inputFile.files[0];


    if (file) {


      pictureImage.src = URL.createObjectURL(file);



      const storageRef = ref(storage, `images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        snapshot => {

        },
        error => {
          alert(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            console.log(url);
            localStorage.setItem('dataImageURLEdit', url)
          })
        }
      )

    } else {
      pictureImage.textContent = "";
    }
  }

  function mudarFoto2(e) {

    const inputFile2 = e.target;


    const pictureImage = document.getElementById('fotoAnuncio2')

    const file2 = inputFile2.files[0];


    if (file2) {


      pictureImage.src = URL.createObjectURL(file2);



      const storageRef = ref(storage, `images/${file2.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file2)

      uploadTask.on(
        "state_changed",
        snapshot => {

        },
        error => {
          alert(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            console.log(url);
            localStorage.setItem('dataImageURLEdit2', url)
          })
        }
      )

    } else {
      pictureImage.textContent = "";
    }
  }

  function mudarFoto3(e) {


    const inputFile2 = e.target;


    const pictureImage = document.getElementById('fotoAnuncio3')

    const file2 = inputFile2.files[0];


    if (file2) {


      pictureImage.src = URL.createObjectURL(file2);



      const storageRef = ref(storage, `images/${file2.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file2)

      uploadTask.on(
        "state_changed",
        snapshot => {

        },
        error => {
          alert(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            console.log(url);
            localStorage.setItem('dataImageURLEdit3', url)
          })
        }
      )

    } else {
      pictureImage.textContent = "";
    }
  }

  function editarAnuncioFuction() {

    console.log('editaranuncio');
    let img1 = anuncio.foto[0].foto
    let img2 = anuncio.foto[1].foto
    let img3 = anuncio.foto[2].foto

    let nomeAnuncio = document.getElementById('nome-anuncio').value
    let descricaoAnuncio = document.getElementById('descricaoAnuncio').value
    let anoLancamentoSelect = document.getElementById('anoLancamentoSelect').value
    let idiomasSelect = parseInt(document.getElementById('idiomas').value)
    let autoresSelect = parseInt(document.getElementById('autores').value)
    let editoraSelect = parseInt(document.getElementById('editora').value)

    console.log(typeof editoraSelect);

    let dataImageURLEdit = localStorage.getItem('dataImageURLEdit')
    let dataImageURLEdit2 = localStorage.getItem('dataImageURLEdit2')
    let dataImageURLEdit3 = localStorage.getItem('dataImageURLEdit3')

    if (dataImageURLEdit) {
      img1 = dataImageURLEdit
    }
    if (dataImageURLEdit2) {
      img2 = dataImageURLEdit2
    }
    if (dataImageURLEdit3) {
      img3 = dataImageURLEdit3
    }

    const credentials = {
      "id_anuncio": idPegarAnuncio,
      "nome": nomeAnuncio,
      "numero_paginas": anuncio.anuncio.numero_paginas,
      "ano_lancamento": anoLancamentoSelect,
      "descricao": descricaoAnuncio,
      "edicao": anuncio.anuncio.edicao,
      "isbn": "8506055652",
      "preco": anuncio.anuncio.preco,
      "id_editora": editoraSelect,
      "id_estado_livro": anuncio.estado_livro.id,
      "id_idioma": idiomasSelect,
      "fotos": [
        img1,
        img2,
        img3
      ],
      "tipos_anuncio": [
        anuncio.tipo_anuncio[0].id
      ],
      "generos": generosId,
      "autores": [
      autoresSelect
      ]
    }

    const url = `${baseUrl}v1/sbook/anuncio-put`;

    console.log(credentials);

    fetch(`${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(response => {
        console.log('Response:', response);

        if (response.status === 200) {
           window.location.reload()
        } else {

          console.log("body:" + response.body);
          console.log(response.json);
        }


      })
      .catch(error => {
        console.error(error);
      });

  }

  const mudarImagemCarrossel = (event) => {
    let img = event.target.src
    setImgGrade(img)
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

  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [generoSelecionado, setGeneroSelecionado] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const handleEstadoChange = (event) => {
    // Atualiza o estado quando um estado é selecionado
    setEstadoSelecionado(event.target.value);
  };
  const handleEstadoChange2 = (event) => {
    // Atualiza o estado quando um estado é selecionado
    setGeneroSelecionado(event.target.value);
  };
  const handleEstadoChange3 = (event) => {
    // Atualiza o estado quando um estado é selecionado
    setTipoSelecionado(event.target.value);
  };


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
  } else {
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

                <Textarea placeholder='Descrição do anúncio' defaultValue={anuncio.anuncio.descricao} id='descricaoAnuncio'/>

                <select className='dadoDoAnuncio' id='anoLancamentoSelect'>
                  <option value={anuncio.anuncio.ano_lancamento}>{anuncio.anuncio.ano_lancamento}</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select id="idiomas" className='dadoDoAnuncio'>
                  <option value={anuncio.idioma.id}>{anuncio.idioma.nome}</option>
                  {selectIdiomas.map((idioma) => (
                    <option key={idioma.id} value={idioma.id}>
                      {idioma.nome}
                    </option>
                  ))}
                </select>
                <select id="autores" className='dadoDoAnuncio'>
                  <option value={anuncio.autores[0].id}>{anuncio.autores[0].nome}</option>
                  {selectElementAutores.map((autor) => (
                    <option key={autor.id} value={autor.id}>
                      {autor.nome}
                    </option>
                  ))}
                </select>
                <select id="editora" className='dadoDoAnuncio'>
                  <option value={anuncio.editora.id}>{anuncio.editora.nome}</option>
                  {selectElementEditora.map((editora) => (
                    <option key={editora.id} value={editora.id}>
                      {editora.nome}
                    </option>
                  ))}
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
                        onChange={handleEstadoChange}
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
                        onChange={handleEstadoChange2}
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
                        onChange={handleEstadoChange3}
                      />
                      {tipo.tipo}
                    </label>
                  ))}
                </div>

                <div className="containerUpload">
                  <div className="uploadContainer ">
                    <label className="picture" htmlFor="picture__input" tabIndex="0">
                      <span className="picture__image">
                        <img src={anuncio.foto[0].foto} alt="foto do anuncio" id='fotoAnuncio1' />
                      </span>
                    </label>

                    <input type="file" name="picture__input" id="picture__input" onBlur={mudarFoto}></input>
                  </div>


                  <div className="uploadContainer ">
                    <label className="picture" htmlFor="picture__input2" tabIndex="2">
                      <span className="picture__image2">
                        <img src={anuncio.foto[1].foto} alt="foto do anuncio" id='fotoAnuncio2' />
                      </span>
                    </label>

                    <input type="file" name="picture__input2" id="picture__input2" onBlur={mudarFoto2}></input>
                  </div>


                  <div className="uploadContainer ">
                    <label className="picture" htmlFor="picture__input3" tabIndex="1">
                      <span className="picture__image3">
                        <img src={anuncio.foto[2].foto} alt="foto do anuncio" id='fotoAnuncio3' />
                      </span>
                    </label>

                    <input type="file" name="picture__input3" id="picture__input3" onBlur={mudarFoto3}></input>
                  </div>
                </div>

                <button className='editarAnuncioButton' onClick={editarAnuncioFuction}>editar</button>

              </div>




            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <div className="sideBarContainer">
          <Link to='/meusAnuncios'>&larr;</Link>
          <div className="menuLocalContainer">
            <span className='nomeDaCidade'>{cidadeUsuario}</span>
          </div>
        </div>

        <div className="anuncioDados dadosDoAnuncio">



          <div className="divLivroCarrossel">
            <div className="showLivro"><img src={imgGrande} alt="foto do anuncio" className='imgGrande' /></div>
            <div className="livrosAparecer">
              <button ><img src={anuncio.foto[0].foto} alt="foto do anuncio" className='imgBtn' onClick={mudarImagemCarrossel} /></button>
              <button  ><img src={anuncio.foto[1].foto} alt="foto do anuncio" className='imgBtn' onClick={mudarImagemCarrossel} /></button>
              <button ><img src={anuncio.foto[2].foto} alt="foto do anuncio" className='imgBtn' onClick={mudarImagemCarrossel} /></button>
            </div>
          </div>
          <div className="dadosAnuncioPrincipal">
            <div className="esquerdaDadosAnuncio">
              <div>
                <p>{anuncio.anuncio.nome}</p>
                <p className='disponivelPara'>Disponivel para: {anuncio.tipo_anuncio[0].tipo}</p>
                <p>{generos}</p>
              </div>

              <div className="butonContainerMeuAnuncio">
                <button onClick={onOpen2}>Editar</button>
                <button onClick={onOpen}>Excluir</button>
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