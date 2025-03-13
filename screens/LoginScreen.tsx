import React, {useState} from 'react';
import {Alert, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {ChevronLeftIcon, EyeIcon, EyeSlashIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../App";
import {StackNavigationProp} from "@react-navigation/stack";
import InputWithLabel from "../components/InputWithLabel";
import {authService} from "../services/authService";
import {storageService} from "../services/storageService";
import apiClient from "../services/apiClient";


function LoginScreen() {
    type NavigationProps = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProps>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erreur', 'Veuillez saisir votre email et votre mot de passe.');
            return;
        }

        try {
            const credentials = { email, password };

            const response = await authService.login(credentials);

            // Connexion réussie : sauvegarde du token
            const token = response.token; // Assure-toi que la réponse contient bien un champ "token"
            if (token) {
                await storageService.saveToken(token);
                apiClient.defaults.headers.Authorization = `Bearer ${token}`;

                Alert.alert('Succès', 'Vous êtes connecté avec succès.');

                // Navigation vers la page principale de l'application
                navigation.navigate('Home');
            } else {
                throw new Error('Token non reçu depuis le serveur.');
            }

        } catch (error: any) {
            // Afficher l'erreur retournée par l'API
            Alert.alert('Erreur de connexion', error.message || 'Une erreur est survenue lors de la connexion.');
        }
    };


    return (
        <ImageBackground
            source={require('../assets/images/login-background.png')}
            style={{flex: 1}}
            resizeMode="cover"
        >
            <SafeAreaView className="flex-1 justify-center">
                <StatusBar style="light"/>

                <View className="flex-row items-center gap-5 mx-8 h-1/3">
                    <View>
                        <Text className="text-white text-5xl font-semibold tracking-wider">Connexion</Text>
                        <Text className="text-gray-400 mt-2">Connectez-vous à votre compte</Text>
                    </View>
                </View>

                <View className="flex-1 py-12 px-6 bg-red-100 justify-between">
                    <View className="gap-3">
                        <InputWithLabel
                            label="Adresse email"
                            value={email}
                            onChangeText={setEmail} secureTextEntry={undefined} rightIcon={undefined}
                        />

                        <InputWithLabel
                            label="Mot de passe"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            rightIcon={
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="pr-4">
                                    {showPassword ? <EyeSlashIcon size={24} color="#4b5563"/> :
                                        <EyeIcon size={24} color="#4b5563"/>}
                                </TouchableOpacity>
                            }
                        />

                        {/* Lien Mot de passe oublié */}
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text className="text-right font-bold text-red-400 mt-3">Mot de passe oublié ?</Text>
                        </TouchableOpacity>

                        {/* Bouton Connexion */}
                        <TouchableOpacity
                            onPress={handleLogin}
                            className="bg-red-400 py-4 rounded-xl"
                        >
                            <Text className="text-center text-white font-bold text-xl tracking-wide">Connexion</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Lien Inscription */}
                    <View className="mt-10 flex-row justify-center">
                        <Text className="text-gray-400">Vous n'avez pas de compte ? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text className="text-red-400 font-bold">Inscrivez-vous</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

export default LoginScreen;
