import React from 'react';
import {Dimensions, View} from "react-native";
import LottieView from "lottie-react-native";
import carAnimation from '../assets/animations/car-animation.json';
import loginAnimation from '../assets/animations/login-animation.json';
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../App";
import Onboarding from "react-native-onboarding-swiper";
import {StackNavigationProp} from "@react-navigation/stack";

const {width, height} = Dimensions.get("window");

function OnboardingScreen() {
    type NavigationProps = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProps>();

    const boardingDone = () => {
        navigation.replace('Login');
    }

    return (
        <View className={'flex-1 bg-white'}>
            <Onboarding
                onDone={boardingDone}
                nextLabel={'Suivant'}
                showSkip={false}
                containerStyles={{paddingVertical: 20}}
                titleStyles={{width: width * 0.8, fontWeight: 'bold', textAlign: 'left'}}
                subTitleStyles={{width: width * 0.8, textAlign: 'left'}}
                pages={[
                    {
                        backgroundColor: '#DC2626',
                        image: (
                            <View className={'items-center justify-center h-52 my-5'}>
                                <LottieView
                                    style={{ width: width, height: height * 0.4 }}
                                    source={carAnimation}
                                    autoPlay />
                            </View>
                        ),
                        title: 'Réservez un véhicule en quelques clics !',
                        subtitle: 'Bienvenue sur votre nouvelle application qui facilite la réservation de véhicule d\'entreprise',
                    },
                    {
                        backgroundColor: '#F87171',
                        image: (
                            <View className={'items-center justify-center h-52 my-5'}>
                                <LottieView
                                    style={{ width: width, height: height * 0.5 }}
                                    source={loginAnimation}
                                    autoPlay />
                            </View>
                        ),
                        title: 'Dites-nous qui vous êtes\net nous vous donnerons les clés',
                        subtitle: 'Connectez-vous avec votre compte',
                    }
                ]}
            />
        </View>
    );
}

export default OnboardingScreen;
