import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { UserIcon } from "react-native-heroicons/solid";
import {useUser} from "../services/UserContext";

function ProfileCard({ onClose }: { onClose: () => void }) {
    const { userData, refreshUserData } = useUser();

    React.useEffect(() => {
        if (!userData) {
            refreshUserData().catch(() => {
                Alert.alert('Erreur', 'Impossible de charger les informations utilisateur.');
            });
        }
    }, []);

    return (
        <View className={'inset-0 absolute'} style={{ zIndex: 100 }}>
            <Animated.View className={'h-full w-full absolute'} entering={FadeIn} exiting={FadeOut}>
                <BlurView tint="dark" intensity={50} className="absolute inset-0">
                    <TouchableOpacity className="absolute inset-0" onPress={onClose} />
                </BlurView>
            </Animated.View>

            <Animated.View className="absolute bottom-0 h-72 inset-x-0 bg-red-200 rounded-t-3xl"
                           entering={FadeInDown.duration(200)} exiting={FadeOutDown.duration(200)}>
                <View className={'bg-red-200 p-3 rounded-full -mt-8 mb-2 self-center'}>
                    <UserIcon size={50} color="#C41B1B"/>
                </View>

                <View className={'mx-7'} style={{ marginBottom: 20 }}>
                    <Text className="text-2xl tracking-wider">{userData?.firstName}</Text>
                    <Text className="text-3xl font-bold">{userData?.lastName}</Text>
                    <Text className={'text-lg text-gray-700 font-semibold tracking-wide mt-1'}>
                        {userData?.matricule}
                    </Text>
                    <Text className={"font-extrabold text-red-400 ml-2"}>__ _</Text>
                    <View className={'flex-row justify-between items-center mt-5'}>
                        <Text className={'text-gray-600'}>Email</Text>
                        <Text className={'font-semibold'}>{userData?.email}</Text>
                    </View>
                    <View className={'flex-row justify-between items-center mt-4'}>
                        <Text className={'text-gray-600'}>N° de téléphone</Text>
                        <Text className={'font-semibold'}>{userData?.phone}</Text>
                    </View>
                </View>

            </Animated.View>
        </View>
    );
}

export default ProfileCard;
