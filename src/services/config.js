import axios  from "axios";



const service = axios.create({
    baseURL: "http://localhost:5005/api"
})

// tell to React that in every call will send the token
service.interceptors.request.use((req) => {
    const token = localeStorage.getItem("authToken");

// if token exists add it to the request
    if (token) {
        req.headers.authorization = `Bearer ${token}`;
    }

    return req;
})


export default service;