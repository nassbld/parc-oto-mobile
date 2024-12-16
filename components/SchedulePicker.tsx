import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/outline';

// Fonction pour générer les jours d'une semaine
const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Lundi de la semaine

    const weekDays = [];
    for (let i = 0; i < 6; i++) {  // Jusqu'à 6 pour inclure seulement du lundi au samedi
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);

        weekDays.push({
            dayName: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][i],
            dayNumber: day.getDate(),
            date: day
        });
    }

    return weekDays;
};

const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

function SchedulePicker() {
    const today = new Date();
    const [currentWeek, setCurrentWeek] = useState(today);
    const [weekDays, setWeekDays] = useState(getWeekDays(today));
    const [selectedDay, setSelectedDay] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');

    // Définir le jour sélectionné par défaut
    useEffect(() => {
        const todayDay = today.getDay();
        if (todayDay === 0) {
            const nextMonday = new Date(today);
            nextMonday.setDate(today.getDate() + (8 - todayDay)); // Lundi de la semaine suivante
            setSelectedDay(nextMonday.toDateString());
        } else {
            setSelectedDay(today.toDateString());
        }
    }, []);

    // Changement de semaine
    const changeWeek = (direction: number) => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(newWeek.getDate() + direction * 7);
        setCurrentWeek(newWeek);
        setWeekDays(getWeekDays(newWeek));
        setSelectedDay('');
        setStartHour('');
        setEndHour('');
    };

    // Sélectionner une heure
    const selectHour = (hour: string) => {
        if (!startHour || (startHour && endHour)) {
            setStartHour(hour);
            setEndHour('');
        } else if (hour > startHour) {
            setEndHour(hour);
        } else {
            setStartHour(hour);
            setEndHour('');
        }
    };

    // Vérifier si une heure est dans la plage entre startHour et endHour
    const isInRange = (hour: string) => {
        if (!startHour || !endHour) return false;
        return (hour > startHour && hour < endHour);
    };

    return (
        <View className="flex-1 bg-red-50 p-5 mx-5 mt-5 rounded-lg">
            {/* Header avec les chevrons */}
            <View className="flex-row justify-between items-center mb-2">
                <TouchableOpacity onPress={() => changeWeek(-1)}>
                    <ChevronLeftIcon size={28} color="#ef4444" />
                </TouchableOpacity>
                <Text className="text-lg font-bold">
                    Semaine du {weekDays[0].dayNumber} au {weekDays[weekDays.length - 1].dayNumber}
                </Text>
                <TouchableOpacity onPress={() => changeWeek(1)}>
                    <ChevronRightIcon size={28} color="#ef4444" />
                </TouchableOpacity>
            </View>

            {/* Affichage des jours */}
            <FlatList
                data={weekDays}
                keyExtractor={(item) => item.date.toDateString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                style={{ alignSelf: 'center' }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedDay(item.date.toDateString());
                            setStartHour('');
                            setEndHour('');
                        }}
                        className={`items-center mx-2 px-3 py-2 rounded-full ${
                            selectedDay === item.date.toDateString()
                                ? 'bg-red-500'
                                : 'bg-gray-200'
                        }`}
                    >
                        <Text
                            className={`text-base font-semibold ${
                                selectedDay === item.date.toDateString()
                                    ? 'text-white'
                                    : 'text-gray-800'
                            }`}
                        >
                            {item.dayName}
                        </Text>
                        <Text
                            className={`text-sm ${
                                selectedDay === item.date.toDateString()
                                    ? 'text-white'
                                    : 'text-gray-600'
                            }`}
                        >
                            {item.dayNumber}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            {/* Titre pour les heures */}
            <Text className="text-lg font-bold mt-5 mb-2">Sélectionnez un créneau horaire</Text>
            <FlatList
                data={hours}
                keyExtractor={(item) => item}
                numColumns={2}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => selectHour(item)}
                        className={`flex-1 m-1 p-3 rounded-lg items-center ${
                            item === startHour || item === endHour
                                ? 'bg-red-500'
                                : isInRange(item)
                                    ? 'bg-red-300'
                                    : 'bg-gray-200'
                        }`}
                    >
                        <Text
                            className={`text-base font-medium ${
                                item === startHour || item === endHour
                                    ? 'text-white'
                                    : isInRange(item)
                                        ? 'text-white'
                                        : 'text-gray-800'
                            }`}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            {/* Affichage du créneau sélectionné */}
            <View className="mt-5 items-center">
                <Text className="text-base font-semibold">
                    Jour sélectionné :{' '}
                    <Text className="text-red-500">
                        {selectedDay
                            ? new Date(selectedDay).toLocaleDateString()
                            : 'Aucun'}
                    </Text>
                </Text>
                <Text className="text-base font-semibold mt-2">
                    Heure de début :{' '}
                    <Text className="text-red-500">{startHour || 'Aucune'}</Text>
                </Text>
                <Text className="text-base font-semibold mt-2">
                    Heure de fin :{' '}
                    <Text className="text-red-500">{endHour || 'Aucune'}</Text>
                </Text>
            </View>
        </View>
    );
}

export default SchedulePicker;
