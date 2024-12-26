import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {DrawerActions, NavigationProp, useNavigation} from "@react-navigation/native";
import {Bars3CenterLeftIcon, UserIcon} from "react-native-heroicons/solid";
import {SafeAreaView} from "react-native-safe-area-context";
import {RootStackParamList} from "../App";
import ProfileCard from "../components/ProfileCard";

function MyReservationsScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [showProfile, setShowProfile] = useState(false);

    return (
        <SafeAreaView className={"flex-1 bg-red-200"}>
            <StatusBar style={'dark'}></StatusBar>

            {/*Header*/}

            <View
                className="absolute inset-x-0 top-0 px-6 pt-11 pb-3 flex-row justify-between items-center bg-red-200"
                style={{zIndex: 10}}
            >
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Bars3CenterLeftIcon size={30} color="black" />
                </TouchableOpacity>

                <TouchableOpacity className="p-2 rounded-xl bg-red-400"
                                  onPress={() => setShowProfile(!showProfile)}>
                    <UserIcon size={25} color="#C41B1B"/>
                </TouchableOpacity>
            </View>

            {
                showProfile && <ProfileCard onClose={() => setShowProfile(false)}/>
            }


        </SafeAreaView>
    );
}

export default MyReservationsScreen;
