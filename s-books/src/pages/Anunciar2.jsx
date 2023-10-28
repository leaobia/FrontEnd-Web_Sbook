import { anoAtual } from "../url"
import Upload from "../components/Upload"
import Upload2 from "../components/Upload2";
import Upload3 from "../components/Upload3";
import { Link } from "react-router-dom"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../url';


let cidadeUsuario = localStorage.getItem('cidadeUsuario')


function Anunciar2() {

    const [anoValue, setAnoValue] = useState('');
    const [isbnValue, setIsbnValue] = useState('');
    const [pagValue, setPagValue] = useState('');
    const [edicaoValue, setEdicaoValue] = useState('');
    const [editoraValue, setEditoraValue] = useState('');

    const [editoraArray, setEditoraArray] = useState([]);

    let autorCadastro2 = document.getElementById('editoraCadastro2')





    useEffect(() => {
      if(autorCadastro2){
        if (editoraValue === "outro") {
          autorCadastro2.classList.remove("dadoInvisivel");
        } else {
          autorCadastro2.classList.add("dadoInvisivel");
        }
      }
  
    })

    useEffect(() => {
  
        axios.get(`${baseUrl}v1/sbook/editoras`)
          .then(response => {
                    let editoras = response.data.editoras
                    setEditoraArray(editoras)
          })
          .catch(error => {
            console.error('Erro ao obter dados das editoras', error);
          });
      });


    function coletarDados(){
        localStorage.setItem('anoValue', anoValue)
        localStorage.setItem('isbnValue', isbnValue)
        localStorage.setItem('pagValue', pagValue)
        localStorage.setItem('edicaoValue', edicaoValue)
        localStorage.setItem('editoraValue', editoraValue)

        // const file = localStorage.getItem('dataImage')
        // const file2 = localStorage.getItem('dataImage2')
        // const file3 = localStorage.getItem('dataImage3')

        // if(file && file2 && file3){
        //     handleUpload()
        // }else{
        //     alert('preencha todas as imagens')
        // }
       
    }

    const pegarIdEditora = () => {
        const autores = document.querySelector("#editora");
    const autorKey = autores.options[autores.selectedIndex].id
    
    localStorage.setItem('editorakey', autorKey)
    
    console.log(autorKey);
       }

    return (
        <div className="queroAnunciar">
            <div className="sideBarContainer">
            <Link to='/anunciar'>&larr;</Link>
                <div className="menuLocalContainer">
                    <span className='nomeDaCidade'>{cidadeUsuario}</span>
                </div>
            </div>
            <h1>Excelente! Agora adicione mais detalhes! </h1>
            <div className="inputsAnunciar inputsAnunciar2">
                <div className="dadosAnunciarContainer">
                    <div className="dadoAnuncio">
                        <label htmlFor="pagLivro">Digite o número de páginas:</label>
                        <input type="text" name="pagLivro" className='dadoDoAnuncio' value={pagValue} onChange={(e) => setPagValue(e.target.value)}/>
                    </div>
                    <div className="dadoAnuncio">
                        <label htmlFor="anoLivro">Qual o ano de lançamento?</label>
                        <input type="number" min="1999" max={anoAtual} name="anoLivro" className='dadoDoAnuncio' value={anoValue} onChange={(e) => setAnoValue(e.target.value)}/>
                    </div>
                </div>
                <div className="dadosAnunciarContainer">
                    <div className="dadoAnuncio">
                        <label htmlFor="edicaoLivro">Digite a edição do livro:</label>
                        <input type="text" name="edicaoLivro" className='dadoDoAnuncio' value={edicaoValue} onChange={(e) => setEdicaoValue(e.target.value)}/>
                    </div>
                    <div className="dadoAnuncio">
                        <label htmlFor="edicaoLivro">Digite a editora do livro:</label>
                        <select id="editora" className='dadoDoAnuncio' value={editoraValue} onChange={(e) => setEditoraValue(e.target.value)} onBlur= {pegarIdEditora}>
  <option value=""></option>
  <option value="outro">Adicionar outro</option>
  {editoraArray.map(editora => (
    <option id={editora.id} value={editora.nome}>{editora.nome}</option>
  ))}
</select>
                    </div>
                    <div className="dadoAnuncio">
                        <input type="text" name="editoraLivro" className='dadoDoAnuncio dadoInvisivel' id='editoraCadastro2' placeholder='  digite o nome da editora'/>
                        </div>
                    <div className="dadoAnuncio">
                        <label htmlFor="isbnLivro">Digite o ISBN:</label>
                        <input type="text" name="isbnLivro" className='dadoDoAnuncio' value={isbnValue} onChange={(e) => setIsbnValue(e.target.value)}/>
                    </div>
                </div>
            </div>
            <h2 className="instrucaoImg">Insira uma imagem frontal, lateral e traseira.</h2>
            <div className="imagensContainer">
            <Upload/>
            <Upload2/>
            <Upload3/>
            </div>
            <Link id='continuarAnuncio' to='/anunciar3'><button onClick={coletarDados}>Continuar</button></Link>
        </div>
    )
}

export default Anunciar2