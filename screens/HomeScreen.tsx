import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Bars3CenterLeftIcon, ChevronRightIcon, MapPinIcon, UserIcon} from "react-native-heroicons/solid";
import {DrawerActions, NavigationProp, useNavigation} from "@react-navigation/native";
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

function HomeScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [activeAgency, setActiveAgency] = useState(agencies.at(0));
    const [activeCar, setActiveCar] = useState<Car | null>(null);
    const [showProfile, setShowProfile] = useState(false);
    const [reservationVisible, setReservationVisible] = useState(false);

    return (
        <SafeAreaView className={"flex-1 bg-red-200"}>
            <StatusBar style={'dark'}></StatusBar>

            {/*Header*/}

            <View
                className="absolute inset-x-0 top-0 px-6 pt-11 pb-3 flex-row justify-between items-center bg-red-200"
                style={{zIndex: 10}}
            >
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
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
                                agencies.map((agency, index) => {
                                    let isActive = agency == activeAgency;
                                    let textClass = `text-xl ${isActive ? ' font-bold' : ''}`;
                                    return (
                                        <TouchableOpacity key={index} onPress={() => setActiveAgency(agency)}
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
                                {cars.map((car, index) => {
                                    // @ts-ignore
                                    if (activeAgency.city == car.agency) {
                                        return (
                                            <TouchableOpacity key={index} onPress={() => setActiveCar(car)}>
                                                <CarCard car={car} isActive={activeCar === car}/>
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
                            {activeAgency.name}, {activeAgency.city}
                        </Text>
                    </View>

                    {/*Agency Horaires*/}
                    <View className="mt-4 mx-6">
                        {agencies.map((agency, index) => (
                            // @ts-ignore
                            activeAgency.name === agency.name && (
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
                                {activeAgency.address}, {activeAgency.city}
                            </Text>
                        </View>

                        <View style={{width: '100%', height: 200, borderRadius: 10, overflow: 'hidden'}}>
                            <MapView
                                style={{flex: 1}}
                                initialRegion={{
                                    latitude: activeAgency.localisation[0],
                                    longitude: activeAgency.localisation[1],
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.02,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: activeAgency.localisation[0],
                                        longitude: activeAgency.localisation[1]
                                    }}
                                    title={activeAgency.city}
                                    description={activeAgency.name}
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
                        activeCar ?
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
                        activeCar={activeCar}
                        activeAgency={activeAgency}
                    /> : null
            }

        </SafeAreaView>
    );
}

export default HomeScreen;
