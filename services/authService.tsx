import apiClient from './apiClient';
import { storageService } from './storageService';

const API_URL = '/api/auth';

export const authService = {
    async login(credentials: { email: string; password: string }) {
        try {
            const response = await apiClient.post(`${API_URL}/login`, credentials);
            const token = response.data.token;

            await storageService.saveToken(token);

            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erreur lors de la connexion:', error.message);
            } else {
                console.error('Erreur inconnue:', error);
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
                console.error('Erreur lors de l\'inscription:', error.message);
            } else {
                console.error('Erreur inconnue:', error);
            }
        }
    },

    async getCurrentUser() {
        try {
            const response = await apiClient.get(`${API_URL}/me`);
            return response.data;
        } catch (error) {
            throw new Error('Impossible de récupérer les données utilisateur.');
        }
    },

    async logout() {
        // Supprimer le token localement
        await storageService.removeToken();

        // Supprimer l'en-tête Authorization
        delete apiClient.defaults.headers.common['Authorization'];
    },
};
