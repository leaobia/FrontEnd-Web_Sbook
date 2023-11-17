
import { Link } from "react-router-dom";
import imagemCarrinho from './img/carrinho.png';


function MeuAnuncioCard({ anuncio, autor, tipo, endereco, foto }) {

    const anuncioId = anuncio.id

    const pegarIdAnuncio = () => {
        const idAnuncio = anuncio.id
        localStorage.setItem('getAnuncioById', idAnuncio)
        console.log(anuncioId);
       }

  return (
    <div className="personagem-card">
      <div className="imgLivro">
        <img src={foto} alt={anuncio.nome} />
      </div>

      <div className='sobreLivro'>
        <h2>{anuncio.nome}</h2>
        <div className="autorAno">
          <p>{autor}</p>
          <p className='dataLancamento'>{anuncio.ano_lancamento}</p>
        </div>
        <p>{tipo.tipo}</p>
        <p className="precoLivro">{tipo.tipo === 'Doação' ? '' :
              tipo.tipo === 'Troca' ? '' : 'R$ ' + anuncio.preco}</p>
      </div>
      <button className='botaoLinkLivro'>
        <Link to='/meuLivro'>
          <button className='botaoContainer' onClick={pegarIdAnuncio}>
            {tipo.tipo === 'Doação' ? 'Analisar' :
              tipo.tipo === 'Troca' ? 'Trocar' : 'Comprar'}
            <img src={imagemCarrinho} alt='icone de carrinho' />
          </button>
        </Link>
      </button>
      <div className="containerEnderecoFav">
        <p>
          {endereco.cidade}, {endereco.estado}
        </p>
      </div>
    </div>
  )
}

export default MeuAnuncioCard;