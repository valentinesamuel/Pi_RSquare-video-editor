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


  const imagesList = [
    {
      imagePath: 'https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png',
      transcriptPath: '',
      audioPath: '',
      imageVideoPath: 'https://cdn.iconscout.com/icon/free/png-256/facetime-1-475009.png'
    },

  ]

  const [filePath, setFilePath] = useState(imagesList)



  let formData = new FormData();


  // to set the input event to be trigerred on click of the buttons
  const handleImageUploadClick = event => {
    imageFileInput.current.click();

  };
  const handleTranscriptUploadClick = event => {
    transcriptFileInput.current.click();
  };


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
      for (var key of formData.entries()) {
        console.log(key[0] + ': ' + key[1]);
      }
      axios.post("https://video-editor-api.herokuapp.com/upload_file", formData).then((res) => {
        console.log(res.data);
        setFilePath(() => { })
      }).catch((err) => {
        console.log(err.message);
      });

    }

    if (files && files.transcript) {
      formData.append("my_file", files.transcript)
      axios.post("https://video-editor-api.herokuapp.com/upload_file", formData).then((res) => {
        console.log(res.data);
        setFilePath(() => { })
      }).catch((err) => {
        console.log(err.message);
      });
    }

    console.log(files);

  }, [files])



  const selectImageHandler = event => {
    const file = event.target.files[0]
    setFiles(prevFiles => ({ ...prevFiles, image: file.name }))
    setPrompt({ show: true, message: "Image uploaded successfully" })
    console.log(file.name);
    //call api here
    formData.append("my_file", files.image)

    axios.post("https://video-editor-api.herokuapp.com/upload_file", formData).then((res) => {
      console.log(res.data);
      setFilePath(() => { })
    }).catch((err) => {
      console.log(err.message);
    });

  }
  const selectTranscriptHandler = event => {
    const file = event.target.files[0]
    setFiles(prevFiles => ({ ...prevFiles, transcript: file.name }))
    setPrompt({ show: true, message: "Transcrpit uploaded successfully" })

  }

  const createAudio = () => {

  }

  const addImageItem = () => {
    let newImageItem = {
      imagePath: 'https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png',
      transcriptPath: '',
      audioPath: '',
      imageVideoPath: 'https://cdn.iconscout.com/icon/free/png-256/facetime-1-475009.png'
    }
    setFilePath(prevFilePath => ([...prevFilePath, newImageItem]))
  }

  return (
    <>
      {prompt.show && <Alert message={prompt.message} />}
      {filePath.map(imageItem => (
        <div className="container">
          <div className="image" style={{ backgroundImage: `url("${imageItem.imagePath}")` }}></div>

          <button className='btn' onClick={handleImageUploadClick}>Upload Image</button>
          <input className='file-input' ref={imageFileInput} accept="image/*" type="file" onChange={selectImageHandler} />

          <button className='btn' onClick={handleTranscriptUploadClick}>Upload Transcript</button>
          <input className='file-input' accept="text/plain" type="file" ref={transcriptFileInput} onChange={selectTranscriptHandler} />

          <button className='btn' onClick={createAudio}>Create Audio</button>

          <button className='btn'>Merge Image and Audio</button>

          <div className="video" style={{ backgroundImage: `url("${imageItem.imageVideoPath}")` }}>
            <FontAwesomeIcon icon={faCirclePlay} />
          </div>
        </div>
      ))}
      <button className='btn btn-add' onClick={addImageItem}>Add New Image</button>
    </>
  )
}

export default AudioItem 