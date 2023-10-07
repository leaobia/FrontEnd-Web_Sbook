import { Link } from "react-router-dom"
import React, { useState } from 'react';
import { FetchGeneros, FetchEstadoLivro } from "../module/Funcoes";

let cidadeUsuario = localStorage.getItem('cidadeUsuario')



function Anunciar3() {

    let estadoLivro = FetchEstadoLivro()
    let generos = FetchGeneros()


    function coletarDados() {
        console.log('coletados');
    }

    return (
        <div className="queroAnunciar">
            <div className="sideBarContainer">
                <div className="menuLocalContainer">
                    <span className='nomeDaCidade'>{cidadeUsuario}</span>
                </div>
            </div>
            <h1>Estamos quase lá!</h1>
            <Link id='continuarAnuncio' to='/anunciar4'><button onClick={coletarDados}>Continuar</button></Link>
        </div>
    )
}

export default Anunciar3