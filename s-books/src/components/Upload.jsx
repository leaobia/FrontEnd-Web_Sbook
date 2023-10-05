import { useRef } from 'react';

function Upload() {
  const filesElement = useRef(null);

  const sendFile = async () => {
    const dataForm = new FormData();
    for (const file of filesElement.current.files) {
      dataForm.append('file', file);
    }
    const res = await fetch(`http://localhost:8080/upload`, {
      method: 'POST',
      body: dataForm,
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className='uploadContainer'>
      <input type="file" multiple ref={filesElement} className='fileInput'/>
      <button onClick={sendFile} className='submitButton'>Send file</button>
    </div>
  );
}

export default Upload;