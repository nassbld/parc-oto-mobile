import apiClient from '../apiClient';
import {VehicleDTO} from "../../dtos/dtos";

export const vehicleService = {
    getAll: async () => {
        const response = await apiClient.get<VehicleDTO[]>('/vehicles');
        return response.data;
    },

    getById: async (id: number) => {
        const response = await apiClient.get<VehicleDTO>(`/vehicles/${id}`);
        return response.data;
    },

    create: async (vehicle: Omit<VehicleDTO, 'id'>) => {
        const response = await apiClient.post<VehicleDTO>('/vehicles', vehicle);
        return response.data;
    },

    update: async (id: number, vehicle: Partial<VehicleDTO>) => {
        const response = await apiClient.put<VehicleDTO>(`/vehicles/${id}`, vehicle);
        return response.data;
    },

    delete: async (id: number) => {
        await apiClient.delete(`/vehicles/${id}`);
    }
};
