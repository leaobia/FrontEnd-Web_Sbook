import '../components/css/Anunciar.css'
import { Link } from "react-router-dom"
function Anunciar4() {

  let cidadeUsuario = localStorage.getItem('cidadeUsuario')
  let nomeDoLivroCadastro = localStorage.getItem('nomeDoLivroCadastro')
  let nomeDoAutorCadastro = localStorage.getItem('nomeDoAutorCadastroLivro')
  let idiomas = localStorage.getItem('idiomas')
  let textAreaCadastro = localStorage.getItem('textAreaCadastro')
  let isbnValue = localStorage.getItem('isbnValue')
  let anoValue = localStorage.getItem('anoValue')
  let pagValue = localStorage.getItem('pagValue')
  let edicaoValue = localStorage.getItem('edicaoValue')
  let editoraValue = localStorage.getItem('editoraValue')
  let imgLivro = localStorage.getItem('dataImage')
  let imgLivro2 = localStorage.getItem('dataImage2')
  let imgLivro3 = localStorage.getItem('dataImage3')

  let estadosSelecionados = localStorage.getItem('estadosSelecionados');
  let generosSelecionados = localStorage.getItem('generosSelecionados');
  let tipoAnuncioSelecionados = localStorage.getItem('tipoAnuncioSelecionados');

  let nomeUsuario = localStorage.getItem('nomeUsuario')
  let perfilFoto = localStorage.getItem('fotoUsuarioHome')

console.log(estadosSelecionados);
if (estadosSelecionados) {
  estadosSelecionados = estadosSelecionados.split(','); 
}
if (generosSelecionados) {
  generosSelecionados = generosSelecionados.split(','); 
}
if (tipoAnuncioSelecionados) {
  tipoAnuncioSelecionados = tipoAnuncioSelecionados.split(','); 
}


let estadosString = estadosSelecionados.join(',');

let generosString = generosSelecionados.join(',');
let tipoAnuncioString = tipoAnuncioSelecionados.join(',');

const publicarLivro = () => {
  if(cidadeUsuario && nomeDoAutorCadastro && nomeDoLivroCadastro && idiomas && textAreaCadastro
    && isbnValue && anoValue && pagValue && edicaoValue && editoraValue && imgLivro && imgLivro2 
    && imgLivro3 && estadosSelecionados && generosSelecionados && tipoAnuncioSelecionados && nomeUsuario && perfilFoto ){
      alert('tudo pegado')
  }else{
    alert('falta dados')
  }
}


  return (
    <div className="queroAnunciar3">
      <div className="sideBarContainer">
        <Link to='/anunciar3'>&larr;</Link>
        <div className="menuLocalContainer">
          <span className='nomeDaCidade'>{cidadeUsuario}</span>
        </div>
      </div>
      <h1>Agora confira as informações do livro antes de publicar! </h1> 
      <button className='publicarButton' onClick={publicarLivro}>Publicar</button>
      <div className="anuncioDados">
        <div className="fotos">
        <img src={imgLivro} alt="foto do anuncio" className='fotoAnuncio' />
        <img src={imgLivro2} alt="foto do anuncio" className='fotoAnuncio' />
        <img src={imgLivro3} alt="foto do anuncio" className='fotoAnuncio' />
        </div>
        
        <div className="dadosAnuncioPrincipal">
          <div className="esquerdaDadosAnuncio">
            <p>{nomeDoLivroCadastro}</p>
            <p>{nomeDoAutorCadastro} | {anoValue}</p>
            <p>Disponivel para: {tipoAnuncioString}</p>
          </div>
          <div className="direitaDadosAnuncio">
            <Link to='/chat'><button className='messageButton'>Enviar mensagem</button></Link>
            <div className="anuncianteDados">
              <img src={perfilFoto} alt="foto perfil do anunciante" className='fotoUser' />
              <div className="nomeAnunciante">
                <p>{nomeUsuario}</p>
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
            <p>{edicaoValue}</p>
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
            <p>{estadosString}</p>
          </div>
          <div className="dadoLivro">
            <h3>Número de pag</h3>
            <p>{pagValue}</p>
          </div>
          <div className="dadoLivro">
            <h3>ISBN</h3>
            <p>{isbnValue}</p>
          </div>
          <div className="dadoLivro">
            <h3>Generos</h3>
            <p>{generosString}</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Anunciar4