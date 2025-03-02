export default {
    expo: {
        name: "parc-oto-mobile",
        slug: "parc-oto-mobile",
        version: "1.0.0",
        plugins: [
            "expo-secure-store"
        ],
        extra: {
            apiUrl: process.env.NODE_ENV === 'development'
                ? "http://192.168.1.37:8080/"
                : "https://production-api.com/api"
        }
    }
};
