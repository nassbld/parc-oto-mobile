import React from 'react';
import {Image, Text, View} from 'react-native';
import {Car} from "../theme";
import {VehicleIdentityDTO} from "../dtos/dtos";

function CarCard({vehicle, isActive}: { vehicle: VehicleIdentityDTO; isActive: boolean }) {

    let backGroundStyle = {
        width: 270,
        borderRadius: 40,
        backgroundColor: isActive ? '#c41b1b' : '#fee2e2',
        borderWidth: 3,
        borderColor: '#c41b1b'
    }

    let textStyle = {
        color: isActive ? 'white' : 'black',
    }

    return (
        <View style={backGroundStyle} className={'mx-2 p-5 gap-5'}>
            <View className={'flex-row justify-center'}>
                <Image source={{uri: vehicle.imageUrl}} style={{width: 200, height: 140}}></Image>
            </View>
            <View className={'ml-2'}>
                <Text className={'font-bold text-xl tracking-wide'} style={textStyle}>
                    {vehicle.brand}
                </Text>
                <Text className={'font-semibold text-lg tracking-wide'} style={textStyle}>
                    {vehicle.model}
                </Text>
            </View>
        </View>
    );
}

export default CarCard;
