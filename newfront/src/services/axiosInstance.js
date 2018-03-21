import axios from 'axios';

var axiosI = axios.create({
    // baseURL: 'http://192.168.200.80:3005/',
    baseURL: 'http://192.168.200.31:3000/',
});


export default axiosI;

