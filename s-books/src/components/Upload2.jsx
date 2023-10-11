function Upload2() {



    function mudarFoto() {
        const inputFile = document.querySelector("#picture__input2");
        const pictureImage = document.querySelector(".picture__image2");
      
        inputFile.removeEventListener("change", mudarFoto);
      
        inputFile.addEventListener("change", function (e) {
          const inputTarget = e.target;
      
          const file = inputTarget.files[0];
      
          if (file) {
            const img = document.createElement("img");
      
            img.src = URL.createObjectURL(file);
            localStorage.setItem('dataImage', img.src);
            img.classList.add("picture__img2");
      
            pictureImage.textContent = "";
            pictureImage.appendChild(img);
          } else {
            pictureImage.textContent = "";
          }
        });
      }
  
    return (
      <div className="uploadContainer">
        <label className="picture2" htmlFor="picture__input2" tabIndex="0">
          <span className="picture__image2"></span>
        </label>
  
        <input type="file" onChange={mudarFoto}  name="picture__input2" id="picture__input2"></input>
      </div>
    );
  }
  
  export default Upload2;