import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Bars3CenterLeftIcon, MapPinIcon, UserIcon} from "react-native-heroicons/solid";
import {useNavigation} from "@react-navigation/native";
import {agencies, Car, cars} from "../theme";
import CarCard from "../components/CarCard";
import Animated, {FadeInDown} from "react-native-reanimated";
import MapView, {Marker} from "react-native-maps";
import {BlurView} from "@react-native-community/blur";

function HomeScreen() {
    const navigation = useNavigation();
    const [activeAgency, setActiveAgency] = useState(agencies.at(0));
    const [activeCar, setActiveCar] = useState<Car | null>(null);

    return (
        <SafeAreaView className={"flex-1 bg-red-200 pt-5"}>
            {/*Header*/}
            <BlurView
                intensity={50} // Contrôle le niveau de flou
                tint="light"   // Peut être 'light', 'dark', ou 'default'
                className="absolute inset-x-0 top-0 mx-5 pb-3 flex-row justify-between items-center"
                style={{ zIndex: 10 }}
            >
                <Bars3CenterLeftIcon size={30} color="black" />
                <TouchableOpacity className="p-2 rounded-xl bg-red-400">
                    <UserIcon size={25} color="#C41B1B" />
                </TouchableOpacity>
            </BlurView>

            <ScrollView>

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
                                                <Text className={"font-extrabold text-red-400 -mt-3 ml-1"}>__ _</Text>
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
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            cars.map((car, index) => {
                                // @ts-ignore
                                if (activeAgency.city == car.agency) {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => setActiveCar(car)}>
                                            <CarCard car={car} isActive={activeCar === car}/>
                                        </TouchableOpacity>
                                    )
                                }
                            })
                        }
                    </ScrollView>
                </View>

                {/*Agency Informations*/}
                <View className={"mt-8 pl-5 gap-5"}>
                    <Text className={"text-xl font-bold"}>
                        {// @ts-ignore
                            activeAgency.name}, {activeAgency.city}
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

                <View className={'mt-5 mx-5 gap-4'}>
                    <View className={'flex-row gap-3 items-center'}>
                        <MapPinIcon size={"20"} color={"#C41B1B"}/>
                        <Text className={"text-xl font-medium"}>
                            {activeAgency.address}, {activeAgency.city}
                        </Text>
                    </View>

                    <MapView
                        style={{ width: '100%', height: 200, borderRadius: 10 }}
                        initialRegion={{
                            // @ts-ignore
                            latitude: activeAgency.localisation[0],
                            // @ts-ignore
                            longitude: activeAgency.localisation[1],
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }}
                    >
                        <Marker
                            // @ts-ignore
                            coordinate={{ latitude: activeAgency.localisation[0], longitude: activeAgency.localisation[1] }}
                            // @ts-ignore
                            title={activeAgency.city}
                            // @ts-ignore
                            description={activeAgency.name}
                        />
                    </MapView>
                </View>

            </ScrollView>

            {/*Reserve Button*/}
            {
                activeCar ? (
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}
                                   className={"flex items-center bg-transparent"}>
                        <TouchableOpacity
                            className="w-40 bg-red-400 p-3 rounded-3xl mb-3"
                        >
                            <Text className="text-xl font-bold text-white text-center">
                                Réserver
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                ) : null
            }

        </SafeAreaView>
    );
}

export default HomeScreen;
