import { FiVolumeX } from 'react-icons/fi';

export function VideoTile() {
  return (
    <div className={'video-tile'}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '48px',
        }}
      >
        '📹'
      </div>
      <div className='participant-info'>
        <span className='participant-name'>テスト太郎</span>
        <span className='host-badge'>ホスト</span>
        <span className='mute-icon'>
          <FiVolumeX />
        </span>
      </div>
    </div>
  );
}
