import axios from 'axios';
import { storageService } from './storageService';

const apiClient = axios.create({
    baseURL: 'http://192.168.1.37:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = await storageService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Requête envoyée :', {
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data,
        });
        return config;
    },
    (error) => {
        console.error('Erreur lors de l’envoi de la requête :', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        console.log('Réponse reçue :', {
            url: response.config.url,
            status: response.status,
            data: response.data,
        });
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('Erreur dans la réponse :', {
                url: error.response.config.url,
                status: error.response.status,
                data: error.response.data,
            });
        } else {
            console.error('Erreur réseau ou autre :', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
