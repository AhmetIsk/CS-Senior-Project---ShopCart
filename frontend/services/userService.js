/* eslint-disable import/prefer-default-export */
/* eslint-disable no-return-await */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { API_URL } from '../config/constants';
import { resetAuthAsyncStorage, setAuthAsyncStorage } from './getAuthAsyncStorage';

function login(username, password) {
  return new Promise((resolve, reject) => {
    console.log(username, password);
    axios
      .post(`${API_URL}/authorization/login/`, {
        username,
        password,
      })
      .then(async (response) => {
        let usernameOb = JSON.stringify(jwt_decode(response.data.access));
        usernameOb = JSON.parse(usernameOb);
        console.log('bu da response', usernameOb);
        try {
          await setAuthAsyncStorage(response);
          resolve(response);
        } catch (e) {
          reject(e);
        }
      })
      .catch((err) => {
        console.log('error', err);
        reject(err);
      });
  });
}

function signUp(username, password, email, firstName, lastName) {
  return new Promise((resolve, reject) => {
    console.log(username, password);
    axios
      .post(`${API_URL}/authorization/register/`, {
        username,
        password,
        password2: password,
        email,
        first_name: firstName,
        last_name: lastName,
      })
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data);
        console.log('bu da response', usernameOb);
        try {
          resolve(response);
        } catch (e) {
          reject(e);
        }
      })
      .catch((err) => {
        console.log('error', err);
        reject(err);
      });
  });
}

async function logout() {
  return await resetAuthAsyncStorage();
}

function addProduct(product_id, quantity, token) {
  return new Promise((resolve, reject) => {
    console.log(product_id, quantity, token);
    axios
      .post(
        `${API_URL}/productManager/add_product_to_cart/`,
        {
          barcode: product_id,
          quantity,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data);
        console.log('bu da response', usernameOb);
        try {
          resolve(response);
        } catch (e) {
          reject(e);
        }
      })
      .catch((err) => {
        console.log('error', err);
        reject(err);
      });
  });
}

function getShoppingList(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/productManager/get_shopping_cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data);
        console.log('bu da response', usernameOb);
        try {
          resolve(JSON.parse(usernameOb));
        } catch (e) {
          reject(e);
        }
      })
      .catch((err) => {
        console.log('error', err);
        reject(err);
      });
  });
}

function removeFromList(product_id, quantity, token) {
  return new Promise((resolve, reject) => {
    console.log(product_id, quantity, token);
    axios
      .post(
        `${API_URL}/productManager/remove_from_cart/`,
        {
          barcode: product_id,
          quantity,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data);
        console.log('bu da response', usernameOb);
        try {
          resolve(response);
        } catch (e) {
          reject(e);
        }
      })
      .catch((err) => {
        console.log('error', err);
        reject(err);
      });
  });
}

export const userService = {
  login,
  logout,
  signUp,
  addProduct,
  getShoppingList,
  removeFromList,
};
