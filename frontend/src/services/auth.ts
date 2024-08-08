import axios from 'axios';

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI}/auth`;

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
};

export const register = async (name: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
};
