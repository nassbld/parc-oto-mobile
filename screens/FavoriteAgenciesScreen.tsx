import React, {useCallback, useEffect, useState} from 'react';
import { FlatList, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { AgencyDTO } from "../dtos/dtos";
import { agencyService, userService } from "../services";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Bars3CenterLeftIcon, ChevronRightIcon, UserIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../services/UserContext";
import { StatusBar } from "expo-status-bar";
import {DrawerActions, useFocusEffect, useNavigation} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ProfileCard from "../components/ProfileCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { CheckCircleIcon } from "react-native-heroicons/outline";

interface GroupedAgencies {
    [department: string]: AgencyDTO[];
}

function FavoriteAgenciesScreen() {
    type NavigationProps = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProps>();

    const [showProfile, setShowProfile] = useState(false);
    const { userData, favoriteAgencyIds, loading, refreshFavoriteAgencies } = useUser();

    const [agencies, setAgencies] = useState<AgencyDTO[]>([]);
    const [groupedAgencies, setGroupedAgencies] = useState<GroupedAgencies>({});
    const [selectedAgencyIds, setSelectedAgencyIds] = useState<number[]>([]);
    const [selectedOrUpdatedAgencies, setSelectedOrUpdatedAgencies] = useState<boolean>(false);

    // Charger toutes les agences
    useEffect(() => {
        fetchAgencies();
        if (userData?.id) refreshFavoriteAgencies();
    }, [userData]);

    // Synchroniser l'état local avec les favoris du contexte
    useEffect(() => {
        setSelectedAgencyIds(favoriteAgencyIds);
    }, [favoriteAgencyIds]);

    // Grouper les agences par département
    useEffect(() => {
        groupByDepartment();
    }, [agencies]);

    // Définir si des agences ont été sélectionnées ou mises à jour
    useEffect(() => {
        const set = new Set(selectedAgencyIds);
        setSelectedOrUpdatedAgencies(!(favoriteAgencyIds.every(item => set.has(item)) && selectedAgencyIds.length === favoriteAgencyIds.length));
    }, [selectedAgencyIds]);

    useFocusEffect(
        useCallback(() => {
            setSelectedAgencyIds(favoriteAgencyIds);
        }, [favoriteAgencyIds, userData, refreshFavoriteAgencies])
    );

    const fetchAgencies = async () => {
        try {
            const data = await agencyService.getAll();
            setAgencies(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des agences:', error);
        }
    };

    const groupByDepartment = () => {
        const grouped: GroupedAgencies = {};
        agencies.forEach(agency => {
            const department = agency.department;
            if (!grouped[department]) grouped[department] = [];
            grouped[department].push(agency);
        });
        setGroupedAgencies(grouped);
    };

    const handleAgencyPress = (agencyId: number) => {
        setSelectedAgencyIds(prevIds =>
            prevIds.includes(agencyId)
                ? prevIds.filter(id => id !== agencyId)
                : [...prevIds, agencyId]
        );
    };

    const handleConfirmButtonPress = async () => {
        if (!userData?.id) {
            console.error("L'utilisateur n'est pas défini ou l'ID est manquant.");
            return;
        }

        try {
            console.log("Selected Agency IDs:", selectedAgencyIds);
            await userService.setFavoriteAgencies(userData.id, selectedAgencyIds);
            console.log("Les agences favorites ont été mises à jour avec succès.");
            await refreshFavoriteAgencies();
            setSelectedOrUpdatedAgencies(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour des agences favorites:", error);
        }
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-red-200">
                <Text className="text-center mt-20 text-lg">Chargement...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-red-200">
            <StatusBar style={'dark'} />

            {/* Header */}
            <View
                className="absolute inset-x-0 top-0 px-6 pt-11 pb-3 flex-row justify-between items-center bg-red-200"
                style={{ zIndex: 10 }}
            >
                <TouchableOpacity className="w-20" onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Bars3CenterLeftIcon size={30} color="black" />
                </TouchableOpacity>

                <TouchableOpacity className="p-2 rounded-xl bg-red-400"
                                  onPress={() => setShowProfile(!showProfile)}>
                    <UserIcon size={25} color="#C41B1B" />
                </TouchableOpacity>
            </View>

            <LinearGradient
                colors={['#fecaca', 'rgba(254, 202, 202, 0)']}
                start={{ x: 0, y: 0.3 }}
                end={{ x: 0, y: 0.8 }}
                style={{ position: 'absolute', zIndex: 10, top: 85, right: 0, left: 0, height: 25 }}
            />

            {showProfile && <ProfileCard onClose={() => setShowProfile(false)} />}

            {/* Liste des agences */}
            <View className="pt-20 pb-16">
                <FlatList
                    className="mb-4"
                    ListHeaderComponent={
                        <Text className="text-3xl font-semibold ml-5 mt-3 mb-5">
                            Toutes les agences
                        </Text>
                    }
                    data={Object.entries(groupedAgencies)}
                    keyExtractor={(item) => item[0]}
                    renderItem={({ item: [department, agencies] }) => (
                        <View className="mb-3">
                            <Text className="px-6 py-1 text-lg font-semibold text-gray-700">
                                {department}
                            </Text>
                            <FlatList
                                data={agencies}
                                keyExtractor={(agency) => agency.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableHighlight
                                        underlayColor="#fee2e2"
                                        className={`py-3 px-4 border-b-2 border-red-600 rounded-xl my-1 mx-3 ${
                                            selectedAgencyIds.includes(item.id) ? 'bg-red-600' : 'bg-red-50'
                                        }`}
                                        onPress={() => handleAgencyPress(item.id)}
                                    >
                                        <View className="flex-row items-center justify-between">
                                            <View className="flex-1">
                                                <Text
                                                    className={`text-base font-semibold ${selectedAgencyIds.includes(item.id) ? 'text-gray-50' : 'text-gray-800'}`}>
                                                    {item.name}
                                                </Text>
                                                <Text
                                                    className={`flex-1 text-sm ${selectedAgencyIds.includes(item.id) ? 'text-gray-300' : 'text-gray-500'}`}>
                                                    {item.street}, {item.postalCode}, {item.city}
                                                </Text>
                                            </View>
                                            <View className="w-8">
                                                {selectedAgencyIds.includes(item.id) && (
                                                    <CheckCircleIcon size={24} color={'#f3f4f6'} />
                                                )}
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                )}
                            />
                        </View>
                    )}
                />
            </View>

            {/* Bouton de confirmation */}
            <Animated.View entering={FadeInDown.delay(100).duration(600)}>
                <BlurView intensity={50} className="absolute bottom-0 w-full border-t border-red-300 p-3">
                    {selectedOrUpdatedAgencies ? (
                        <TouchableOpacity
                            className="mx-5 bg-red-500 p-3 rounded-full"
                            onPress={handleConfirmButtonPress}
                        >
                            <Animated.View entering={FadeInLeft} className="flex-row items-center justify-center">
                                <Text className="text-xl font-bold text-white">Confirmer</Text>
                                <ChevronRightIcon size={20} color={'white'} />
                            </Animated.View>
                        </TouchableOpacity>
                    ) : (
                        <View className="mx-5 bg-red-100 p-3 rounded-full border border-red-300">
                            <Text className="text-xl font-bold text-center text-red-400">Confirmer</Text>
                        </View>
                    )}
                </BlurView>
            </Animated.View>
        </SafeAreaView>
    );
}

export default FavoriteAgenciesScreen;
