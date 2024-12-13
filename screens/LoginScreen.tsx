import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';

function LoginScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView className="flex-1 bg-white inset-0">
            <StatusBar style="light" />
            <Image className="h-full w-full absolute" source={require('../assets/images/background.png')} />
            <View className="flex-row justify-around w-full absolute">
                <Animated.View entering={FadeInLeft.delay(200).duration(1000)}>
                    <Image className="h-[200] w-[200] mt-8" source={require('../assets/images/car-icon.png')} />
                </Animated.View>
                <Animated.View entering={FadeInRight.delay(400).duration(1000)}>
                    <Image className="h-[100] w-[90] mt-12 mr-10" source={require('../assets/images/car-icon.png')} style={{ transform: [{ scaleX: -1 }] }} />
                </Animated.View>
            </View>

            <View className="flex-1 justify-center pt-48 pb-10 gap-10">
                <View className="flex items-center">
                    <Text className="text-white font-bold tracking-wider text-3xl">
                        Se connecter
                    </Text>
                </View>

                <View className="flex items-center mx-5 gap-5">
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-white/30 p-5 rounded-2xl w-full">
                        <TextInput placeholder="Email" placeholderTextColor="gray" className="p-1 rounded-xl w-full" />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-white/30 p-5 rounded-2xl w-full">
                        <TextInput placeholder="Mot de passe" placeholderTextColor="gray" secureTextEntry className="p-1 rounded-xl w-full" />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full">
                        <TouchableOpacity
                            className="w-full bg-red-400 p-3 rounded-2xl mb-3"
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text className="text-xl font-bold text-white text-center">
                                Se connecter
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="flex-row justify-center">
                        <Text>Pas de compte ? </Text>
                        <TouchableOpacity>
                            <Text className="text-red-500">
                                Inscrivez-vous
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;
