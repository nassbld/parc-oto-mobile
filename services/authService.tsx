import apiClient from './apiClient';

const API_URL = '/auth';

export const authService = {
    async login(credentials: { email: string; password: string }) {
        try {
            const response = await apiClient.post(`${API_URL}/login`, credentials);
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Une erreur inconnue s’est produite.');
            }
        }
    },

    async register(userData: {
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        matricule: string;
        phone: string;
    }) {
        try {
            const response = await apiClient.post(`${API_URL}/register`, userData);
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Une erreur inconnue s’est produite.');
            }
        }
    },
};
