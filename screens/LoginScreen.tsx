import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Pour les icônes
import { StatusBar } from 'expo-status-bar';

function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        // Ajoutez la logique de connexion ici
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <SafeAreaView className="flex-1 bg-red-700">
            <StatusBar style="light" />

            <View className="mt-24 mb-10 mx-6">
                <Text className="text-white text-4xl font-bold tracking-wider">Connectez-vous</Text>
                <Text className="text-gray-400 text-sm mt-2">Connectez-vous à votre compte</Text>
            </View>

            <View className="flex-1 py-16 px-6 mb-8 mx-2 bg-red-200 rounded-xl justify-between">
                <View className="gap-5">
                    <View className="border-2 border-white rounded-xl flex-row items-center px-4 py-6">
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            placeholderTextColor="#aaa"
                            className="flex-1 text-black font-semibold tracking-wide"
                            keyboardType="email-address"
                        />
                    </View>

                    {/* Champ Mot de passe */}
                    <View className="border-2 border-white rounded-xl flex-row items-center px-4 py-6 mb-2">
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password"
                            placeholderTextColor="#aaa"
                            secureTextEntry={!showPassword}
                            className="flex-1 text-black font-semibold tracking-wide"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={20}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Lien Mot de passe oublié */}
                    <TouchableOpacity>
                        <Text className="text-right font-bold text-red-400">Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Bouton Connexion */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        className="bg-red-400 py-4 rounded-xl"
                    >
                        <Text className="text-center text-white font-bold text-xl tracking-wide">Login</Text>
                    </TouchableOpacity>
                </View>

                {/* Lien Inscription */}
                <View className="mt-10 flex-row justify-center">
                    <Text className="text-gray-400">Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text className="text-red-400 font-bold">Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;
