import axios from "axios";

const api=axios.create({
    baseURL:process.env.server_uil,
    withCredentials:true
})

export default api