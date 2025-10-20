import { VideoTile } from './VideoTile';
import { MediaControls } from './MediaControls';

export function PreviewMedia() {
  return (
    <div className='meeting-container'>
      <div className='preview-screen'>
        <div className='preview-header'>
          <h2>会議に参加する準備ができました</h2>
          <p>マイクとカメラの設定を確認してください</p>
        </div>

        <div className='preview-video-container'>
          <VideoTile />
        </div>

        <MediaControls />

        <div className='preview-actions'>
          <button className='control-button cancel-button'>キャンセル</button>
          <button className='join-meeting-button'>会議に参加</button>
        </div>
      </div>
    </div>
  );
}
