import apiClient from '../apiClient';
import {ReportDTO} from "../../dtos/dtos";

export const reportService = {
    getAll: async () => {
        const response = await apiClient.get<ReportDTO[]>('/reports');
        return response.data;
    },

};
