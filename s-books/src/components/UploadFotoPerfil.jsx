import React, { useState } from 'react';

function UploadFotoPerfil() {
    let perfilFoto = localStorage.getItem('perfilFoto')
  const [imagem, setImagem] = useState(perfilFoto);

  function mudarFoto(e) {
    const inputFile = e.target;
    const pictureImage = document.querySelector(".picture__image4");
    const file = inputFile.files[0];

    if (file) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.classList.add("picture__img4");
      pictureImage.textContent = "";
      pictureImage.appendChild(img);

      // Atualize o estado para a nova imagem
      setImagem(img.src);
    } else {
      pictureImage.textContent = "";
      // Volte para a imagem padrão
      setImagem(perfilFoto);
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
