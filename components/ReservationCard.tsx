import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Reservation} from "../theme";
import {BuildingOfficeIcon, ChevronRightIcon, KeyIcon, XMarkIcon} from "react-native-heroicons/solid";
import ReservationModal from "./ReservationModal";
import EditReservationModal from "./EditReservationModal";

interface ReservationCardProps {
    reservation: Reservation;
}

function ReservationCard({reservation}: ReservationCardProps) {
    const [reservationVisible, setReservationVisible] = useState(false);

    return (
        <View className="mx-5 my-2 p-4 rounded-lg bg-red-50 gap-3">
            <Text className="text-lg font-bold text-gray-800 mb-2">
                {`Le ${reservation.startDate.toLocaleDateString('fr-FR')} de ${reservation.startDate.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                })} à ${reservation.endDate.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}`}
            </Text>
            <View className={'flex-row items-center gap-2'}>
                <KeyIcon size={15} color={'gray'}/>
                <View>
                    <View className={'flex-row'}>
                        <Text className="font-bold">{reservation.car.brand} • </Text>
                        <Text className="font-semibold">{reservation.car.model}</Text>
                    </View>
                    <Text className="text-sm font-semibold text-gray-600">DF-654-PG</Text>
                </View>
            </View>
            <View className={'flex-row items-center gap-2'}>
                <BuildingOfficeIcon size={15} color={'gray'}/>
                <Text className="text-sm text-gray-600">{reservation.agency.name}, {reservation.agency.city}</Text>
            </View>

            {
                reservation.status === "upcoming" ?
                    <View className={'flex-row items-center gap-2 mt-4'}>
                        <TouchableOpacity className={'flex-1 flex-row items-center justify-center bg-red-50 border-red-200 border-2 py-2 px-4 rounded-lg'}>
                            <Text className={'font-semibold text-gray-800'}>Annuler</Text>
                            <XMarkIcon size={20} color={'gray'}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={'flex-1 flex-row items-center justify-center bg-red-200 py-2 px-4 rounded-lg'}
                            onPress={() => setReservationVisible(true)}>
                            <Text className={'text-lg font-semibold text-gray-800'}>Modifier</Text>
                            <ChevronRightIcon size={20} color={'gray'}/>
                        </TouchableOpacity>
                    </View> : null
            }

            {
                reservation.status === "completed" ?
                    <View className={'flex-row items-center gap-2 mt-4'}>
                        <TouchableOpacity className={'flex-1 flex-row items-center justify-center bg-red-200 py-2 px-4 rounded-lg'}>
                            <Text className={'text-lg font-semibold text-gray-800'}>Effectuer un signalement</Text>
                            <ChevronRightIcon size={20} color={'gray'}/>
                        </TouchableOpacity>
                    </View> : null
            }

            {
                reservationVisible ?

                    <EditReservationModal
                        visible={reservationVisible}
                        onClose={() => setReservationVisible(false)}
                        reservation={reservation}
                    /> : null
            }

        </View>
    );
}

export default ReservationCard;
