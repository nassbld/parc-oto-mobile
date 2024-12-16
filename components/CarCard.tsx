import React from 'react';
import {Image, Text, View} from 'react-native';
import {Car} from "../theme";

function CarCard({car, isActive}: { car: Car; isActive: boolean }) {

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
        <View style={backGroundStyle} className={'mx-5 p-5 gap-5'}>
            <View className={'flex-row justify-center'}>
                <Image source={car.picture} style={{width: 210, height: 140}}></Image>
            </View>
            <View className={'ml-5'}>
                <Text className={'font-bold text-xl shadow tracking-wide'} style={textStyle}>
                    {car.brand}
                </Text>
                <Text className={'font-semibold text-lg shadow tracking-wide'} style={textStyle}>
                    {car.model}
                </Text>
            </View>
        </View>
    );
}

export default CarCard;
