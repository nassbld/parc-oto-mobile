import React from 'react';
import {View, Text, TextInput} from 'react-native';

const InputWithLabel = ({label, value, onChangeText, secureTextEntry, rightIcon, keyboardType, returnKeyType}: any) => (
    <View>
        <Text className="text-gray-600 text-sm mb-1 ml-1">{label}</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg bg-transparent">
            <TextInput
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                className="flex-1 px-4 py-4 text-gray-800 text-justify"
            />
            {rightIcon}
        </View>
    </View>
);

export default InputWithLabel;
