function Upload() {


function mudarFoto() {
  const inputFile = document.querySelector("#picture__input");
  const pictureImage = document.querySelector(".picture__image");

  inputFile.removeEventListener("change", mudarFoto);

  inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;

    const file = inputTarget.files[0];

    if (file) {
      const img = document.createElement("img");

      // Atribui a URL da imagem diretamente ao src
      img.src = URL.createObjectURL(file);
      localStorage.setItem('dataImage', img.src);
      img.classList.add("picture__img");

      pictureImage.textContent = "";
      pictureImage.appendChild(img);
    } else {
      pictureImage.textContent = "";
    }
  });
}

  
  
  return (
    <div className="uploadContainer">
      <label className="picture" htmlFor="picture__input" tabIndex="0">
        <span className="picture__image"></span>
      </label>

      <input type="file" onChange={mudarFoto}  name="picture__input" id="picture__input"></input>
    </div>
  );
}

export default Upload;