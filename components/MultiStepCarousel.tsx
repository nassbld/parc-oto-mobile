import React, { useState, useRef } from 'react';
import { Animated as NativeAnimated, FlatList, Text, TouchableOpacity, View, Alert } from 'react-native';
import Paginator from "./Paginator";
import {ChevronRightIcon} from "react-native-heroicons/solid";
import Animated, {FadeIn, FadeInLeft, FadeOut, FadeOutRight} from 'react-native-reanimated';

type MultiStepCarouselProps = {
    steps: any;
    width: number;
    password: string;
    confirmedPassword: string;
    handleFunction?: () => void;
    extraData?: any;
};

const MultiStepCarousel = ({ steps, width, password, confirmedPassword, handleFunction, extraData }: MultiStepCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new NativeAnimated.Value(0)).current;
    const slidesRef = useRef<FlatList>(null);
    const viewableItemsChanged = useRef(({viewableItems}: any) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;
    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const scrollToNext = () => {
        if (!validateStep()) return;

        if (currentIndex < steps.length - 1 && slidesRef.current != null) {
            slidesRef.current.scrollToIndex({index: currentIndex + 1});
        } else {
            console.log('Last item.');
        }
    };

    const scrollToPrevious = () => {
        if (currentIndex > 0 && slidesRef.current != null) {
            slidesRef.current.scrollToIndex({index: currentIndex - 1});
        } else {
            console.log('First item.');
        }
    };

    const validateStep = (): boolean => {
        if (currentIndex === 0) {
            if (!extraData.email || !extraData.password || !extraData.confirmedPassword) {
                Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
                return false;
            }
            if (extraData.password.length < 6) {
                Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
                return false;
            }
            if (extraData.password !== extraData.confirmedPassword) {
                Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(extraData.email)) {
                Alert.alert('Erreur', 'Veuillez entrer une adresse email valide.');
                return false;
            }
        }

        if (currentIndex === 1) {
            if (!extraData.firstName || !extraData.lastName || !extraData.phoneNumber || !extraData.matricule) {
                Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
                return false;
            }
        }

        return true;
    };


    return (
        <View className="flex-1 bg-red-100 justify-between py-4">
            <View>
                <FlatList
                    data={steps}
                    renderItem={({ item: StepComponent }) => (
                        <View style={{ width }} className="px-5">
                            <StepComponent {...extraData} /> {/* Passe les props ici */}
                        </View>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    pagingEnabled
                    bounces={false}
                    onScroll={NativeAnimated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                    keyboardShouldPersistTaps='handled'
                />
            </View>

            <View className="mx-12">
                <Paginator data={steps} scrollX={scrollX} />

                {currentIndex != steps.length - 1 ? (
                    <TouchableOpacity
                        onPress={scrollToNext}
                        className="bg-red-400 py-4 rounded-xl mt-3"
                    >
                        <Animated.View entering={FadeInLeft} exiting={FadeOutRight} className="flex-row justify-center items-center gap-3">
                            <Text className="text-center text-white font-bold text-xl tracking-wide">Suivant</Text>
                            <ChevronRightIcon size={20} color="#fff"/>
                        </Animated.View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleFunction}
                        className="bg-red-400 py-4 rounded-xl flex-row justify-center items-center gap-3 mt-3"
                    >
                        <Animated.Text entering={FadeIn.delay(100)} className="text-center text-white font-bold text-xl tracking-wide">Créer le compte</Animated.Text>
                    </TouchableOpacity>
                )}

                <View className="h-16">
                    {currentIndex != 0 ? (
                        <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(200)}>
                            <TouchableOpacity onPress={scrollToPrevious} className="py-3">
                                <Text
                                    className="text-center text-gray-500 font-semibold text-lg tracking-wide">Précédent</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ) : null}
                </View>
            </View>
        </View>
    );
};

export default MultiStepCarousel;
