import axios from "axios";
import { base_url } from "../constants/const"

const api = axios.create({
    baseURL: base_url,
    headers: {
        'Content-Type': 'application/json'
    }
})
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)
export default api