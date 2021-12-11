import axios from 'axios';
import { API_URL } from '../config/constants';
import {resetAuthAsyncStorage, setAuthAsyncStorage} from "./getAuthAsyncStorage";
import jwt_decode from 'jwt-decode';

function login(username, password) {
  return new Promise((resolve, reject) => {
    console.log(username, password)
    axios.post(`${API_URL}/login/`, {
      "username": username,
      "password": password
    }).then(async (response) => {
      let usernameOb = JSON.stringify(jwt_decode(response.data.access))
      usernameOb = JSON.parse(usernameOb);
      console.log('bu da response', usernameOb)
      try {
        await setAuthAsyncStorage(response);
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      console.log('error', err);
      reject(err)
    });
  });
}

function signUp(username, password, email, firstName, lastName) {
  return new Promise((resolve, reject) => {
    console.log(username, password)
    axios.post(`${API_URL}/register/`, {
      "username": username,
      "password": password,
      "password2": password,
      "email": email,
      "first_name": firstName,
      "last_name": lastName
    }).then(async (response) => {
      let usernameOb = JSON.stringify(response.data)
      console.log('bu da response', usernameOb)
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      console.log('error', err);
      reject(err)
    });
  });
}

async function logout() {
  return await resetAuthAsyncStorage();
}

export const userService = {
  login,
  logout,
  signUp
};
