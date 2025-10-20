import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  return (
    <div className='login-container'>
      <div className='login-card'>
        <div className='logo'>
          <h1>Zoom Clone</h1>
        </div>

        <div className='login-form'>
          <div className='input-group'>
            <input type='email' placeholder='メールアドレス' />
          </div>

          <div className='input-group'>
            <input type='password' placeholder='パスワード' />
          </div>

          <button type='button' className='signin-button'>
            サインイン
          </button>
        </div>

        <div className='login-links'>
          <Link to='' className='signup-link'>
            アカウント作成
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
