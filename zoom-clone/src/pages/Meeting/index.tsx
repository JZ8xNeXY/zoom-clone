import { FiMessageCircle, FiPhone, FiCopy } from 'react-icons/fi';
import './Meeting.css';
import { VideoTile } from './VideoTile';
import { MediaControls } from './MediaControls';
import { useParams } from 'react-router-dom';
import { meetingRepository } from '../../modules/meetings/meeting.repository';
import { useEffect, useState } from 'react';
import { PreviewMedia } from './PreviewMedia';

function Meeting() {
  const {id} = useParams()

  const [showPreview,setShowPreview] = useState(true)

  useEffect(() => {
    initialize()
  },[])

  const initialize = async() => {
    try{
      await meetingRepository.joinMeeting(id!)
      //TODO 設定

    }catch(error){
      console.error(error)
    }
  }

  if(showPreview){
    return <PreviewMedia />
  }

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
