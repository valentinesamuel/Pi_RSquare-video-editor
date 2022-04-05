import './VideoItem.styles.scss';
import { useEffect, useRef, useState } from 'react';
import Alert from '../utility/Alert.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { nanoid } from 'nanoid'

const VideoItem = () => {

      const videoFileInput = useRef(null);
      const transcriptFileInput = useRef(null);
      const [prompt, setPrompt] = useState({ show: false, message: '' })
      const [files, setFiles] = useState({
            video: "",
            transcript: ""
      })


      const videoList = [
            {
                  id: nanoid(),
                  videoPath: 'https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png',
                  transcriptPath: '',
                  audioPath: '',
                  audioVideoPath: 'https://cdn.iconscout.com/icon/free/png-256/facetime-1-475009.png'
            },

      ]

      const [filePath, setFilePath] = useState(videoList)



      let formData = new FormData();


      // to set the input event to be trigerred on click of the buttons
      const handleVideoUploadClick = event => {
            videoFileInput.current.click();

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
            if (files && files.video) {
                  formData.append("my_file", files.video)

                  axios.post("https://video-editor-api.herokuapp.com/upload_file", formData).then((res) => {
                        console.log(res.data);
                        // setFilePath(() => { })
                  }).catch((err) => {
                        console.log(err.message);
                  });

            }

            if (files && files.transcript) {
                  formData.append("my_file", files.transcript)
                  axios.post("https://video-editor-api.herokuapp.com/upload_file", formData).then((res) => {
                        console.log(res.data);
                        // setFilePath(() => { })
                  }).catch((err) => {
                        console.log(err.message);
                  });
            }

            console.log(files);

      }, [files])



      const selectVideoeHandler = event => {
            const file = event.target.files[0]
            setFiles(prevFiles => ({ ...prevFiles, video: file.name }))
            setPrompt({ show: true, message: "Video uploaded successfully" })
            console.log(file.name);
            //call api here
            formData.append("my_file", files.video)

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
//after getting the data from uploading the text, we will use that path from the serve to download the audio
      }

      const mergeAllVideo = () => {
            // we eil loop through all the video path and send the array to the server
      }

      const clearAllData = () => {

            window.location.href = ""
      }

      const addVideoItem = () => {
            let newVideoItem = {
                  id: nanoid(),
                  videoPath: 'https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png',
                  transcriptPath: '',
                  audioPath: '',
                  audioVideoPath: 'https://cdn.iconscout.com/icon/free/png-256/facetime-1-475009.png'
            }
            setFilePath(prevFilePath => ([...prevFilePath, newVideoItem]))
      }

      return (
            <>
                  {prompt.show && <Alert message={prompt.message} />}
                  {filePath.map(videoItem => (
                        <div className="container" key={videoItem.id}>
                              <div className="image" style={{ backgroundImage: `url("${videoItem.videoPath}")` }}></div>

                              <button className='btn' onClick={handleVideoUploadClick}>Upload Image</button>
                              <input className='file-input' ref={videoFileInput} accept="image/*" type="file" onChange={selectVideoeHandler} />

                              <button className='btn' onClick={handleTranscriptUploadClick}>Upload Transcript</button>
                              <input className='file-input' accept="text/plain" type="file" ref={transcriptFileInput} onChange={selectTranscriptHandler} />

                              <button className='btn' onClick={createAudio}>Create Audio</button>

                              <button className='btn'>Merge Image and Audio</button>

                              <div className="video" style={{ backgroundImage: `url("${videoItem.audioVideoPath}")` }}>
                                    <FontAwesomeIcon icon={faCirclePlay} />
                              </div>
                        </div>
                  ))}
                  <button className='btn btn-add' onClick={addVideoItem}>Add New Video</button>
                  <br />
                  <hr />
                  <div className='cta'>
                        <button className="btn btn-clear" onClick={clearAllData}>Clear All</button>
                        <button className="btn btn-add" onClick={mergeAllVideo} >Merge All</button>
                  </div>
            </>
      )
}


export default VideoItem