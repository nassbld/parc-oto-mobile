import React, {useState} from 'react';
import {Image, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {BuildingOfficeIcon, ChevronRightIcon, MapPinIcon, XMarkIcon} from "react-native-heroicons/solid";
import {NavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../App";
import Animated, {FadeInDown} from "react-native-reanimated";
import {BlurView} from "expo-blur";
import {LinearGradient} from "expo-linear-gradient";
import SchedulePicker from "../components/SchedulePicker";

type ReservationScreenRouteProp = RouteProp<RootStackParamList, 'Reservation'>;

function ReservationScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const route = useRoute<ReservationScreenRouteProp>();
    const {activeCar, activeAgency} = route.params;

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    const onDateChange = (event: any, date: any) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (date) setSelectedDate(date);
    };

    const onTimeChange = (event: any, time: any) => {
        setShowTimePicker(Platform.OS === 'ios');
        if (time) setSelectedTime(time);
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
        setShowTimePicker(false); // Fermer le time picker si ouvert
    };

    const toggleTimePicker = () => {
        setShowTimePicker(!showTimePicker);
        setShowDatePicker(false); // Fermer le date picker si ouvert
    };

    return (
        <SafeAreaView className={'flex-1 bg-red-200'}>
            {/* Header */}
            <View
                className="absolute inset-x-0 top-0 px-6 pt-3 pb-1 flex-row items-center justify-between bg-red-200"
                style={{zIndex: 10}}
            >
                <View className={'w-8'}></View>
                <Text className={'text-xl font-semibold tracking-wide'}>Réservation</Text>
                <TouchableOpacity className="p-2 rounded-xl bg-red-300" onPress={() => navigation.goBack()}>
                    <XMarkIcon size={16} color="#C41B1B"/>
                </TouchableOpacity>
            </View>

            <LinearGradient
                colors={['#fecaca', 'rgba(254, 202, 202, 0)']}
                start={{x: 0, y: 0.3}}
                end={{x: 0, y: 0.8}}
                style={{position: 'absolute', zIndex: 10, top: 40, right: 0, left: 0, height: 25}}
            />

            {/* Ligne décorative */}
            <ScrollView className={'pt-16'}>

                <View className={'m-2 items-center'}>
                    <Image source={activeCar.picture} style={{width: 180, height: 120}}></Image>
                    <View className={'flex-row items-center justify-center mt-5'}>
                        <Text className={'text-3xl font-semibold'}>{activeCar.brand} • </Text>
                        <Text className={'text-2xl font-medium mt-1'}>{activeCar.model}</Text>
                    </View>
                    <Text className={'font-semibold text-gray-600 mt-2'}>DF-654-PG</Text>
                </View>


                <View className={'mx-5 mt-5 py-2 px-4 flex-row items-center gap-5 bg-red-50 rounded-lg'}>
                    <View className="p-2 rounded-full bg-red-200">
                        <BuildingOfficeIcon size={25} color="#C41B1B"/>
                    </View>
                    <View>
                        <Text className={'text-gray-600 text-lg font-semibold tracking-wide'}>Agence</Text>
                        <Text className={'text-xl font-semibold'}>{activeAgency.name}</Text>
                    </View>
                </View>


                <View className={'mx-5 mt-3 py-2 px-4 flex-row items-center gap-5 bg-red-50 rounded-lg'}>
                    <View className="p-2 rounded-full bg-red-200">
                        <MapPinIcon size={25} color="#C41B1B"/>
                    </View>
                    <View>
                        <Text className={'text-gray-600 text-lg font-semibold tracking-wide'}>Adresse</Text>
                        <Text className={'text-xl font-semibold'}>{activeAgency.address},</Text>
                        <Text className={'text-xl font-semibold'}>{activeAgency.city}</Text>
                    </View>
                </View>

                <Text className={'font-extrabold text-red-400 ml-8 mt-2'}>__ _</Text>

                <SchedulePicker />

                <View className={'h-24'}></View>

            </ScrollView>

            <Animated.View entering={FadeInDown.delay(100).duration(500)}>
                <BlurView
                    intensity={75}
                    className="absolute bottom-0 w-full border-t border-red-300 p-3"
                    style={{zIndex: 10}}
                >
                    <TouchableOpacity
                        className="mx-3 bg-red-500 p-3 rounded-full flex-row items-center justify-center gap-3"
                        onPress={() => navigation.navigate('Reservation', {activeCar})}
                    >
                        <Text className="text-xl font-semibold tracking-wide text-white text-center">
                            Confirmer la réservation
                        </Text>
                        <ChevronRightIcon size={20} color={'white'}></ChevronRightIcon>
                    </TouchableOpacity>
                </BlurView>
            </Animated.View>
        </SafeAreaView>
    );
}

export default ReservationScreen;
