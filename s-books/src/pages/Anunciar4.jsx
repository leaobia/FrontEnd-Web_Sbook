import '../components/css/Anunciar.css'
import { Link } from "react-router-dom"
function Anunciar4() {
    let cidadeUsuario = localStorage.getItem('cidadeUsuario')
    let imgLivro = localStorage.getItem('dataImage')
    return (
        <div className="queroAnunciar">
            <div className="sideBarContainer">
            <Link to='/anunciar3'>&larr;</Link>
                <div className="menuLocalContainer">
                    <span className='nomeDaCidade'>{cidadeUsuario}</span>
                </div>
            </div>
            <h1>Agora confira as informações do livro antes de publicar! </h1>
            <div className="anunciarContainer">
                    <img src={imgLivro} alt="imagem do livro" className='imagemLivro'/>
            </div>
        </div>

    )
}

export default Anunciar4