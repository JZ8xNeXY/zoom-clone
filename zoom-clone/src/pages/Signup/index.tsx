import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  return (
    <div className='signup-container'>
      <div className='signup-card'>
        <div className='logo'>
          <h1>Zoom Clone</h1>
        </div>

        <div className='signup-form'>
          <div className='input-group'>
            <input type='text' placeholder='氏名' />
          </div>

          <div className='input-group'>
            <input type='email' placeholder='メールアドレス' />
          </div>

          <div className='input-group'>
            <input type='password' placeholder='パスワード' />
          </div>

          <button type='button' className='signup-button'>
            アカウント作成
          </button>
        </div>

        <div className='signup-links'>
          <Link to='' className='login-link'>
            既にアカウントをお持ちの場合
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
