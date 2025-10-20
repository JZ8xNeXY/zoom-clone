import { Link } from 'react-router-dom';
import { FiVideo, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import './Home.css';

function Home() {
  return (
    <div className='home-container'>
      <nav className='navbar'>
        <div className='navbar-left'>
          <h1 className='logo'>Zoom Clone</h1>
        </div>
        <div className='navbar-right'>
          <span className='username'>田中太郎</span>
          <Link to='' className='settings-button'>
            <FiSettings /> 設定
          </Link>
          <button className='logout-button'>
            <FiLogOut /> ログアウト
          </button>
        </div>
      </nav>

      <main className='main-content'>
        <div className='meeting-cards'>
          <div className='meeting-card'>
            <div className='card-icon camera-icon'>
              <FiVideo />
            </div>
            <h3>新しいミーティング</h3>
            <button className='start-meeting-button'>ミーティングを開始</button>
          </div>

          <div className='meeting-card'>
            <div className='card-icon user-icon'>
              <FiUser />
            </div>
            <h3>ミーティングに参加</h3>
            <form className='join-form'>
              <input
                type='text'
                placeholder='会議ID'
                className='meeting-id-input'
              />
              <button type='submit' className='join-button'>
                参加
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
