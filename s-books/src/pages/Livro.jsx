import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom"
import { baseUrl } from '../url';
import axios from 'axios';

function Livro() {
  const [images, setImages] = useState([]);
  let cidadeUsuario = localStorage.getItem('cidadeUsuario')
  let idPegarAnuncio = localStorage.getItem('getAnuncioById')


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
        const anunciosData = response.data.anuncios;
        console.log('Anuncio data:', anunciosData);
      })
      .catch(error => {
        console.error('Erro ao obter dados do anúncio pelo id:', error);
      });
  }, []);

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
    </div>
  );
}

export default Livro;
