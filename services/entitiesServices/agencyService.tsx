import apiClient from '../apiClient';
import {AgencyDTO} from "../../dtos/dtos";

export const agencyService = {
    getAll: async () => {
        const response = await apiClient.get<AgencyDTO[]>('/agencies');
        return response.data;
    },

    getById: async (id: number) => {
        const response = await apiClient.get<AgencyDTO>(`/agencies/${id}`);
        return response.data;
    },

    getByIds: async (agencyIds: number[]) => {
        const response = await apiClient.post<AgencyDTO[]>('/agencies/by-ids', agencyIds);
        return response.data;
    }
};
