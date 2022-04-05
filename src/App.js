import './App.scss';
import ImageItem from './components/image-component/ImageItem.component';
import VideoItem from './components/video-component/VideoItem.component';

function App() {
  return (
    <>
      <nav className='navbar'>
        <h3>Video Editor</h3>
      </nav>
      <div className="App">
        <ImageItem />
        <VideoItem />
      </div>
    </>
  );
}

export default App;
