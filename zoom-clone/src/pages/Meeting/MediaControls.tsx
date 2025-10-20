import { FiMic, FiVideo } from 'react-icons/fi';

export function MediaControls() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <button className={`control-button `}>
        <FiMic />
      </button>
      <button className={`control-button `}>
        <FiVideo />
      </button>
    </div>
  );
}
