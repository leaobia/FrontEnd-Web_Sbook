import { anoAtual } from "../url"
import Upload from "../components/Upload"
import { Link } from "react-router-dom"

let cidadeUsuario = localStorage.getItem('cidadeUsuario')


function Anunciar2() {
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
                        <input type="text" name="pagLivro" className='dadoDoAnuncio' />
                    </div>
                    <div className="dadoAnuncio">
                        <label htmlFor="anoLivro">Qual o ano de lançamento?</label>
                        <input type="number" min="1999" max={anoAtual} name="anoLivro" className='dadoDoAnuncio' />
                    </div>
                </div>
                <div className="dadosAnunciarContainer">
                    <div className="dadoAnuncio">
                        <label htmlFor="edicaoLivro">Digite a edição do livro:</label>
                        <input type="text" name="edicaoLivro" className='dadoDoAnuncio' />
                    </div>
                    <div className="dadoAnuncio">
                        <label htmlFor="isbnLivro">Digite o ISBN:</label>
                        <input type="text" name="isbnLivro" className='dadoDoAnuncio' />
                    </div>
                </div>
            </div>
            <Upload/>
            <Link id='continuarAnuncio2' to='/anunciar3'><button>Continuar</button></Link>
        </div>
    )
}

export default Anunciar2