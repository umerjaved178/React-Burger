import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burger-3ca8b-default-rtdb.firebaseio.com/'
});

export default axiosInstance;