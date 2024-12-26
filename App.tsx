import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ReservationScreen from "./components/ReservationModal";
import OnboardingScreen from "./screens/OnboardingScreen";
import MyReservationsScreen from "./screens/MyReservationsScreen";
import "./global.css";
import { Agency, Car } from "./theme";
import CustomDrawerContent from "./components/CustomDrawerContent";

export type RootStackParamList = {
    Onboarding: undefined;
    Login: undefined;
    Home: undefined;
    MyReservations: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                drawerStyle: {
                    backgroundColor: '#fecaca'
                },
            }}
        >
            <Drawer.Screen name="HomeMain" component={HomeScreen} />
            <Drawer.Screen name="MyReservations" component={MyReservationsScreen} />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeDrawer} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
