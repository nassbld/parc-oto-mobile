import React from 'react';
import { View } from 'react-native';
import InputWithLabel from "../components/InputWithLabel";

type Step2Props = {
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
    phoneNumber: string;
    setPhoneNumber: (phoneNumber: string) => void;
    matricule: string;
    setMatricule: (matricule: string) => void;
};

const Step2 = ({
                   firstName,
                   setFirstName,
                   lastName,
                   setLastName,
                   phoneNumber,
                   setPhoneNumber,
                   matricule,
                   setMatricule
               }: Step2Props) => (
    <View className="gap-2 my-2">
        <InputWithLabel
            label="Prénom"
            value={firstName}
            onChangeText={setFirstName}
        />
        <InputWithLabel
            label="Nom"
            value={lastName}
            onChangeText={setLastName}
        />
        <InputWithLabel
            label="Numéro de téléphone"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
        />
        <InputWithLabel
            label="Matricule entreprise"
            value={matricule}
            onChangeText={setMatricule}
        />
    </View>
);

export default Step2;
