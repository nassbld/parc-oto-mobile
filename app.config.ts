import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "parc-oto-mobile",
    slug: "parc-oto-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
    },
    ios: {
        supportsTablet: true,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#ffffff",
        },
    },
    web: {
        favicon: "./assets/favicon.png",
        bundler: "metro",
    },
    plugins: [
        "expo-secure-store",
    ],
    extra: {
        apiUrl:
            process.env.NODE_ENV === "development"
                ? "http://192.168.1.37:8080/"
                : "https://production-api.com/api",
    },
    newArchEnabled: true,
});
