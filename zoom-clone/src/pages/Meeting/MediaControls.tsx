import { FiMic, FiMicOff, FiVideo, FiVideoOff } from 'react-icons/fi';

interface MediaControlsProps{
  cameraOn:boolean,
  voiceOn:boolean,
  onToggleVideo:() => void,
  onToggleVoice:() => void,
}

export function MediaControls({cameraOn,voiceOn,onToggleVideo,onToggleVoice}:MediaControlsProps) {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <button className={`control-button ${voiceOn? '' :'muted'}`} onClick={onToggleVoice}>
        {voiceOn? <FiMic /> : <FiMicOff />}
      </button>
      <button className={`control-button ${cameraOn? '' :'video-off'} `} onClick={onToggleVideo}>
        {cameraOn? <FiVideo /> : <FiVideoOff />}
      </button>
    </div>
  );
}
