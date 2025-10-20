import { FiSend, FiX } from 'react-icons/fi';

export function Chat() {
  return (
    <div className='chat-sidebar'>
      <div className='chat-header'>
        <h3>チャット</h3>
        <button className='close-chat'>
          <FiX />
        </button>
      </div>
      <div className='chat-messages'></div>
      <form className='chat-input'>
        <input type='text' placeholder='メッセージを入力...' />
        <button type='button'>
          <FiSend />
        </button>
      </form>
    </div>
  );
}
