import apiClient from '../apiClient';
import { VehicleIdentityDTO } from "../../dtos/dtos";

export const vehicleService = {
    getVehiclesIdentityByAgencyIds: async (agencyIds: number[]): Promise<VehicleIdentityDTO[]> => {
        try {
            const response = await apiClient.post<VehicleIdentityDTO[]>('/vehicles/identity/agencies', agencyIds);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des véhicules.');
        }
    }
};
