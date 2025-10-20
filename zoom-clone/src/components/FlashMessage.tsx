import './FlashMessage.css';

export const FlashMessage = () => {
  return (
    <div
      className={`flash-message flash-message--success`}
      style={{ cursor: 'pointer' }}
    >
      <div className='flash-message__icon'>✓</div>
      <span className='flash-message__text'>メッセージが送信されました</span>
    </div>
  );
};
