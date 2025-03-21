import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Bars3CenterLeftIcon, ChevronRightIcon, MapPinIcon, UserIcon} from "react-native-heroicons/solid";
import {DrawerActions, useFocusEffect, useNavigation} from "@react-navigation/native";
import {agencies, Car, cars} from "../theme";
import CarCard from "../components/CarCard";
import Animated, {FadeInDown, FadeInLeft} from "react-native-reanimated";
import MapView, {Marker} from "react-native-maps";
import {BlurView} from "expo-blur";
import {StatusBar} from "expo-status-bar";
import {RootStackParamList} from "../App";
import ProfileCard from "../components/ProfileCard";
import {LinearGradient} from "expo-linear-gradient";
import ReservationModal from "../components/ReservationModal";
import {StackNavigationProp} from "@react-navigation/stack";
import {agencyService, vehicleService} from "../services";
import {useUser} from "../services/UserContext";
import {AgencyDTO, VehicleIdentityDTO} from "../dtos/dtos";

function HomeScreen() {
    type NavigationProps = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProps>();
    const { userData, favoriteAgencyIds, loading, refreshFavoriteAgencies } = useUser();
    const [activeVehicle, setActiveVehicle] = useState<VehicleIdentityDTO | null>(null);
    const [showProfile, setShowProfile] = useState(false);
    const [reservationVisible, setReservationVisible] = useState(false);

    const [favoriteAgencies, setFavoriteAgencies] = useState<AgencyDTO[]>([]);
    const [activeAgency, setActiveAgency] = useState<AgencyDTO | null>(null);

    const [favoriteAgenciesVehicles, setFavoriteAgenciesVehicles] = useState<VehicleIdentityDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useFocusEffect(
        useCallback(() => {
            if (favoriteAgencyIds.length > 0) {
                fetchFavoriteAgencies();
            }
        }, [favoriteAgencyIds])
    );

    useEffect(() => {
        if (favoriteAgencies.length > 0) {
            setActiveAgency(favoriteAgencies[0]);
        }
    }, [favoriteAgencies]);

    useEffect(() => {
        fetchVehicles();
    }, [favoriteAgencyIds]);

    const fetchFavoriteAgencies = async () => {
        try {
            const data = await agencyService.getByIds(favoriteAgencyIds);
            setFavoriteAgencies(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des agences:', error);
        }
    };

    const fetchVehicles = async () => {
        if (favoriteAgencyIds.length > 0) {
            try {
                setIsLoading(true);
                const vehicles = await vehicleService.getVehiclesIdentityByAgencyIds(favoriteAgencyIds);
                setFavoriteAgenciesVehicles(vehicles);
            } catch (error) {
                console.error("Erreur lors du chargement des véhicules:", error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <SafeAreaView className={"flex-1 bg-red-200"}>
            <StatusBar style={'dark'}></StatusBar>

            {/*Header*/}

            <View
                className="absolute inset-x-0 top-0 px-6 pt-11 pb-3 flex-row justify-between items-center bg-red-200"
                style={{zIndex: 10}}
            >
                <TouchableOpacity className="w-20" onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Bars3CenterLeftIcon size={30} color="black"/>
                </TouchableOpacity>

                <TouchableOpacity className="p-2 rounded-xl bg-red-400"
                                  onPress={() => setShowProfile(!showProfile)}>
                    <UserIcon size={25} color="#C41B1B"/>
                </TouchableOpacity>
            </View>

            <LinearGradient
                colors={['#fecaca', 'rgba(254, 202, 202, 0)']}
                start={{x: 0, y: 0.3}}
                end={{x: 0, y: 0.8}}
                style={{position: 'absolute', zIndex: 10, top: 85, right: 0, left: 0, height: 25}}
            />


            {
                showProfile && <ProfileCard onClose={() => setShowProfile(false)}/>
            }

            <ScrollView>
                <View className={'pt-20 pb-24'}>

                    {/*Agencies*/}
                    <View className={"mt-3"}>
                        <Text className={"text-2xl tracking-widest font-medium ml-5"}>
                            Agences
                        </Text>
                        <Text className={"text-3xl font-semibold ml-5"}>
                            Crédit Coopératif
                        </Text>
                        <ScrollView horizontal className={"mt-8 px-5"} showsHorizontalScrollIndicator={false}>
                            {
                                favoriteAgencies.map((agency, index) => {
                                    let isActive = agency.id == activeAgency?.id;
                                    let textClass = `text-xl ${isActive ? ' font-bold' : ''}`;
                                    return (
                                        <TouchableOpacity key={index}
                                                          onPress={() =>
                                                          {
                                                              setActiveAgency(agency);
                                                              setActiveVehicle(null);
                                                          }}
                                                          className={"mr-8 relative"}>
                                            <Text className={textClass}>{agency.name}</Text>
                                            {
                                                isActive ? (
                                                    <Text className={"font-extrabold text-red-400 -mt-3 ml-1"}>__
                                                        _</Text>
                                                ) : null
                                            }
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                    {/*Cars Carousel*/}
                    <View className={"mt-8"}>
                        <ScrollView className={'w-full'} horizontal showsHorizontalScrollIndicator={false}>
                            <View className={'flex-row px-3'}>
                                {favoriteAgenciesVehicles.map((vehicle, index) => {
                                    if (activeAgency?.id == vehicle.agencyId) {
                                        return (
                                            <TouchableOpacity key={index} onPress={() => setActiveVehicle(vehicle)}>
                                                <CarCard vehicle={vehicle} isActive={activeVehicle === vehicle}/>
                                            </TouchableOpacity>
                                        );
                                    }
                                })}
                            </View>
                        </ScrollView>
                    </View>


                    {/*Agency Informations*/}
                    <View className={"mt-8 pl-5 gap-5"}>
                        <Text className={"text-xl font-bold"}>
                            {activeAgency?.name}, {activeAgency?.city}
                        </Text>
                    </View>

                    {/*Agency Horaires*/}
                    <View className="mt-4 mx-6">
                        {agencies.map((agency, index) => (
                            activeAgency?.name === agency.name && (
                                <View key={index} className="flex-row gap-10">

                                    <View className="flex-1">
                                        {Object.entries(agency.opened)
                                            .slice(0, 3)
                                            .map(([day, hours]) => (
                                                <View key={day} className="mt-2 flex-row justify-between">
                                                    <Text className="font-semibold mr-1">
                                                        {day.charAt(0).toUpperCase() + day.slice(1)}
                                                    </Text>
                                                    <View className="flex items-end">
                                                        {hours ? (
                                                            hours.map((hour, i) => (
                                                                <Text key={i} className="text-sm">
                                                                    {hour}
                                                                </Text>
                                                            ))
                                                        ) : (
                                                            <Text className="text-sm italic">Fermé</Text>
                                                        )}
                                                    </View>
                                                </View>
                                            ))}
                                    </View>

                                    <View className="flex-1">
                                        {Object.entries(agency.opened)
                                            .slice(3)
                                            .map(([day, hours]) => (
                                                <View key={day} className="mt-2 flex-row justify-between">
                                                    <Text className="font-semibold mr-1">
                                                        {day.charAt(0).toUpperCase() + day.slice(1)}
                                                    </Text>
                                                    <View className="flex items-end">
                                                        {hours ? (
                                                            hours.map((hour, i) => (
                                                                <Text key={i} className="text-sm">
                                                                    {hour}
                                                                </Text>
                                                            ))
                                                        ) : (
                                                            <Text className="text-sm italic">Fermé</Text>
                                                        )}
                                                    </View>
                                                </View>
                                            ))}
                                    </View>
                                </View>
                            )
                        ))}
                    </View>

                    {/* Separator */}
                    <Text className={"font-extrabold text-red-400 ml-8"}>_______ _</Text>

                    <View className={'mt-7 mx-5 gap-4'}>
                        <View className={'flex-row gap-3 items-center'}>
                            <MapPinIcon size={"20"} color={"#C41B1B"}/>
                            <Text className={"text-xl font-medium"}>
                                {activeAgency?.street}, {activeAgency?.city}
                            </Text>
                        </View>

                        <View style={{width: '100%', height: 200, borderRadius: 10, overflow: 'hidden'}}>
                            <MapView
                                style={{flex: 1}}
                                initialRegion={{
                                    latitude: 48.89693,
                                    longitude: 2.22037,
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.02,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: 48.89693,
                                        longitude: 2.22037
                                    }}
                                    title={activeAgency?.city}
                                    description={activeAgency?.name}
                                />
                            </MapView>
                        </View>
                    </View>

                </View>

            </ScrollView>

            {/*Reserve Button*/}
            <Animated.View entering={FadeInDown.delay(100).duration(1000)}>
                <BlurView
                    intensity={50}
                    className="absolute bottom-0 w-full border-t border-red-300 p-3"
                    style={{zIndex: 10}}
                >
                    {
                        activeVehicle ?
                            <View>
                                <TouchableOpacity
                                    className="mx-5 bg-red-500 p-3 rounded-full"
                                    onPress={() => setReservationVisible(true)}
                                >
                                    <Animated.View entering={FadeInLeft}
                                                   className={'flex-row items-center justify-center'}>
                                        <Text className="text-xl font-bold text-white text-center">
                                            Réserver
                                        </Text>
                                        <ChevronRightIcon size={20} color={'white'}></ChevronRightIcon>
                                    </Animated.View>
                                </TouchableOpacity>
                            </View>
                            :
                            <View
                                className="mx-5 bg-red-100 p-3 rounded-full border border-red-300"
                            >
                                <Text className="text-xl font-bold text-center text-red-600">
                                    Réserver
                                </Text>
                            </View>
                    }

                </BlurView>
            </Animated.View>

            {
                reservationVisible ?

                    <ReservationModal
                        visible={reservationVisible}
                        onClose={() => setReservationVisible(false)}
                        activeCar={activeVehicle}
                        activeAgency={activeAgency}
                    /> : null
            }

        </SafeAreaView>
    );
}

export default HomeScreen;
