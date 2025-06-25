import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:9081/api',
    timeout: 150000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json'
    }
})

export default request