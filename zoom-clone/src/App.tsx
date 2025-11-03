import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Meeting from './pages/Meeting'
import Settings from './pages/Settings'
import { useSetAtom } from 'jotai'
import { currentUserAtom } from './modules/auth/current-user.state'
import { authRepository } from './modules/auth/auth.repository'
import { useEffect,useState } from 'react'
import AuthGuard from './components/AuthGuard'
import { FlashMessage } from './components/FlashMessage'

function App() {
  const [isLoading,setIsLoading] = useState(true)
  const setCurrentUser = useSetAtom(currentUserAtom)

  useEffect(() => {
    fetchCurrentUser()
  },[])

  //ページを開くとfetCurrentUserが実行
  //getCurrentUserが実行
  //apiのGETが実行
  //api.interceptors.request.use(addAuthorizationHeader)が実行
  //ローカルストレージのtokenを読み込み
  //setCurrentUser(user)でjotaiに保存
  const fetchCurrentUser = async () => {
    try{
      const user = await authRepository.getCurrentUser()
      setCurrentUser(user)
    }catch(error){
      console.error(error)
    }finally{
      setIsLoading(false)
    }
  }
  if(isLoading) return <div />

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/' element={<AuthGuard />}>
            <Route index element={<Home />} />
            <Route path="/meetings/:id" element={<Meeting />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
        <FlashMessage />
      </BrowserRouter>
    </>
  )
}

export default App
