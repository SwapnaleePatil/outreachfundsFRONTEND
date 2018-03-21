import axios from 'axios';

var axiosI = axios.create({
    baseURL: 'http://localhost:4000/',
});


export default axiosI;

