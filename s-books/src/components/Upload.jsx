import React from 'react';

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../adapters/firebase";

function Upload() {

  function mudarFoto(e) {

    const inputFile = e.target;

    const pictureImage = document.querySelector(".picture__image");

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
          localStorage.setItem('dataImageURL', url)
      })
  }
)

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
