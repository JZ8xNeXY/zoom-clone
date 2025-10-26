import axios from "axios";
import { addAuthorizationHeader } from "./interceptors/request";

const baseURL = import.meta.env.VITE_API_URL

// Axios APIクライアントの共通設定s
const api = axios.create({baseURL})
api.defaults.headers.common['Content-Type'] = 'application/json'
//API を呼び出すたびに addAuthorizationHeader 関数が呼ばれる
api.interceptors.request.use(addAuthorizationHeader)
export default api