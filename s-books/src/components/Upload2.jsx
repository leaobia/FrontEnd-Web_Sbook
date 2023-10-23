function Upload2() {

  function mudarFoto(e) {
    const inputFile = e.target;
    const pictureImage = document.querySelector(".picture__image2");

    const file = inputFile.files[0];

    if (file) {
      const img = document.createElement("img");

      img.src = URL.createObjectURL(file);
      localStorage.setItem('dataImage2', img.src);
      img.classList.add("picture__img2");

      pictureImage.textContent = "";
      pictureImage.appendChild(img);
    } else {
      pictureImage.textContent = "";
    }
  }
  
    return (
      <div className="uploadContainer">
        <label className="picture2" htmlFor="picture__input2" tabIndex="0">
          <span className="picture__image2"></span>
        </label>
  
        <input type="file" on onBlur={mudarFoto}  name="picture__input2" id="picture__input2"></input>
      </div>
    );
  }
  
  export default Upload2;