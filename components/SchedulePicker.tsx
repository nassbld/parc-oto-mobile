import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {ChevronLeftIcon, ChevronRightIcon} from 'react-native-heroicons/outline';
import {CalendarIcon, ClockIcon} from "react-native-heroicons/solid";

type SchedulePickerProps = {
    onDateSelected: (date: string) => void;
    onStartHourSelected: (hour: string) => void;
    onEndHourSelected: (hour: string) => void;
    defaultStartDate?: Date; // Valeur par défaut pour la date et l'heure de début
    defaultEndDate?: Date; // Valeur par défaut pour la date et l'heure de fin
};

// Fonction pour générer les jours d'une semaine
const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Lundi de la semaine

    const weekDays = [];
    for (let i = 0; i < 6; i++) { // Jusqu'à 6 pour inclure seulement du lundi au samedi
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);

        weekDays.push({
            dayName: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][i],
            dayNumber: day.getDate(),
            date: day,
        });
    }

    return weekDays;
};

const hours = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

function SchedulePicker({onDateSelected, onStartHourSelected, onEndHourSelected, defaultStartDate, defaultEndDate}: SchedulePickerProps) {
    const today = new Date();
    const initialStartDate = defaultStartDate || today;
    const initialEndDate = defaultEndDate || null;

    const [currentWeek, setCurrentWeek] = useState(today);
    const [weekDays, setWeekDays] = useState(getWeekDays(today));
    const [selectedDay, setSelectedDay] = useState(today.toDateString());
    const [startHour, setStartHour] = useState(
        initialStartDate ? initialStartDate.toTimeString().slice(0, 5) : ''
    );
    const [endHour, setEndHour] = useState(
        initialEndDate ? initialEndDate.toTimeString().slice(0, 5) : ''
    );

    useEffect(() => {
        // Initialiser les valeurs sélectionnées au montage
        onDateSelected(selectedDay);
        onStartHourSelected(startHour || '');
        onEndHourSelected(endHour || '');
    }, []);

    const selectDay = (item: { date: Date, dayName: string, dayNumber: number }) => {
        // Réinitialiser les heures
        setStartHour('');
        setEndHour('');

        // Mettre à jour la date sélectionnée
        setSelectedDay(item.date.toDateString());

        // Passer la date et réinitialiser les heures au parent
        onDateSelected(item.date.toDateString());
        onStartHourSelected('');
        onEndHourSelected('');
    };

    const selectHour = (hour: string) => {
        if (!startHour || (startHour && endHour)) {
            setStartHour(hour);
            setEndHour('');
            onStartHourSelected(hour);
            onEndHourSelected('');
        } else if (hour > startHour) {
            setEndHour(hour);
            onEndHourSelected(hour);
        } else {
            setStartHour(hour);
            setEndHour('');
            onStartHourSelected(hour);
            onEndHourSelected('');
        }
    };

    const isTodayOrAfter = (date: Date) => {
        const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const dateNormalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        return dateNormalized >= todayNormalized;
    };

    const isCurrentWeek = (date: Date) => {
        const startOfCurrentWeek = new Date(today);
        startOfCurrentWeek.setDate(today.getDate() - today.getDay() + 1); // Lundi de la semaine actuelle
        return date.getTime() >= startOfCurrentWeek.getTime() && date.getTime() < startOfCurrentWeek.getTime() + 7 * 24 * 60 * 60 * 1000;
    };

    const changeWeek = (direction: number) => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(newWeek.getDate() + direction * 7);
        setCurrentWeek(newWeek);
        setWeekDays(getWeekDays(newWeek));
    };

    const isInRange = (hour: string) => {
        if (!startHour || !endHour) return false;
        return hour > startHour && hour < endHour;
    };

    const isPastHourToday = (hour: string) => {
        if (selectedDay !== today.toDateString()) return false;
        return hour < today.toTimeString().slice(0, 5);
    };

    const getMonthText = () => {
        const startDate = weekDays[0].date;
        const endDate = weekDays[weekDays.length - 1].date;

        const startMonth = startDate.toLocaleString('default', {month: 'long'});
        const endMonth = endDate.toLocaleString('default', {month: 'long'});

        if (startMonth === endMonth) {
            return startMonth;
        } else {
            return `${startMonth} - ${endMonth}`;
        }
    };

    return (
        <View className="flex-1 mb-2">
            <View className="bg-red-50 p-5 mx-5 mt-5 rounded-lg">

                {/* Header avec les chevrons */}
                <View className="flex-row justify-between items-center mb-3 px-2">
                    <Text className="text-xl font-bold tracking-wider">{getMonthText()}</Text>
                    <View className={'flex-row gap-3'}>
                        <TouchableOpacity onPress={() => changeWeek(-1)} disabled={isCurrentWeek(currentWeek)}>
                            <ChevronLeftIcon size={28} color={isCurrentWeek(currentWeek) ? '#d1d5db' : '#ef4444'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeWeek(1)}>
                            <ChevronRightIcon size={28} color="#ef4444"/>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Affichage des jours */}
                <View className={'flex items-center justify-center'}>
                    <FlatList
                        data={weekDays}
                        keyExtractor={(item) => item.date.toDateString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => {
                                    selectDay(item);
                                    setStartHour('');
                                    setEndHour('');
                                }}
                                disabled={!isTodayOrAfter(item.date)}
                                className={`items-center px-3 py-2 ${
                                    selectedDay === item.date.toDateString()
                                        ? 'border-b-2 border-red-400'
                                        : !isTodayOrAfter(item.date)
                                            ? 'opacity-50 border-b border-red-200'
                                            : 'border-b border-red-200'
                                }`}
                            >
                                <Text
                                    className={`text-base ${
                                        selectedDay === item.date.toDateString()
                                            ? 'font-bold'
                                            : 'text-gray-800'
                                    }`}
                                >
                                    {item.dayName}
                                </Text>
                                <Text
                                    className={`text-sm ${
                                        selectedDay === item.date.toDateString()
                                            ? 'font-semibold'
                                            : 'text-gray-600'
                                    }`}
                                >
                                    {item.dayNumber}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Titre pour les heures */}
                <Text className="text-lg font-bold mt-5 mb-2">Sélectionnez un créneau horaire</Text>
                <FlatList
                    data={hours}
                    keyExtractor={(item) => item}
                    numColumns={4}
                    scrollEnabled={false}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => selectHour(item)}
                            disabled={isPastHourToday(item)}
                            className={`flex-1 m-1 p-3 rounded-lg items-center ${
                                item === startHour || item === endHour
                                    ? 'bg-red-500'
                                    : isInRange(item)
                                        ? 'bg-red-300'
                                        : isPastHourToday(item)
                                            ? 'bg-gray-300 opacity-50'
                                            : 'bg-gray-200'
                            }`}
                        >
                            <Text
                                className={`text-base font-medium ${
                                    item === startHour || item === endHour
                                        ? 'text-white'
                                        : isInRange(item)
                                            ? 'text-white'
                                            : isPastHourToday(item)
                                                ? 'text-gray-500' // Texte grisé pour les heures désactivées
                                                : 'text-gray-800'
                                }`}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View className="bg-red-50 p-5 mx-5 mt-3 rounded-lg">
                {/* Affichage du créneau sélectionné */}
                <View className="flex-row items-center gap-4 mx-4">
                    <View className="flex-row items-center gap-2">
                        <CalendarIcon size={25} color={'gray'}/>
                        <Text className="font-semibold">
                            {selectedDay ? new Date(selectedDay).toLocaleDateString() : 'Aucun'}
                        </Text>
                    </View>
                    <View>
                        <Text className={'text-gray-500 font-semibold'}>|</Text>
                        <Text className={'text-gray-500 font-semibold -mt-1.5'}>|</Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                        <ClockIcon size={25} color={'gray'}/>
                        <Text className="font-semibold">{startHour || 'Aucune'} - {endHour || 'Aucune'}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default SchedulePicker;
