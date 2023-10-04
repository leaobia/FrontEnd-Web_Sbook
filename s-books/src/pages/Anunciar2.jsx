import { anoAtual } from "../url"

let cidadeUsuario = localStorage.getItem('cidadeUsuario')

//var form = document.getElementById('imageForm');


//var imagensEnviadas = document.getElementById('imagensEnviadas');


//form.addEventListener('submit', function (event) {
//    event.preventDefault();

   // var inputImagem = document.getElementById('imagem');

    //if (inputImagem.files.length > 0) {
      //  var imagem = inputImagem.files[0];

       // var imgElement = document.createElement('img');

      //  imgElement.src = URL.createObjectURL(imagem);

    
     //   imagensEnviadas.appendChild(imgElement);

     //   inputImagem.value = '';
  //  }
//});

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

                <form action="#" method="post" enctype="multipart/form-data" id="imageForm">
                    <input type="file" name="imagem" id="imagem" accept="image/*" />
                    <input type="submit" value="Enviar Imagem" />
                </form>

                <div id="imagensEnviadas"></div>

            </div>
        </div>
    )
}

export default Anunciar2