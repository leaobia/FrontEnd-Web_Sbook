import React from 'react';

function Upload() {
  function mudarFoto(e) {
    const inputFile = e.target;
    const pictureImage = document.querySelector(".picture__image");

    const file = inputFile.files[0];
    console.log(file);
    localStorage.setItem('dataImage', file);

    if (file) {
      const img = document.createElement("img");


      // Atribui a URL da imagem diretamente ao src
      img.src = URL.createObjectURL(file);
   
      img.classList.add("picture__img");

      pictureImage.textContent = "";
      pictureImage.appendChild(img);
    } else {
      pictureImage.textContent = "";
    }
  }

  return (
    <div className="uploadContainer">
      <label className="picture" htmlFor="picture__input" tabIndex="0">
        <span className="picture__image"></span>
      </label>

      <input type="file" onBlur={mudarFoto} name="picture__input" id="picture__input"></input>
    </div>
  );
}

export default Upload;
