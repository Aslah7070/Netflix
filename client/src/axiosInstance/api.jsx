import axios from "axios";

const api=axios.create({
    baseURL:"https://netflix-vskg.onrender.com",
    withCredentials:true
})

export default api