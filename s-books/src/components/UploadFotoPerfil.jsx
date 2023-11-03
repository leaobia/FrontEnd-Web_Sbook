import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL, getFileBlob } from "firebase/storage";
import { storage } from "../adapters/firebase";
import { baseUrl } from '../url';

function UploadFotoPerfil() {
    let perfilFoto = localStorage.getItem('perfilFotoConfig')
    let idUsuario = localStorage.getItem('id_usuarioLogin') 
  const [imagem, setImagem] = useState('');


  useEffect(() => {
    axios.get(`${baseUrl}v1/sbook/usuario/${idUsuario}`)
      .then(response => {
      
        let foto = response.data.dados.foto


       setImagem(foto)
     //  localStorage.setItem('perfilFotoConfig', foto)
      })
      .catch(error => {
        console.error('Erro ao obter dados do usuario:', error);
      })
  }, [idUsuario]);

  function mudarFoto(e) {

    const inputFile = e.target;

    const pictureImage = document.querySelector(".picture__image4");

    const file = inputFile.files[0];

    
    if (file) {
      const img = document.createElement("img");

      img.src = URL.createObjectURL(file);
         
      img.classList.add("picture__img");

      pictureImage.textContent = "";
      pictureImage.appendChild(img);

      const storageRef = ref(storage, `images/${file.name}`)
const uploadTask = uploadBytesResumable(storageRef, file)

uploadTask.on(
  "state_changed",
  snapshot => {

  }, 
  error => {
      alert(error)
  },
  () => {
      getDownloadURL(uploadTask.snapshot.ref).then(url => {
        console.log(url);
        setImagem(url)
          localStorage.setItem('dataImageURLPerfil', url)
      })
  }
)

    } else {
      pictureImage.textContent = "";
    }
  }

  return (
    <div className="uploadContainer">
      <label className="picture4" htmlFor="picture__input4" tabIndex="0">
        <span className="picture__image4">
          <img src={imagem} alt="Imagem de perfil" />
        </span>
      </label>

      <input type="file" onBlur={mudarFoto} name="picture__input4" id="picture__input4" accept="image/*" />
    </div>
  );
}

export default UploadFotoPerfil;
