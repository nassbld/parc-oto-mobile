import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from "./screens/OnboardingScreen";
import MyReservationsScreen from "./screens/MyReservationsScreen";
import "./global.css";
import CustomDrawerContent from "./components/CustomDrawerContent";
import {storageService} from "./services/storageService";
import {ActivityIndicator, View} from "react-native";
import apiClient from "./services/apiClient";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import FavoriteAgenciesScreen from "./screens/FavoriteAgenciesScreen";
import {UserProvider} from "./services/UserContext";

export type RootStackParamList = {
    Onboarding: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    ForgotPassword: undefined;
    MyReservations: undefined;
    FavoriteAgencies: undefined;
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
            <Drawer.Screen name="HomeMain" component={HomeScreen}/>
            <Drawer.Screen name="MyReservations" component={MyReservationsScreen}/>
            <Drawer.Screen name="FavoriteAgencies" component={FavoriteAgenciesScreen}/>
        </Drawer.Navigator>
    );
}

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>("Onboarding");

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        try {
            const token = await storageService.getToken();
            if (token) {
                apiClient.defaults.headers.Authorization = `Bearer ${token}`;

                const response = await apiClient.get('/api/auth/verify-token');
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    setInitialRoute('Home');
                }
            } else {
                console.log('Aucun token trouvé');
            }
        } catch (error) {
            console.error('Erreur lors de la vérification du token:', error);
            await storageService.removeToken();
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#C41B1B"/>
            </View>
        );
    }

    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{headerShown: false}}
                    initialRouteName={initialRoute}
                >
                    <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Register" component={RegisterScreen}/>
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
                    <Stack.Screen name="Home" component={HomeDrawer}/>
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}
