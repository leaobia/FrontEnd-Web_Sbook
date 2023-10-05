import { useRef } from 'react';

function Upload() {
  const filesElement = useRef(null);

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


const sendFile = async () => {
  const imagensFile = document.getElementById('imagensFile')
  let file = document.getElementById('arquivo').value
  let imgUrl = URL.createObjectURL(file)
  const imagem = document.createElement('img')
  imagem.src = imgUrl
  imagem.classList.add('imagem')
  imagensFile.append(imagem)
 };

  return (
    <div>
      <div className="uploadContainer">
      <label htmlFor="arquivo" className='labelArquivo'>Insira imagens:</label>
      <input type="file" multiple ref={filesElement} className='fileInput' id='arquivo'/>
      <button onClick={sendFile} className='submitButton'>Send file</button>
      </div>
      <div className="imagensFile" id='imagensFile'>
      </div>
    </div>
  );
}

export default Upload;