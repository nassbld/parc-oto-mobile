import React, {useState} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../App";
import {StackNavigationProp} from "@react-navigation/stack";


function LoginScreen() {
    type NavigationProps = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProps>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Ajoutez la logique de connexion ici
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <ImageBackground
            source={require('../assets/images/login-background.png')}
            style={{flex: 1}}
            resizeMode="cover"
        >
            <SafeAreaView className="flex-1">
                <StatusBar style="light"/>

                <View className="mt-12 mb-6 mx-6 flex-row items-center gap-5">
                    <TouchableOpacity className="rounded-full bg-red-800 p-2 pr-2.5 items-center justify-center"
                                      onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size={28} color="#fff"></ChevronLeftIcon>
                    </TouchableOpacity>
                    <View className="overflow-auto">
                        <Text className="text-white text-4xl font-bold tracking-wider flex-wrap">Mot de passe oublié
                            ?</Text>
                        <Text className="text-gray-400 text-sm mt-2">Entrez votre adresse mail</Text>
                    </View>
                </View>

                <View className="flex-1 py-10 px-6 mb-40 mx-2 bg-red-200 rounded-2xl justify-between">
                    <View>
                        <FloatingLabelInput
                            label="Adresse email"
                            className="pt-6 pb-3 px-3"
                            value={email}
                            onChangeText={setEmail}
                            containerStyles={{
                                borderWidth: 1,
                                borderColor: "#9ca3af",
                                borderRadius: 8,
                                paddingHorizontal: 10,
                                backgroundColor: "transparent"
                            }}
                            customLabelStyles={{
                                colorBlurred: "#4b5563",
                                colorFocused: "#6b7280",
                                fontSizeFocused: 12,
                            }}
                            inputStyles={{
                                color: "#374151",
                                fontSize: 16,
                                marginTop: 4
                            }}
                        />
                    </View>

                    {/* Bouton Connexion */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        className="bg-red-400 py-4 rounded-xl"
                    >
                        <Text className="text-center text-white font-bold text-xl tracking-wide">Connexion</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

export default LoginScreen;
