import * as SecureStore from 'expo-secure-store';

export const storageService = {
    async saveToken(token: string) {
        await SecureStore.setItemAsync('userToken', token);
    },

    async getToken() {
        return await SecureStore.getItemAsync('userToken');
    },

    async removeToken() {
        await SecureStore.deleteItemAsync('userToken');
    }
};
