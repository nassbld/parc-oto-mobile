import React, {useState} from "react";
import {Image, Modal, ScrollView, Text, TouchableOpacity, View,} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {BuildingOfficeIcon, ChevronRightIcon, MapPinIcon, XMarkIcon,} from "react-native-heroicons/solid";
import SchedulePicker from "./SchedulePicker";
import Animated, {FadeIn, FadeInDown, FadeInLeft, FadeOut} from "react-native-reanimated";
import {BlurView} from "expo-blur";
import {LinearGradient} from "expo-linear-gradient";

type ReservationModalProps = {
    visible: boolean;
    onClose: () => void;
    activeCar: any;
    activeAgency: any;
};

function ReservationModal({
                              visible,
                              onClose,
                              activeCar,
                              activeAgency,
                          }: ReservationModalProps) {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedStartHour, setSelectedStartHour] = useState("");
    const [selectedEndHour, setSelectedEndHour] = useState("");

    const isReservationValid = selectedDate && selectedStartHour && selectedEndHour;

    // Fonction pour mettre à jour la date et réinitialiser les heures
    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        setSelectedStartHour(""); // Réinitialise l'heure de départ
        setSelectedEndHour(""); // Réinitialise l'heure d'arrivée
    };

    return (
        <View className={'inset-0 absolute'} style={{ zIndex: 100 }}>
            <Animated.View
                className={'h-full w-full absolute'}
                entering={FadeIn}
                exiting={FadeOut}
            >
                <BlurView tint="dark" intensity={50} className="absolute inset-0" />
            </Animated.View>
            <Modal
                visible={visible}
                transparent
                animationType="slide"
                onRequestClose={onClose}
            >
                <SafeAreaView className="flex-1 bg-transparent justify-center items-center">
                    {/* Modal content */}
                    <View className="bg-red-200 rounded-t-xl w-full h-full mt-12 shadow-lg">
                        {/* Header */}
                        <View className="flex-row items-center justify-between px-3 pt-3 pb-1.5">
                            <View className={'w-12'} />
                            <Text className="text-xl font-semibold">Réservation</Text>
                            <TouchableOpacity
                                className="p-2 rounded-xl bg-red-100"
                                onPress={onClose}
                            >
                                <XMarkIcon size={16} color="#C41B1B" />
                            </TouchableOpacity>
                        </View>

                        {/* Ligne décorative */}
                        <LinearGradient
                            colors={['#fecaca', 'rgba(254, 202, 202, 0)']}
                            start={{ x: 0, y: 0.3 }}
                            end={{ x: 0, y: 0.8 }}
                            style={{
                                position: 'absolute',
                                zIndex: 10,
                                top: 45,
                                right: 0,
                                left: 0,
                                height: 15,
                            }}
                        />

                        <ScrollView>
                            {/* Informations véhicule et agence */}
                            <View className="m-2 items-center">
                                <Image
                                    source={activeCar.picture}
                                    className="w-[180px] h-[120px]"
                                />
                                <View className="flex-row items-center justify-center mt-5">
                                    <Text className="text-3xl font-semibold">{activeCar.brand} • </Text>
                                    <Text className="text-2xl font-medium mt-1">{activeCar.model}</Text>
                                </View>
                                <Text className="font-semibold text-gray-600 mt-2">DF-654-PG</Text>
                            </View>

                            {/* Informations agence */}
                            <View className="mx-5 mt-5 py-3 px-4 flex-row items-center gap-5 bg-red-50 rounded-lg">
                                <View className="p-2 rounded-full bg-red-200">
                                    <BuildingOfficeIcon size={25} color="#C41B1B" />
                                </View>
                                <View>
                                    <Text className="text-gray-600 text-md font-semibold">Agence</Text>
                                    <Text className="text-lg font-semibold">{activeAgency.name}</Text>
                                </View>
                            </View>

                            <View className="mx-5 mt-3 py-3 px-4 flex-row items-center gap-5 bg-red-50 rounded-lg">
                                <View className="p-2 rounded-full bg-red-200">
                                    <MapPinIcon size={25} color="#C41B1B" />
                                </View>
                                <View>
                                    <Text className="text-gray-600 text-md font-semibold mb-1">Adresse</Text>
                                    <Text className="text-lg font-semibold">{activeAgency.address}</Text>
                                    <Text className="text-lg font-semibold">{activeAgency.city}</Text>
                                </View>
                            </View>

                            {/* SchedulePicker */}
                            <SchedulePicker
                                onDateSelected={handleDateChange}
                                onStartHourSelected={(hour) => setSelectedStartHour(hour)}
                                onEndHourSelected={(hour) => setSelectedEndHour(hour)}
                            />

                            <View className="h-32"></View>
                        </ScrollView>
                    </View>
                </SafeAreaView>

                {/* Bouton de confirmation */}
                <Animated.View entering={FadeInDown.delay(100).duration(500)}>
                    <BlurView intensity={50} className="absolute bottom-0 w-full border-t border-red-300 p-3">
                        {isReservationValid ? (
                            <TouchableOpacity
                                className="mx-5 bg-red-500 p-3 rounded-full flex-row items-center justify-center gap-3"
                                onPress={onClose}
                            >
                                <Animated.View entering={FadeInLeft} className="flex-row items-center justify-center">
                                    <Text className="text-xl font-semibold text-white">
                                        Confirmer la réservation
                                    </Text>
                                    <ChevronRightIcon size={20} color={"white"} />
                                </Animated.View>
                            </TouchableOpacity>
                        ) : (
                            <View className="mx-5 bg-red-100 p-3 rounded-full border border-red-300">
                                <Text className="text-xl font-bold text-red-600 text-center">
                                    Confirmer la réservation
                                </Text>
                            </View>
                        )}
                    </BlurView>
                </Animated.View>
            </Modal>
        </View>
    );
}

export default ReservationModal;
