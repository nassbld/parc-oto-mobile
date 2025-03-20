import apiClient from '../apiClient';
import { AgencyListDTO } from "../../dtos/dtos";

export const userService = {

    setFavoriteAgencies: async (userId: number, agencyIds: number[]) => {
        try {
            await apiClient.put(`/users/${userId}/favorite-agencies`, { agencyIds });
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour des agences favorites.');
        }
    },

    getFavoriteAgencies: async (userId: number): Promise<number[]> => {
        try {
            const response = await apiClient.get<AgencyListDTO>(`/users/${userId}/favorite-agencies`);
            return response.data.agencyIds;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des agences favorites.');
        }
    }

};
