import apiClient from '../apiClient';
import {ReservationDTO} from "../../dtos/dtos";

export const reservationService = {
    getAll: async () => {
        const response = await apiClient.get<ReservationDTO[]>('/reservations');
        return response.data;
    },

    // Ajoutez les autres méthodes similaires à vehicleService
};
