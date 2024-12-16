import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ReservationScreen from "./screens/ReservationScreen";
import "./global.css";
import {Agency, Car} from "./theme";

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Reservation: { activeCar: Car, activeAgency: Agency };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Reservation" component={ReservationScreen} options={{ presentation: "modal" }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
