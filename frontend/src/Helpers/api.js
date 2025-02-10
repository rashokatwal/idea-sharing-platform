import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        config.headers["APIKey"] = import.meta.env.VITE_API_KEY;
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
