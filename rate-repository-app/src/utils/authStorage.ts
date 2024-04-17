import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  namespace: string;
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const accessToken = await AsyncStorage.getItem(
        `${this.namespace}:accessToken`,
      );
    return accessToken? JSON.parse(accessToken):null;
  }

  async setAccessToken(accessToken:any) {
    // Add the access token to the storage
    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      JSON.stringify(accessToken),
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;