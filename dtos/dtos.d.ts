/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.24.612 on 2025-02-17 14:49:41.

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

export interface ReservationWithInfosDTO {
    id: number;
    userFirstName: string;
    userLastName: string;
    userMatricule: string;
    vehicleBrand: string;
    vehicleModel: string;
    vehicleLicensePlate: string;
    start: Date;
    end: Date;
    status: string;
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

export interface VehicleIdentityDTO {
    vehicleId: number;
    licensePlate: string;
    agencyId: number;
    vehicleTypeId: number;
    brand: string;
    model: string;
    imageUrl: string;
}

export interface VehicleTypeDTO {
    id: number;
    brand: string;
    model: string;
    imageUrl: string;
}

export interface VehicleWithTypeDTO {
    vehicleId: number;
    licensePlate: string;
    status: string;
    agencyId: number;
    endInsurance: Date;
    endTechnicalControl: Date;
    vehicleTypeId: number;
    brand: string;
    model: string;
    imageUrl: string;
}

export interface AuthenticationRequest {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    matricule: string;
    phone: string;
}

export interface AuthenticationRequestBuilder {
}

export interface AuthenticationResponse {
    token: string;
    email: string;
    first_name: string;
    last_name: string;
    matricule: string;
    phone: string;
}

export interface AuthenticationResponseBuilder {
}
