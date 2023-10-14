function Upload3() {


  function mudarFoto(e) {
    const inputFile = e.target;
    const pictureImage = document.querySelector(".picture__image3");

    const file = inputFile.files[0];

    if (file) {
      const img = document.createElement("img");

      img.src = URL.createObjectURL(file);
      localStorage.setItem('dataImage', img.src);
      img.classList.add("picture__img3");

      pictureImage.textContent = "";
      pictureImage.appendChild(img);
    } else {
      pictureImage.textContent = "";
    }
  }
  
    return (
      <div className="uploadContainer">
        <label className="picture3" htmlFor="picture__input3" tabIndex="0">
          <span className="picture__image3"></span>
        </label>
  
        <input type="file" onBlur={mudarFoto}  name="picture__input3" id="picture__input3"></input>
      </div>
    );
  }
  
  export default Upload3;