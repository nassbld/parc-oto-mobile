import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {
    ArrowLeftEndOnRectangleIcon,
    BuildingOffice2Icon,
    ClipboardDocumentCheckIcon,
    HomeIcon
} from "react-native-heroicons/solid";
import {storageService} from "../services/storageService";
import apiClient from "../services/apiClient";

interface DrawerContentProps {
    navigation: any;
}

const CustomDrawerContent: React.FC<DrawerContentProps> = ({navigation}) => {
    const handleLogout = async () => {
        try {
            // Supprime le token stocké localement
            await storageService.removeToken();

            // Supprime le header Authorization des requêtes futures
            delete apiClient.defaults.headers.Authorization;

            // Optionnel : Appel API côté serveur pour invalider le token (si tu as un endpoint logout côté serveur)
            // await apiClient.get('/auth/logout');

            // Affiche un message de succès
            Alert.alert('Déconnexion réussie', 'Vous avez été déconnecté avec succès.');

            // Redirige vers l'écran de connexion
            navigation.navigate('Login');
        } catch (error: any) {
            Alert.alert('Erreur', error.message || 'Une erreur est survenue lors de la déconnexion.');
        }
    };

    return (
        <View className="flex-1 pt-14 pb-10 px-6 flex justify-between">
            <View>
                <Text className="text-2xl font-bold text-gray-800">Parc'oto</Text>

                <Text className={"font-extrabold text-red-400 ml-2 mb-6 mt-2"}>_______ _</Text>

                {/* Bouton pour Accueil */}
                <TouchableOpacity
                    className="py-4 px-4 flex-row items-center gap-3"
                    onPress={() => navigation.navigate('HomeMain')}
                >
                    <HomeIcon size={25} color={'black'}></HomeIcon>
                    <Text className="text-gray-800 text-xl font-bold tracking-wide mt-1">Accueil</Text>
                </TouchableOpacity>

                {/* Bouton pour Mes Réservations */}
                <TouchableOpacity
                    className="py-4 px-4 flex-row items-center gap-3"
                    onPress={() => navigation.navigate('MyReservations')}
                >
                    <ClipboardDocumentCheckIcon size={25} color={'black'}></ClipboardDocumentCheckIcon>
                    <Text className="text-gray-800 text-xl font-bold tracking-wide mt-1">Mes réservations</Text>
                </TouchableOpacity>

                {/* Bouton pour Mes Réservations */}
                <TouchableOpacity
                    className="py-4 px-4 flex-row items-center gap-3"
                    onPress={() => navigation.navigate('MyReservations')}
                >
                    <BuildingOffice2Icon size={25} color={'black'}></BuildingOffice2Icon>
                    <Text className="text-gray-800 text-xl font-bold tracking-wide mt-1">Mes agences</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text className={"font-extrabold text-red-400 ml-2 mb-2"}>_______ _</Text>

                <TouchableOpacity
                    className="py-4 flex-row items-center gap-2"
                    onPress={handleLogout}
                >
                    <ArrowLeftEndOnRectangleIcon size={25} color={'gray'}></ArrowLeftEndOnRectangleIcon>
                    <Text className="text-gray-500 text-xl font-bold tracking-wide">Déconnexion</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default CustomDrawerContent;
