import { useEffect, useRef, useState } from 'react';
import Alert from '../utility/Alert.component'
import './ImageItem.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPrompt({ show: false })
    }, 1000);
    return () => clearTimeout(timeout)
  }, [prompt])

  //delete this finally. Just to confirm state has been updated
  useEffect(() => { console.log(files); }, [files])


  const handleImageUploadClick = event => {
    imageFileInput.current.click();
  };
  const handleTranscriptUploadClick = event => {
    transcriptFileInput.current.click();
  };

  const selectImageHandler = event => {
    const file = event.target.files[0]
    setFiles(prevFiles => ({ ...prevFiles, image: file.name }))
    setPrompt({ show: true, message: "Image uploaded successfully" })


  }

  const selectTranscriptHandler = event => {
    const file = event.target.files[0]
    setFiles(prevFiles => ({ ...prevFiles, transcript: file.name }))
    setPrompt({ show: true, message: "Transcrpit uploaded successfully" })

  }




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