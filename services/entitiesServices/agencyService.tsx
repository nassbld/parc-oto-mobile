import apiClient from '../apiClient';
import {AgencyDTO} from "../../dtos/dtos";

export const agencyService = {
    getAll: async () => {
        const response = await apiClient.get<AgencyDTO[]>('/agencies');
        return response.data;
    },

    // Ajoutez les autres méthodes similaires à vehicleService
};
