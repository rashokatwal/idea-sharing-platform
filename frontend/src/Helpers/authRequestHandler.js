import axios from 'axios';

const authUserRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

authUserRequest.interceptors.request.use(
    (config) => {
        config.headers["APIKey"] = import.meta.env.VITE_API_KEY;
        config.headers["userToken"] = JSON.parse(localStorage.getItem("user")).token;
        return config;
    },
    (error) => Promise.reject(error)
);

export default authUserRequest;