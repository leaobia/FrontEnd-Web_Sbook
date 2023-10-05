//import { useRef } from 'react';

function Upload() {

  const inputFile = document.querySelector("#picture__input");
  const pictureImage = document.querySelector(".picture__image");
  const pictureImageTxt = "Choose an image";
  pictureImage.innerHTML = pictureImageTxt;

  inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;

        const img = document.createElement("img");
        img.src = readerTarget.result;
        img.classList.add("picture__img");

        pictureImage.innerHTML = "";
        pictureImage.appendChild(img);
      });

      reader.readAsDataURL(file);
    } else {
      pictureImage.innerHTML = pictureImageTxt;
    }
  });


  //const filesElement = useRef(null);

  // const sendFile = async () => {
  //   const dataForm = new FormData();
  //   for (const file of filesElement.current.files) {
  //     dataForm.append('file', file);
  //   }
  //   const res = await fetch(`http://localhost:8080/upload`, {
  //     method: 'POST',
  //     body: dataForm,
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };


  // const sendFile = async () => {
  //   const imagensFile = document.getElementById('imagensFile')
  //   let file = document.getElementById('arquivo').value
  //   let imgUrl = URL.createObjectURL(file)
  //   const imagem = document.createElement('img')
  //   imagem.src = imgUrl
  //   imagem.classList.add('imagem')
  //   imagensFile.append(imagem)
  // };

  return (
    <div className="uploadContainer">
      <label class="picture" for="picture__input" tabIndex="0">
        <span class="picture__image"></span>
      </label>

      <input type="file" name="picture__input" id="picture__input"></input>
    </div>
  );
}

export default Upload;