/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.24.612 on 2025-01-15 17:00:14.

export interface AgencyDTO {
    id: number;
    name: string;
    street: string;
    postalCode: string;
    city: string;
    country: string;
    vehicleIds: number[];
}

export interface ReportDTO {
    id: number;
    reservationId: number;
    description: string;
    type: string;
    reportDateTime: Date;
}

export interface ReservationDTO {
    id: number;
    userId: number;
    vehicleId: number;
    start: Date;
    end: Date;
    status: string;
    reportIds: number[];
}

export interface UserDTO {
    id: number;
    matricule: string;
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
}

export interface VehicleDTO {
    id: number;
    licensePlate: string;
    vehicleTypeId: number;
    status: string;
    agencyId: number;
    endInsurance: Date;
    endTechnicalControl: Date;
}

export interface VehicleTypeDTO {
    id: number;
    brand: string;
    model: string;
    imageUrl: string;
}
