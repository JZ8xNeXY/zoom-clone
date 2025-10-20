import { FiMessageCircle, FiPhone, FiCopy } from 'react-icons/fi';
import './Meeting.css';
import { VideoTile } from './VideoTile';
import { MediaControls } from './MediaControls';

function Meeting() {
  return (
    <div className='meeting-container'>
      <div className='video-area'>
        <div className='video-grid'>
          <VideoTile />
          <VideoTile />
        </div>
      </div>

      <div className='control-bar'>
        <MediaControls />

        <button className='control-button'>
          <FiMessageCircle />
        </button>

        <button className='control-button'>
          <FiCopy />
        </button>

        <button className='control-button leave-button'>
          <FiPhone />
        </button>
      </div>
    </div>
  );
}

export default Meeting;
