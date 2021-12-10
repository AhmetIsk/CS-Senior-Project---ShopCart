export const url = 'http://localhost:8000/authorization';
// export const url = "http://localhost:5000/api";
import { AsyncStorage } from 'react-native';
export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": AsyncStorage.getItem("token"),
    },
  };

  return headers;
};
