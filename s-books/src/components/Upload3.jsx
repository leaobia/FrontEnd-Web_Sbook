
import { ref, uploadBytesResumable, getDownloadURL, getFileBlob } from "firebase/storage";
import { storage } from "../adapters/firebase";

function Upload3() {


  function mudarFoto(e) {
    const inputFile = e.target;
    const pictureImage = document.querySelector(".picture__image3");

    const file = inputFile.files[0];

    if (file) {
      const img = document.createElement("img");

      img.src = URL.createObjectURL(file);
      img.classList.add("picture__img3");

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
                localStorage.setItem('dataImageURL3', url)
            })
        }
      )
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