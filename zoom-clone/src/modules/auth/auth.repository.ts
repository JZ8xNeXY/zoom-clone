import api from "../../lib/api"
import { User } from "../users/user.entity"


export const authRepository = {
  async signup(name:string, email:string, password:string) : Promise<{user:User,token:string}>{
    const result = await api.post('auth/signup',{
      name,
      email,
      password
    })

    const {user, token} = result.data
    return {user:new User(user),token}
  },

  async signIn(email:string,password:string){
    const result = await api.post('auth/signin',{
      email,
      password
    })

    const {user,token} = result.data
    return {user:new User(user),token}
  },

  async getCurrentUser():Promise<User | undefined>{
    const result = await api.get('auth/me')
    if (!result.data) return undefined
    return new User(result.data)
  },
}