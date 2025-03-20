import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from "./storageService";
import {authService} from "./authService";
import {userService} from "./entitiesServices/userService";
import apiClient from "./apiClient";

interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    matricule: string;
}

interface UserContextType {
    userData: UserData | null;
    favoriteAgencyIds: number[];
    loading: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    refreshUserData: () => Promise<void>;
    refreshFavoriteAgencies: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [favoriteAgencyIds, setFavoriteAgencyIds] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const data = await authService.getCurrentUser();
            setUserData(data);
            if (data?.id) {
                await fetchFavoriteAgencies(data.id); // Charger également les favoris
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des infos utilisateur:', error);
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchFavoriteAgencies = async (userId: number) => {
        try {
            const favorites = await userService.getFavoriteAgencies(userId);
            setFavoriteAgencyIds(favorites);
        } catch (error) {
            console.error('Erreur lors de la récupération des agences favorites:', error);
            setFavoriteAgencyIds([]);
        }
    };

    const login = async (credentials: { email: string; password: string }) => {
        try {
            await authService.login(credentials);
            await fetchUserData(); // Recharge toutes les données
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUserData(null);
            setFavoriteAgencyIds([]);
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            throw error;
        }
    };

    useEffect(() => {
        const initializeUser = async () => {
            const token = await storageService.getToken();
            if (token) {
                try {
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    await fetchUserData();
                } catch (error) {
                    console.error("Erreur lors de l'initialisation de l'utilisateur :", error);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        initializeUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                userData,
                favoriteAgencyIds,
                loading,
                login,
                logout,
                refreshUserData: fetchUserData,
                refreshFavoriteAgencies: async () => {
                    if (userData?.id) await fetchFavoriteAgencies(userData.id);
                },
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser doit être utilisé à l'intérieur d'un UserProvider");
    return context;
};
