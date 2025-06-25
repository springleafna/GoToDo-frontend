import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:9081/api',
    timeout: 150000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json'
    }
})

// 请求拦截器（如需加token可在此处加）
request.interceptors.request.use(
    config => {
        // 可在此处添加token等逻辑
        return config
    },
    error => Promise.reject(error)
)

// 响应拦截器，统一返回res.data
request.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error)
)

export default request