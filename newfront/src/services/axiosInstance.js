import axios from 'axios';

var axiosI = axios.create({
    baseURL: 'http://localhost:3000/',
});


export default axiosI;

