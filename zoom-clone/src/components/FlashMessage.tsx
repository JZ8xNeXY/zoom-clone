import './FlashMessage.css';
import { useFlashMessage } from '../modules/ui/ui.state';

export const FlashMessage = () => {
  const {flashMessage,removeMessage} = useFlashMessage()
  if (flashMessage == null) return <div />
  
  const {type, message} = flashMessage

  return (
    <div
      className={`flash-message flash-message--${type}`}
      style={{ cursor: 'pointer' }}
      onClick={removeMessage}
    >
      <div className='flash-message__icon'>{type === 'success' ? '✔︎':'✖️'}</div>
      <span className='flash-message__text'>{message}</span>
    </div>
  );
};
