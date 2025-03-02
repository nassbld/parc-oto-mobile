import apiClient from '../apiClient';
import {UserDTO} from "../../dtos/dtos";

export const userService = {
    getAll: async () => {
        const response = await apiClient.get<UserDTO[]>('/users');
        return response.data;
    },

};
