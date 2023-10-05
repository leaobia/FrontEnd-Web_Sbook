import { anoAtual } from "../url"
import Upload from "../components/Upload"
import { Link } from "react-router-dom"
import React, { useState } from 'react';

let cidadeUsuario = localStorage.getItem('cidadeUsuario')


function Anunciar2() {

    const [anoValue, setAnoValue] = useState('');
    const [isbnValue, setIsbnValue] = useState('');
    const [pagValue, setPagValue] = useState('');
    const [edicaoValue, setEdicaoValue] = useState('');

    function coletarDados(){
        localStorage.setItem('anoValue', anoValue)
        localStorage.setItem('isbnValue', isbnValue)
        localStorage.setItem('pagValue', pagValue)
        localStorage.setItem('edicaoValue', edicaoValue)
    }

    return (
        <div className="queroAnunciar">
            <div className="sideBarContainer">
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
                        <label htmlFor="isbnLivro">Digite o ISBN:</label>
                        <input type="text" name="isbnLivro" className='dadoDoAnuncio' value={isbnValue} onChange={(e) => setIsbnValue(e.target.value)}/>
                    </div>
                </div>
            </div>
            <Upload/>
            <Link id='continuarAnuncio' to='/anunciar4'><button onClick={coletarDados}>Continuar</button></Link>
        </div>
    )
}

export default Anunciar2