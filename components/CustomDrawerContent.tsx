import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {StatusBar} from "expo-status-bar";

interface DrawerContentProps {
    navigation: any; // Vous pouvez affiner ce type avec @react-navigation/types si nécessaire
}

const CustomDrawerContent: React.FC<DrawerContentProps> = ({ navigation }) => {
    return (
        <View className="flex-1 py-10 px-5">
            <Text className="text-2xl font-bold text-gray-800 mb-6">Mon Menu</Text>

            {/* Bouton pour Accueil */}
            <TouchableOpacity
                className="py-4 px-6 bg-blue-500 rounded-lg mb-4"
                onPress={() => navigation.navigate('HomeMain')}
            >
                <Text className="text-white text-center text-lg">Accueil</Text>
            </TouchableOpacity>

            {/* Bouton pour Mes Réservations */}
            <TouchableOpacity
                className="py-4 px-6 bg-green-500 rounded-lg mb-4"
                onPress={() => navigation.navigate('MyReservations')}
            >
                <Text className="text-white text-center text-lg">Mes Réservations</Text>
            </TouchableOpacity>

            {/* Bouton pour Déconnexion */}
            <TouchableOpacity
                className="py-4 px-6 bg-red-500 rounded-lg"
                onPress={() => navigation.navigate('Login')}
            >
                <Text className="text-white text-center text-lg">Déconnexion</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomDrawerContent;
