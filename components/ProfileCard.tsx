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
                className="absolute bottom-0 h-96 inset-x-0 bg-red-200"
                style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
                entering={FadeInDown.duration(200)}
                exiting={FadeOutDown.duration(200)}
            >
                <View className={'bg-red-200 p-3'}
                      style={{borderRadius: 50, alignSelf: 'center', transform: [{translateY: -30}]}}>
                    <UserIcon size={50} color="#C41B1B"/>
                </View>

                <View className={'mx-5'} style={{marginBottom: 20}}>
                    <Text className="text-2xl tracking-wider">Nour-Eddine</Text>
                    <Text className="text-3xl font-bold ">BELLAOUD</Text>
                    <Text className={"font-extrabold text-red-400 ml-1"}>__ _</Text>
                    <View className={'flex-row justify-between items-center mt-5 mx-2'}>
                        <Text className={'text-gray-600'}>Email</Text>
                        <Text className={'font-semibold'}>bellaoud@gmail.com</Text>
                    </View>
                    <View className={'flex-row justify-between items-center mt-4 mx-2'}>
                        <Text className={'text-gray-600'}>N° de téléphone</Text>
                        <Text className={'font-semibold'}>+33 6 12 34 56 78</Text>
                    </View>
                    <View className={'flex-row justify-between items-center mt-4 mx-2'}>
                        <Text className={'text-gray-600'}>Id</Text>
                        <Text className={'font-semibold'}>e97222</Text>
                    </View>
                </View>

            </Animated.View>
        </View>
    );
}

export default ProfileCard;
