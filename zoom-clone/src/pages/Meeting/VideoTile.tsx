import { FiVolumeX } from 'react-icons/fi';
import type { Participant } from '../../modules/meetings/meeting.hook';

interface VideoTileProps {
  participant:Participant
}

export function VideoTile({participant}:VideoTileProps) {
  return (
    <div className={'video-tile'}>
      {/* //VIDEOの要素 */}
      <video ref={(video) =>{
        if(video){
          video.srcObject=participant.stream
        }
      }}
      autoPlay
      playsInline
      style={{width:"100%",height:'100%',objectFit:'cover'}}
      />
      
      <div className='participant-info'>
        <span className='participant-name'>{participant.name}</span>
        <span className='host-badge'>ホスト</span>
        {!participant.voiceOn && (
        <span className='mute-icon'>
          <FiVolumeX />
        </span>
      )}
      </div>
    </div>
  );
}
