import '../components/css/Anunciar.css'
import { Link } from "react-router-dom"
function Anunciar() {
    let cidadeUsuario = localStorage.getItem('cidadeUsuario')
    const pegarValores = () => {

       let nomeDoLivroCadastro = document.getElementById('nomeDoLivroCadastro').value
       let nomeDoAutorCadastro = document.getElementById('nomeDoAutorCadastro').value
       let idiomas = document.getElementById('idiomas').value
       let textAreaCadastro = document.getElementById('textAreaCadastro').value

       console.log(nomeDoLivroCadastro,nomeDoAutorCadastro,idiomas,textAreaCadastro);

       localStorage.setItem('nomeDoLivroCadastro', nomeDoLivroCadastro)
       localStorage.setItem('nomeDoAutorCadastro', nomeDoAutorCadastro)
       localStorage.setItem('idiomas', idiomas)
       localStorage.setItem('textAreaCadastro', textAreaCadastro)
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
                            <input type="text" name="autorLivro" className='dadoDoAnuncio' id='nomeDoAutorCadastro' />
                        </div>
                        <div className="dadoAnuncio">
                            <label htmlFor="idiomaLivro">Digite o idioma do livro:</label>
                            <select id="idiomas" className='dadoDoAnuncio'>
                                <option value=""></option>
                                <option value="pt-br">pt-br</option>
                                <option value="eng-us">eng-us</option>
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