import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Animated, {FadeIn, FadeInDown, FadeOut, FadeOutDown} from "react-native-reanimated";
import {BlurView} from "expo-blur";
import {UserIcon} from "react-native-heroicons/solid";

function ProfileCard({onClose}: { onClose: () => void }) {
    return (
        <View className={'inset-0 absolute'} style={{zIndex: 100}}>
            <Animated.View className={'h-full w-full absolute'}
                           entering={FadeIn}
                           exiting={FadeOut}>
                <BlurView tint="dark"
                          intensity={50}
                          className="absolute inset-0">
                    <TouchableOpacity
                        className="absolute inset-0"
                        onPress={onClose}
                    />
                </BlurView>
            </Animated.View>

            <Animated.View
                className="absolute bottom-0 h-72 inset-x-0 bg-red-200 rounded-t-3xl"
                entering={FadeInDown.duration(200)}
                exiting={FadeOutDown.duration(200)}
            >
                <View className={'bg-red-200 p-3 rounded-full -mt-8 mb-2 self-center'}>
                    <UserIcon size={50} color="#C41B1B"/>
                </View>

                <View className={'mx-7'} style={{marginBottom: 20}}>
                    <Text className="text-2xl tracking-wider">Nour-Eddine</Text>
                    <Text className="text-3xl font-bold ">BELLAOUD</Text>
                    <Text className={'text-lg text-gray-700 font-semibold tracking-wide mt-1'}>E97222</Text>
                    <Text className={"font-extrabold text-red-400 ml-2"}>__ _</Text>
                    <View className={'flex-row justify-between items-center mt-5'}>
                        <Text className={'text-gray-600'}>Email</Text>
                        <Text className={'font-semibold'}>bellaoud@gmail.com</Text>
                    </View>
                    <View className={'flex-row justify-between items-center mt-4'}>
                        <Text className={'text-gray-600'}>N° de téléphone</Text>
                        <Text className={'font-semibold'}>+33 6 12 34 56 78</Text>
                    </View>
                </View>

            </Animated.View>
        </View>
    );
}

export default ProfileCard;
