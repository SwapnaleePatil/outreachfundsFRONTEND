import axios from 'axios';

let axiosI = axios.create({
    baseURL: 'http://192.168.200.33:3005/',
});
export default axiosI;
