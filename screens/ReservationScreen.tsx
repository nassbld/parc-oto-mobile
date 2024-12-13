import React, {useState} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import {XMarkIcon} from "react-native-heroicons/solid";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../App";
import Animated, {FadeInUp, FadeOutUp, Layout} from "react-native-reanimated";

function ReservationScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
        <SafeAreaView className={'flex-1 bg-red-200 py-3 px-5'}>
            {/* Header */}
            <View className={'flex-row justify-between items-center mt-3'}>
                <Text className={'text-2xl font-semibold tracking-wide'}>Réservation</Text>
                <TouchableOpacity className="p-2 rounded-xl bg-red-400" onPress={() => navigation.goBack()}>
                    <XMarkIcon size={25} color="#C41B1B" />
                </TouchableOpacity>
            </View>

            {/* Ligne décorative */}
            <Text className={'font-extrabold text-red-400 ml-1 -mt-3'}>__ _</Text>

            <Animated.View layout={Layout}>
                <Text className="mt-6 ml-2 font-semibold text-lg tracking-wide">Jour</Text>

                <View className={'flex-row gap-3 items-center'}>
                    <TouchableOpacity
                        onPress={toggleDatePicker}
                        className="flex-1 mt-3 p-3 mr-auto rounded-lg bg-white border border-gray-300 flex items-center justify-center"
                    >
                        <Text className="text-gray-700 tracking-wide">
                            {selectedDate ? selectedDate.toLocaleDateString() : 'Sélectionner une date'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="mt-3 p-3 rounded-xl bg-red-400"
                        onPress={() => setShowDatePicker(false)}
                    >
                        <Text className={'text-white font-semibold tracking-wide'}>Appliquer</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            {/* Picker animé */}
            {showDatePicker && (
                <Animated.View
                    entering={FadeInUp.duration(200)}
                    exiting={FadeOutUp.duration(200)}
                    layout={Layout.springify()}
                >
                    <DateTimePicker
                        value={currentDate}
                        minimumDate={new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onDateChange}
                    />
                </Animated.View>
            )}

            {/* Section avec animation */}
            <Animated.View layout={Layout}>
                <Text className="mt-6 ml-2 font-semibold text-lg tracking-wide">Heure</Text>

                <View className={'flex-row gap-3 items-center'}>
                    <TouchableOpacity
                        onPress={toggleTimePicker}
                        className="flex-1 mt-3 p-3 mr-auto rounded-lg bg-white border border-gray-300 flex items-center justify-center"
                    >
                        <Text className="text-gray-700 tracking-wide">
                            {selectedTime
                                ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                : 'Sélectionner une heure'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="mt-3 p-3 rounded-xl bg-red-400"
                        onPress={() => setShowTimePicker(false)}
                    >
                        <Text className={'text-white font-semibold tracking-wide'}>Appliquer</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            {/* Picker animé */}
            {showTimePicker && (
                <Animated.View
                    entering={FadeInUp.duration(200)}
                    exiting={FadeOutUp.duration(200)}
                    layout={Layout.springify()}
                >
                    <DateTimePicker
                        value={currentTime}
                        mode="time"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onTimeChange}
                    />
                </Animated.View>
            )}
        </SafeAreaView>
    );
}

export default ReservationScreen;
