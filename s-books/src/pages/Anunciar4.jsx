import '../components/css/Anunciar.css'
import { Link } from "react-router-dom"
function Anunciar4() {

    let cidadeUsuario = localStorage.getItem('cidadeUsuario')
    let nomeDoLivroCadastro = localStorage.getItem('nomeDoLivroCadastro')
    let nomeDoAutorCadastro = localStorage.getItem('nomeDoAutorCadastro')
    let idiomas = localStorage.getItem('idiomas')
    let textAreaCadastro = localStorage.getItem('textAreaCadastro')
    let isbnValue = localStorage.getItem('isbnValue')
    let anoValue = localStorage.getItem('anoValue')
    let pagValue= localStorage.getItem('pagValue')
    let edicaoValue = localStorage.getItem('edicaoValue')
    let editoraValue = localStorage.getItem('editoraValue')
    let imgLivro = localStorage.getItem('dataImage')

    return (
        <div className="queroAnunciar3">
            <div className="sideBarContainer">
            <Link to='/anunciar3'>&larr;</Link>
                <div className="menuLocalContainer">
                    <span className='nomeDaCidade'>{cidadeUsuario}</span>
                </div>
            </div>
            <h1>Agora confira as informações do livro antes de publicar! </h1>
      <div className="anuncioDados">
        <img src={imgLivro} alt="foto do anuncio" className='fotoAnuncio' />
        <div className="dadosAnuncioPrincipal">
          <div className="esquerdaDadosAnuncio">
          <p>{nomeDoLivroCadastro}</p>
         <p>Disponivel para: </p>
         <p>kk</p>
          </div>
          <div className="direitaDadosAnuncio">
        <Link to='/chat'><button className='messageButton'>Enviar mensagem</button></Link> 
        <div className="anuncianteDados">
          <img src='' alt="foto perfil do anunciante" className='fotoUser' />
          <div className="nomeAnunciante">
            <p>Max Kellermen</p>
            <p>kkk</p>
          </div>
        </div>
          </div>
       
        </div>
        
      </div>
      <div className="descricaoContainer">
        <h3 className='titleContainerDesc'>Descrição:</h3>
        <p>{textAreaCadastro}</p>
      </div>
      <div className="descricaoContainer">
        <h3 className='titleContainerDesc'>Informações:</h3>
       <div className="dadosLivro">
        <div className="dadoLivro">
          <h3>Ano de edição</h3>
          <p>{anoValue}</p>
        </div>
        <div className="dadoLivro">
          <h3>Autor</h3>
          <p>{nomeDoAutorCadastro}</p>
        </div>
        <div className="dadoLivro">
          <h3>Editora</h3>
          <p>{editoraValue}</p>
        </div>
        <div className="dadoLivro">
          <h3>Idioma</h3>
          <p>{idiomas}</p>
        </div>
        <div className="dadoLivro">
          <h3>Estado do livro</h3>
          <p></p>
        </div>
       </div>
      </div>
        </div>

    )
}

export default Anunciar4