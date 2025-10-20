import { Link } from 'react-router-dom';
import './Settings.css';

function Settings() {
  return (
    <div className='settings-container'>
      <nav className='settings-navbar'>
        <div className='navbar-left'>
          <h1 className='logo'>Zoom Clone</h1>
        </div>
        <div className='navbar-right'>
          <Link to='' className='back-home-link'>
            ホームに戻る
          </Link>
        </div>
      </nav>
      <main className='settings-main'>
        <div className='settings-content'>
          <h2 className='page-title'>設定</h2>
          <div className='settings-section'>
            <h3>プロフィール設定</h3>
            <form className='settings-form'>
              <div className='form-group'>
                <label htmlFor='displayName'>表示名</label>
                <input id='displayName' type='text' />
              </div>
              <button type='button' className='save-button'>
                プロフィールを保存
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
