import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import InputWithLabel from "../components/InputWithLabel";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { LockClosedIcon } from "react-native-heroicons/solid";

type Step1Props = {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    confirmedPassword: string;
    setConfirmedPassword: (confirmedPassword: string) => void;
    showPassword: boolean;
    setShowPassword: (showPassword: boolean) => void;
    showConfirmedPassword: boolean;
    setShowConfirmedPassword: (showConfirmedPassword: boolean) => void;
};

const Step1 = ({
                   email,
                   setEmail,
                   password,
                   setPassword,
                   confirmedPassword,
                   setConfirmedPassword,
                   showPassword,
                   setShowPassword,
                   showConfirmedPassword,
                   setShowConfirmedPassword
               }: Step1Props) => (
    <View className="gap-3 my-5">
        <InputWithLabel
            label="Adresse email"
            value={email}
            onChangeText={setEmail}
            keyboardType={"email-address"}
            returnKeyType={"next"}
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
        <InputWithLabel
            label="Confirmer le mot de passe"
            value={confirmedPassword}
            onChangeText={setConfirmedPassword}
            secureTextEntry={!showConfirmedPassword}
            rightIcon={
                <TouchableOpacity onPress={() => setShowConfirmedPassword(!showConfirmedPassword)} className="pr-4">
                    {showConfirmedPassword ? <EyeSlashIcon size={24} color="#4b5563"/> :
                        <EyeIcon size={24} color="#4b5563"/>}
                </TouchableOpacity>
            }
        />
        <View className="flex-row mx-2 items-center gap-1">
            <LockClosedIcon size={16} color="#9ca3af"/>
            <Text className="text-gray-400 font-semibold">Minimum 6 caractères </Text>
        </View>
    </View>
);

export default Step1;
