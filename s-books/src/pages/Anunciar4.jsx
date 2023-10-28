import '../components/css/Anunciar.css'
import { Link } from "react-router-dom"
import { baseUrl } from '../url'
function Anunciar4() {

  let nomeDoLivroCadastro = localStorage.getItem('nomeDoLivroCadastro')

  let nomeDoAutorCadastro = localStorage.getItem('nomeDoAutorCadastroLivro')
  let keyDoAutorCadastro = localStorage.getItem('autorkey')

  console.log('keyAutor',keyDoAutorCadastro);

  let idiomas = localStorage.getItem('idiomas')
  let idiomaKey = localStorage.getItem('idiomakey')
  console.log('keyIdioma',idiomaKey);

  let textAreaCadastro = localStorage.getItem('textAreaCadastro')
  let isbnValue = localStorage.getItem('isbnValue')
  let anoValue = localStorage.getItem('anoValue')
  let pagValue = localStorage.getItem('pagValue')
  let edicaoValue = localStorage.getItem('edicaoValue')

  let editoraValue = localStorage.getItem('editoraValue')
  let editoraKey = localStorage.getItem('editorakey')
  console.log('keyEditora',editoraKey);

  let imgLivroURL = localStorage.getItem('dataImageURL')
  let imgLivro2URL = localStorage.getItem('dataImageURL2')
  let imgLivro3URL = localStorage.getItem('dataImageURL3')

  let precoLiVRO = localStorage.getItem('precoLivro')
console.log(precoLiVRO);



  let estadosSelecionados = localStorage.getItem('estadosSelecionados');
  let estadosSelecionadosId = localStorage.getItem('estadosSelecionadosId');

  let generosSelecionados = localStorage.getItem('generosSelecionados');
  let generosSelecionadosId = localStorage.getItem('generosSelecionadosId');

  let tipoAnuncioSelecionados = localStorage.getItem('tipoAnuncioSelecionados');
  let tipoAnuncioSelecionadosId = localStorage.getItem('tipoAnuncioSelecionadosId');

  let nomeUsuario = localStorage.getItem('nomeUsuario')
  let perfilFoto = localStorage.getItem('fotoUsuarioHome')

  let cidadeUsuario = localStorage.getItem('cidadeUsuarioHome')
  let estadoUsuario = localStorage.getItem('estadoUsuarioHome')

  let precoLivro = localStorage.getItem('precoLivro')
  let idUsuario = localStorage.getItem('id_usuarioLogin') 

  let estadosString = ''
  let generosString = ''
  let tipoAnuncioString = ''

//console.log('Estados selecionados: ', estadosSelecionados);

if (estadosSelecionados) {
  estadosSelecionados = estadosSelecionados.split(','); 
  estadosString = estadosSelecionados.join(',');
}

if(estadosSelecionadosId){
  estadosSelecionadosId= estadosSelecionadosId.split(',');
  estadosSelecionadosId = estadosSelecionadosId.map(id => parseInt(id));
  console.log('estado id:',estadosSelecionadosId);
}

if(generosSelecionadosId){
  generosSelecionadosId = generosSelecionadosId.split(',');
  generosSelecionadosId = generosSelecionadosId.map(id => parseInt(id));
  console.log('genero id:',generosSelecionadosId);
}
if (generosSelecionados) {
  generosSelecionados = generosSelecionados.split(','); 
  generosString = generosSelecionados.join(',');
}
if (tipoAnuncioSelecionados) {
  tipoAnuncioSelecionados = tipoAnuncioSelecionados.split(','); 
  tipoAnuncioString = tipoAnuncioSelecionados.join(',');
}

if(tipoAnuncioSelecionadosId){
  tipoAnuncioSelecionadosId= tipoAnuncioSelecionadosId.split(',');
  tipoAnuncioSelecionadosId= tipoAnuncioSelecionadosId.map(id => parseInt(id));
  console.log('tipo id:',tipoAnuncioSelecionadosId);
}

const publicarLivro = () => {

  if(keyDoAutorCadastro && nomeDoLivroCadastro && idiomaKey && textAreaCadastro
    && isbnValue && anoValue && pagValue && edicaoValue && editoraKey && imgLivroURL && imgLivro2URL
    && imgLivro3URL && estadosSelecionadosId && generosSelecionadosId && tipoAnuncioSelecionadosId && precoLiVRO == ''){

      const credentials = {
        "nome": nomeDoLivroCadastro,
        "numero_paginas": parseInt(pagValue),
        "ano_lancamento": parseInt(anoValue), 
        "descricao": textAreaCadastro,
        "edicao": edicaoValue, 
        "isbn": isbnValue, 
        "preco": precoLivro,
        "id_usuario": parseInt(idUsuario) ,
        "id_estado_livro": parseInt(estadosSelecionadosId), 
        "id_idioma": parseInt(idiomaKey), 
        "id_editora": {
          "status_editora": false,
        "id_editora": parseInt(editoraKey)
        }, 
        "fotos": [
          imgLivroURL,
          imgLivro2URL,
          imgLivro3URL
      ], 
      "tipos_anuncio": tipoAnuncioSelecionadosId,
    "generos": generosSelecionadosId, 
    "autores": [
        {
            "status_autor": false,
            "id_autor": parseInt(keyDoAutorCadastro)
        }
    ]
    }

    console.log(credentials);

    const url = `${baseUrl}v1/sbook/publicar-anuncio`;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
        .then(response => response.json())
        .then(data => {

            console.log(data);
        })
        .finally(() => {
          //window.location.href = '/meusAnuncios';
        })
        .catch(error => {
            console.error("Erro ao publicar livro:", error);
        });

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
        <img src={imgLivroURL} alt="foto do anuncio" className='fotoAnuncio' />
        <img src={imgLivro2URL} alt="foto do anuncio" className='fotoAnuncio' />
        <img src={imgLivro3URL} alt="foto do anuncio" className='fotoAnuncio' />
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
                <p>{cidadeUsuario},{estadoUsuario}</p>
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
            <h3>Número de edição</h3>
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