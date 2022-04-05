import { useEffect, useRef, useState } from 'react';
import Alert from '../utility/Alert.component'
import './ImageItem.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const AudioItem = () => {
  const imageFileInput = useRef(null);
  const transcriptFileInput = useRef(null);
  const [prompt, setPrompt] = useState({ show: false, message: '' })
  const [files, setFiles] = useState({
    image: "",
    transcript: ""
  })
  const [filePath, setFilePath] = useState({
    imagePath: '',
    transcriptPath: '',
    audioPath: '',
    imageVideoPath: ''
  })
  let formData = new FormData();


  // to set the input event to be trigerred on click of the buttons


  //for removing the prompt after 1 second
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPrompt({ show: false })
    }, 1000);
    return () => clearTimeout(timeout)
  }, [prompt])

  //delete this finally. Just to confirm state has been updated
  useEffect(() => {
    if (files && files.image) {
      formData.append("my_file", files.image)
      // for (var key of formData.entries()) {
      //   console.log(key[0] + ', ' + key[1]);
      // }
      fetch(
        `https://video-editor-api.herokuapp.com/upload_file`, {
        method: "POST",
        body: JSON.stringify(formData)
      }).then((res) => {
        console.log(res.data);
        setFilePath(() => { })
      }).catch((err) => {
        console.log(err.message);
      });

    }

    if (files && files.transcript) {
      formData.append("my_file", files.transcript)
      // for (var key of formData.entries()) {
      //   console.log(key[0] + ', ' + key[1]);
      // }
    }

    console.log(files);

  }, [files])



  const selectImageHandler = event => {
    const file = event.target.files[0]
    setFiles(prevFiles => ({ ...prevFiles, image: file.name }))
    setPrompt({ show: true, message: "Image uploaded successfully" })
    console.log(file.name);


  }
  const selectTranscriptHandler = event => {
    const file = event.target.files[0]
    setFiles(prevFiles => ({ ...prevFiles, transcript: file.name }))
    setPrompt({ show: true, message: "Transcrpit uploaded successfully" })

  }

  const handleImageUploadClick = event => {
    imageFileInput.current.click();

  };
  const handleTranscriptUploadClick = event => {
    transcriptFileInput.current.click();
  };

  return (
    <div className='container'>
      {prompt.show && <Alert message={prompt.message} />}

      <div className="image"></div>

      <button className='btn btn-add' onClick={handleImageUploadClick}>Upload Image</button>
      < input className='file-input' accept="image/*" ref={imageFileInput} type="file" onChange={selectImageHandler} />

      <button className='btn btn-add' onClick={handleTranscriptUploadClick}>Upload Transcript</button>
      <input className='file-input' accept="text/plain" type="file" ref={transcriptFileInput} onChange={selectTranscriptHandler} />

      <button className='btn btn-add'>Create Audio</button>

      <button className='btn btn-add'>Merge Image and Audio</button>
      <div className="video">
        <FontAwesomeIcon icon={faCirclePlay} />
      </div>
    </div>
  )
}

export default AudioItem