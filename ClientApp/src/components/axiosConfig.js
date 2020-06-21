import Axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:44334/api'
});


export default instance;