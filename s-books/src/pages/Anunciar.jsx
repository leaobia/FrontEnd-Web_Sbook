import '../components/css/Anunciar.css'
import { Link } from "react-router-dom"
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../url';



function Anunciar() {

  const [idiomaArray, setIdiomaArray] = useState([]);
  const [autorArray, setAutorArray] = useState([]);

  const [idiomaValue, setIdiomaValue] = useState('');
  const [autorValue, setAutorValue] = useState('');

  let autorCadastro2 = document.getElementById('autorCadastro2')


  useEffect(() => {
    if(autorCadastro2){
      if (autorValue === "outro") {
        autorCadastro2.classList.remove("dadoInvisivel");
      } else {
        autorCadastro2.classList.add("dadoInvisivel");
      }
    }

  })
  

useEffect(() => {
  
  axios.get(`${baseUrl}v1/sbook/idiomas`)
    .then(response => {
              let idiomas = response.data.idiomas
              setIdiomaArray(idiomas)
    })
    .catch(error => {
      console.error('Erro ao obter dados dos idiomas', error);
    });
});
useEffect(() => {
  
  axios.get(`${baseUrl}v1/sbook/autores`)
    .then(response => {
              let autores = response.data.autores
              setAutorArray(autores)
    })
    .catch(error => {
      console.error('Erro ao obter dados dos autores', error);
    });
});
    let cidadeUsuario = localStorage.getItem('cidadeUsuario')


    const pegarValores = () => {

       let nomeDoLivroCadastro = document.getElementById('nomeDoLivroCadastro').value
       let nomeDoAutorCadastro = autorValue
       let idiomas = idiomaValue
      // let idiomaNome = document.getElementById('idiomas').textContent

       let textAreaCadastro = document.getElementById('textAreaCadastro').value

       console.log(nomeDoLivroCadastro,nomeDoAutorCadastro,idiomas,textAreaCadastro);

       localStorage.setItem('nomeDoLivroCadastro', nomeDoLivroCadastro)
       localStorage.setItem('nomeDoAutorCadastroLivro', nomeDoAutorCadastro)
       localStorage.setItem('idiomas', idiomas)
       localStorage.setItem('textAreaCadastro', textAreaCadastro)
    } 


      const abrirLogin = () => {
    document.getElementById('botaoLogin').click()
  }

  
    let idUsuario = localStorage.getItem('id_usuarioLogin') 

   const pegarIdAutores = () => {
    const autores = document.querySelector("#autores");
const autorKey = autores.options[autores.selectedIndex].id

localStorage.setItem('autorkey', autorKey)

console.log(autorKey);
   }

   const pegarIdIdiomas= () => {
    const autores = document.querySelector("#idiomas");
const autorKey = autores.options[autores.selectedIndex].id

localStorage.setItem('idiomakey', autorKey)

console.log(autorKey);
   }

   let idioma = localStorage.getItem('idiomakey')
   //console.log('idiomaId', idioma);


    if(!idUsuario){
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
          Você ainda não fez o login
        </AlertDescription>
        <button className='fazerLoginButton' onClick={abrirLogin}>Fazer Login</button>
      </Alert></div>
        )
      }
    return (
        <div className="queroAnunciar">
            <div className="sideBarContainer">
            <Link to='/'>&larr;</Link>
                <div className="menuLocalContainer">
                    <span className='nomeDaCidade'>{cidadeUsuario}</span>
                </div>
            </div>
            <h1>Bem-vindo ao anúncio do livro! </h1>
            <div className="anunciarContainer">
                <div className="inputsAnunciar">
                    <div className="dadosAnunciarContainer">
                        <div className="dadoAnuncio">
                            <label htmlFor="nomeLivro">Digite o nome:</label>
                            <input type="text" name="nomeLivro" className='dadoDoAnuncio' id='nomeDoLivroCadastro' />
                        </div>
                        <div className="dadoAnuncio">
                            <label htmlFor="autorLivro">Digite o autor:</label>
                            <select id="autores" className='dadoDoAnuncio'  value={autorValue} onChange={(e) => setAutorValue(e.target.value)} onBlur={pegarIdAutores}>
      <option value="vazio"></option>
      <option value="outro">Adicionar outro</option>
      {autorArray.map(autor => (
        <option id={autor.id} value={autor.nome}>{autor.nome}</option>
      ))}
    </select>
                        </div>
                           <div className="dadoAnuncio">
                        <input type="text" name="autorLivro" className='dadoDoAnuncio dadoInvisivel' id='autorCadastro2' placeholder='  digite o nome do autor'/>
                        </div>
                        <div className="dadoAnuncio">
                            <label htmlFor="idiomaLivro">Digite o idioma do livro:</label>
                            <select id="idiomas" className='dadoDoAnuncio' value={idiomaValue} onChange={(e) => setIdiomaValue(e.target.value)} onBlur={pegarIdIdiomas}>
      <option value=""></option>
      {idiomaArray.map(idioma => (
        <option id={idioma.id} value={idioma.nome}>{idioma.nome}</option>
      ))}
    </select>
                        </div>
                     
                    </div>
                    <div className="dadoAnuncio sinopseAnuncio">
                        <label htmlFor="sinopse">Sinopse:</label>
                        <textarea name="sinopse" id='textAreaCadastro'></textarea>
                    </div>
                </div>
                <Link id='continuarAnuncio' to='/anunciar2'><button onClick={pegarValores}>Continuar</button></Link>
            </div>
        </div>

    )
}

export default Anunciar