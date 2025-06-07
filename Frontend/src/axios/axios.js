import axios from "axios";
const axiosInstance = axios.create({
     baseURL:'http://localhost:5000/api',
     timeout:6000,
     headers:{
          "Content-Type": 'application/json'
     }
})
export default axiosInstance;