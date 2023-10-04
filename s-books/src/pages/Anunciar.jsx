import '../components/css/Anunciar.css'
function Anunciar() {
    return (
        <div className="queroAnunciar">
            <h1>Bem-vindo ao anúncio do livro! </h1>
            <div className="anunciarContainer">
                <div className="inputsAnunciar">
                    <div className="dadosAnunciarContainer">
                        <div className="dadoAnuncio">
                            <label htmlFor="nomeLivro">Digite o nome:</label>
                            <input type="text" name="nomeLivro" className='dadoDoAnuncio' />
                        </div>
                        <div className="dadoAnuncio">
                            <label htmlFor="autorLivro">Digite o autor:</label>
                            <input type="text" name="autorLivro" className='dadoDoAnuncio' />
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
                        <textarea name=""></textarea>
                    </div>
                </div>
                <button id='continuarAnuncio'>Continuar</button>
            </div>
        </div>

    )
}

export default Anunciar