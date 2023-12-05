import React, { Component } from "react";
import Slider from "react-slick";
import foto1 from '../components/img/biblioteca.jpeg'
import foto2 from '../components/img/biblioteca-universitaria.jpg'
import foto3 from '../components/img/biblioteca1.webp.crdownload'
import foto4 from '../components/img/3016.jpg'

class SimpleSlider extends Component {
  render() {
    const { usuario } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 700,
      slidesToShow: 3,
      slidesToScroll: 2,
      autoplay: true, 
      autoplaySpeed: 3000, 
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="slider">
        <Slider {...settings}>
          <div className="fotos foto1">
            <img src={foto4} alt="foto1" />
            <h1>Olá, {usuario}</h1>
          </div>
          <div className="fotos foto2">
            <img src={foto2} alt="foto2" />
          </div>
          <div className="fotos foto3">
            <img src={foto3} alt="foto3" />
          </div>
          <div className="fotos foto4">
            <img src={foto1} alt="foto4" />
          </div>
        </Slider>
      </div>
    );
  }
}

export default SimpleSlider;

