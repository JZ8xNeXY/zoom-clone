import { useAtomValue } from "jotai"
import { Navigate, Outlet } from "react-router-dom"
import { currentUserAtom } from "../modules/auth/current-user.state"

const AuthGuard = () => {
  const currentUser = useAtomValue(currentUserAtom)
  if (currentUser == null) return <Navigate to ="/login" />
  
  return <Outlet />
}

export default AuthGuard