import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {DrawerActions, NavigationProp, useNavigation} from "@react-navigation/native";
import {Bars3CenterLeftIcon, UserIcon} from "react-native-heroicons/solid";
import {SafeAreaView} from "react-native-safe-area-context";
import {RootStackParamList} from "../App";
import ProfileCard from "../components/ProfileCard";
import {LinearGradient} from "expo-linear-gradient";
import {agencies, reservations} from "../theme";
import ReservationCard from "../components/ReservationCard";

function MyReservationsScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [showProfile, setShowProfile] = useState(false);

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
                <View className={'pt-20 pb-5'}>

                    <Text className={"text-3xl font-semibold ml-5 mt-3"}>
                        Mes réservations
                    </Text>

                    <Text className={"text-xl text-gray-500 tracking-wider font-semibold ml-6 mt-3"}>
                        En cours
                    </Text>

                    {
                        reservations.map((reservation) => {
                            const isCurrent = reservation.status === "current";
                            return isCurrent ? (
                                <ReservationCard key={reservation.id} reservation={reservation} />
                            ) : null;
                        })
                    }

                    <Text className={"text-xl text-gray-500 tracking-wider font-semibold ml-6 mt-3"}>
                        À venir
                    </Text>

                    {
                        reservations.map((reservation) => {
                            const isUpcoming = reservation.status === "upcoming";
                            return isUpcoming ? (
                                <ReservationCard key={reservation.id} reservation={reservation} />
                            ) : null;
                        })
                    }

                    <Text className={"text-xl text-gray-500 tracking-wider font-semibold ml-6 mt-3"}>
                        Passées
                    </Text>

                    {
                        reservations.map((reservation) => {
                            const isCompleted = reservation.status === "completed";
                            return isCompleted ? (
                                <ReservationCard key={reservation.id} reservation={reservation} />
                            ) : null;
                        })
                    }

                </View>
            </ScrollView>


        </SafeAreaView>
    );
}

export default MyReservationsScreen;
