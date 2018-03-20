import axios from 'axios';

var axiosI = axios.create({
    baseURL: 'http://192.168.200.33:3000/',
});


export default axiosI;

