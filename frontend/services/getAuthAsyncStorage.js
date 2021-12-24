import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export async function getAuthAsyncStorage() {
  const token = await AsyncStorage.getItem('userToken');
  const user = await AsyncStorage.getItem('userData');
  return {
    token,
    user: JSON.parse(user),
  };
}

export function getToken() {
  return AsyncStorage.getItem('userToken');
}

export async function setAuthAsyncStorage(response) {
  await AsyncStorage.setItem('userToken', response.data.access);
  await AsyncStorage.setItem('userData', JSON.stringify(jwt_decode(response.data.access)));
}

export async function resetAuthAsyncStorage() {
  await AsyncStorage.removeItem('userData');
  await AsyncStorage.removeItem('userToken');
}
