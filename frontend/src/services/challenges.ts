import axios from 'axios';

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI}/challenges`;
const token = localStorage.getItem('token');

interface Challenge {
    id?: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    progress?: { date: string; completed: boolean }[];
    status?: string;
    userId: string;
}

export const getChallengesByUser = async () => {
    const response = await axios.get(`${API_URL}`, { headers: { Authorization: token } });
    return response.data;
};

export const createChallenge = async (challenge: Challenge) => {
    const response = await axios.post(API_URL, challenge, { headers: { Authorization: token } });
    return response.data;
};

// Update Challenge
export const updateChallenge = async (id: string, challenge: Challenge) => {
    const response = await axios.put(`${API_URL}/${id}`, challenge, { headers: { Authorization: token } });
    return response.data;
};

// Update Challenge Progress
export const updateChallengeProgress = async (id: string, date: string, completed: boolean) => {
    const response = await axios.post(`${API_URL}/${id}/progress`, { date, completed }, { headers: { Authorization: token } });
    return response.data;
};
