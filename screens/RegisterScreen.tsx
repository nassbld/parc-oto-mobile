import React, { useState } from 'react';
import {Alert, ImageBackground, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../App";
import {StackNavigationProp} from "@react-navigation/stack";
import MultiStepCarousel from "../components/MultiStepCarousel";
import Step1 from "../components/RegisterStep1";
import Step2 from "../components/RegisterStep2";
import {authService} from "../services/authService";

function RegisterScreen() {
    type NavigationProps = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProps>();
    const [active, setActive] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [matricule, setMatricule] = useState('');

    const handleRegister = async () => {
        if (!email || !password || !confirmedPassword || !firstName || !lastName || !phoneNumber || !matricule) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }

        if (password !== confirmedPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Erreur', 'Veuillez entrer une adresse email valide.');
            return;
        }

        try {
            const userData = {
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                phone: phoneNumber,
                matricule,
            };

            const response = await authService.register(userData);

            Alert.alert('Succès', 'Votre compte a été créé avec succès.');

            navigation.navigate('Login');

        } catch (error: any) {
            Alert.alert('Erreur d\'inscription', error.message || 'Une erreur est survenue lors de l\'inscription.');
        }
    };


    const steps = [Step1, Step2];

    const {width} = useWindowDimensions();

    return (
        <ImageBackground
            source={require('../assets/images/login-background.png')}
            style={{flex: 1}}
            resizeMode="cover"
        >
            <SafeAreaView className="flex-1 justify-center">
                <StatusBar style="light"/>
                <View className="flex-row items-center gap-5 mx-8 h-1/4 rounded-xl">
                    <TouchableOpacity
                        className="rounded-full bg-red-800 p-2 pr-2.5 items-center justify-center"
                        onPress={() => active === 0 ? navigation.goBack() : setActive(active - 1)}
                    >
                        <ChevronLeftIcon size={28} color="#fff"/>
                    </TouchableOpacity>
                    <View>
                        <Text className="text-white text-5xl font-semibold tracking-wider">Inscription</Text>
                        <Text className="text-gray-400 mt-2">Créez un compte</Text>
                    </View>
                </View>

                <MultiStepCarousel
                    steps={steps}
                    width={width}
                    password={password}
                    confirmedPassword={confirmedPassword}
                    handleFunction={handleRegister}
                    extraData={{
                        email,
                        setEmail,
                        password,
                        setPassword,
                        confirmedPassword,
                        setConfirmedPassword,
                        showPassword,
                        setShowPassword,
                        showConfirmedPassword,
                        setShowConfirmedPassword,
                        firstName,
                        setFirstName,
                        lastName,
                        setLastName,
                        phoneNumber,
                        setPhoneNumber,
                        matricule,
                        setMatricule
                    }}
                />

            </SafeAreaView>
        </ImageBackground>
    );
}

export default RegisterScreen;
