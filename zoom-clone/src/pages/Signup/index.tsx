import { Link } from 'react-router-dom';
import './Signup.css';
import { useState } from 'react';
import { authRepository } from '../../modules/auth/auth.repository';

function Signup() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  
  const signup = async() => {
    if(!name || !email || !password) return

    const {user,token} = await authRepository.signup(name,email,password)
    console.log(user,token)
    
  }

  return (
    <div className='signup-container'>
      <div className='signup-card'>
        <div className='logo'>
          <h1>Zoom Clone</h1>
        </div>

        <div className='signup-form'>
          <div className='input-group'>
            <input type='text' placeholder='氏名' value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className='input-group'>
            <input type='email' placeholder='メールアドレス' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className='input-group'>
            <input type='password' placeholder='パスワード' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type='button' className='signup-button' disabled={!name || !email || !password} onClick={signup}>
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

