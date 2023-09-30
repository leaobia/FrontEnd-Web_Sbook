import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom"
import { baseUrl } from '../url';
import axios from 'axios';
import '../components/css/Livro.css'
import { Spinner } from '@chakra-ui/react'

function Livro() {
  const [images, setImages] = useState([]);
  let cidadeUsuario = localStorage.getItem('cidadeUsuario')
  let idPegarAnuncio = parseInt(localStorage.getItem('getAnuncioById'))
 
  const [anuncio, setAnuncio] = useState([]);
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=1&limit=4') //
      .then((response) => response.json())
      .then((data) => {
        const imageUrls = data.map((item) => item.download_url);
        setImages(imageUrls);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  useEffect(() => {
    axios.get(`${baseUrl}v1/sbook/anuncio/${idPegarAnuncio}`)
      .then(response => {
        const anuncioData = response.data.anuncios;
        setAnuncio(anuncioData)
        let generos = anuncioData.generos
        const generosArray = generos.map((genero) => genero.nome);
        const generosString = generosArray.join(', ');
        
        setGeneros(generosString);
      })
      .catch(error => {
        console.error('Erro ao obter dados do anúncio pelo id:', error);
      });
  }, [idPegarAnuncio, anuncio]);


  console.log(anuncio);

  if (anuncio.length === 0) {
    return (
      <div className="spinnerContainer2">
      <Spinner
        thickness='4px'
        speed='0.65s'
        color='brown' 
        size='xl'
      />
    </div>
    )
  }else{
     return (
    <div className='livroContainer'>
                   <div className="sideBarContainer">
                <Link to='/'>&larr;</Link>
                <div className="menuLocalContainer">
                    <span className='nomeDaCidade'>{cidadeUsuario}</span>
                </div>
            </div>
      <Slider {...settings}>
        {images.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt={`Imagem ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <div className="anuncioDados">
        <div className="dadosAnuncioPrincipal">
          <div className="esquerdaDadosAnuncio">
          <p>{anuncio.anuncio.nome}</p>
         <p>Disponivel para: {anuncio.tipo_anuncio[0].tipo}</p>
         <p>{generos}</p>
          </div>
          <div className="direitaDadosAnuncio">
         <button>Enviar mensagem</button>
          </div>
       
        </div>
        
      </div>
    </div>
  );
  }
 
}

export default Livro;
