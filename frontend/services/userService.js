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
    console.log({
      username,
      password,
    });
    console.log(`${API_URL}/authorization/login/`);
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

function signUp(username, password, email, firstName, lastName, image) {
  return new Promise((resolve, reject) => {
    console.log(username, password, image);
    axios
      .post(`${API_URL}/authorization/register/`, {
        username,
        password,
        password2: password,
        email,
        first_name: firstName,
        last_name: lastName,
        avatar: image
      },
        // {
        //   headers: {
        //     'content-type': 'multipart/form-data',
        //   }
        // }
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

async function logout() {
  return await resetAuthAsyncStorage();
}

function addProduct(product_id, quantity, id, token) {
  return new Promise((resolve, reject) => {
    console.log(product_id, quantity, id, token);
    axios
      .post(
        `${API_URL}/productManager/add_product_to_cart/`,
        {
          barcode: product_id,
          quantity,
          id,
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

function getShoppingList(id, token) {
  return new Promise((resolve, reject) => {
    console.log(`${API_URL}/base/shoppingCart/${id}/`, token);
    axios
      .get(`${API_URL}/base/shoppingCart/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data.products);
        console.log('bu da responsedur', usernameOb);
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

function getUsersShoppingCartLists(token) {
  return new Promise((resolve, reject) => {
    console.log(`${API_URL}/base/currentUsersShoppingCart/`);
    axios
      .get(`${API_URL}/base/currentUsersShoppingCart/`, {
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

function getShoppingListCommunities(id, token) {
  return new Promise((resolve, reject) => {
    console.log(`${API_URL}/base/currentUsersShoppingCart/${id}/`);
    axios
      .get(`${API_URL}/base/currentUsersShoppingCart/${id}/`, {
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

function removeFromList(product_id, quantity, shopcart_id, token, purchase) {
  return new Promise((resolve, reject) => {
    console.log(product_id, quantity, token);
    axios
      .post(
        `${API_URL}/productManager/remove_from_cart/`,
        {
          barcode: product_id,
          quantity,
          id: shopcart_id,
          purchase
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

function addShoppingList(name, priority, token, communities = []) {
  return new Promise((resolve, reject) => {
    console.log(name, priority, token, communities);
    axios
      .post(
        `${API_URL}/base/currentUsersShoppingCart/`,
        {
          name,
          priority,
          communities,
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

function changeShopListName(id, token, newName) {
  return new Promise((resolve, reject) => {
    console.log(`${API_URL}/base/shoppingCart/${id}/`, token);
    axios
      .put(
        `${API_URL}/base/shoppingCart/${id}/`,
        {
          name: newName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data.products);
        console.log('bu da responsedur', usernameOb);
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

function createCommunity(name, token) {
  return new Promise((resolve, reject) => {
    console.log(`${API_URL}/base/communities/`, name, token);
    axios
      .post(
        `${API_URL}/base/communities/`,
        {
          name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data);
        console.log('bu da responsedur', usernameOb);
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


// Get communities that the current user is a member of:
// * `GET /base/communities/get_memberships/`

// Get communities that the current user owns:
// * `GET /base/communities/get_owned/`

function getCommunities(token) {
  return new Promise((resolve, reject) => {
    console.log(`${API_URL}/base/communities/`, token);
    axios
      .get(
        `${API_URL}/base/communities/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data);
        console.log('bu da responsedur', usernameOb);
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

function getCommunityMembership(token) {
  return new Promise((resolve, reject) => {
    console.log(`${API_URL}/base/communities/get_memberships`, token);
    axios
      .get(
        `${API_URL}/base/communities/get_memberships/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data);
        console.log('bu da responsedur', usernameOb);
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

function getCommunityOwner(token) {
  return new Promise((resolve, reject) => {
    console.log(`${API_URL}/base/communities/get_owned`, token);
    axios
      .get(
        `${API_URL}/base/communities/get_owned/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data);
        console.log('bu da responsedur', usernameOb);
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

function addShoppingListToCommunity(community_id, cart_id, token) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${API_URL}/base/communities/add_cart_to_community/`,
        {
          community_id,
          cart_id
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data);
        console.log('bu da responsedur', usernameOb);
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

function removeShoppingListFromCommunity(community_id, cart_id, token) {
  console.log("you clicked with these values ", community_id, cart_id);
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${API_URL}/base/communities/remove_cart_from_community/`,
        {
          community_id,
          cart_id
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data);
        console.log('bu da responsedur', usernameOb);
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

function deleteShoplist(id, token) {
  return new Promise((resolve, reject) => {
    axios
      .delete(
        `${API_URL}/base/currentUsersShoppingCart/${id}/`,
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

function searchBarcode(barcode, token) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${API_URL}/base/search_by_barcode/?barcode=${barcode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data);
        console.log('bu da responsedur', usernameOb);
        try {
          resolve(JSON.parse(usernameOb));
        } catch (e) {
          reject(e);
        }
      })
      .catch((err) => {
        console.log('error', err);
        // reject(err);
        resolve("error");
        // return err;
      });
  });
}

function updateLocationCoords(latitude, longitude, userId, token) {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `${API_URL}/base/userMeta/${userId}/`,
        {
          latitude,
          longitude
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data);
        console.log('bu da responsedur', usernameOb);
        try {
          resolve(JSON.parse(usernameOb));
        } catch (e) {
          reject(e);
        }
      })
      .catch((err) => {
        console.log('error', err);
        // reject(err);
        resolve("error");
        // return err;
      });
  });
}

function addManuelProduct(product_name, quantity, id, token) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${API_URL}/productManager/add_product_to_cart/`,
        {
          product_name,
          quantity,
          id,
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

function getStatistics(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${API_URL}/base/get_statistics`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data);
        console.log('bu da responsedur', usernameOb);
        try {
          resolve(JSON.parse(usernameOb));
        } catch (e) {
          reject(e);
        }
      })
      .catch((err) => {
        console.log('error', err);
        // reject(err);
        resolve("error");
        // return err;
      });
  });
}

function getUserData(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${API_URL}/base/current_user/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(async (response) => {
        const usernameOb = JSON.stringify(response.data);
        console.log('bu da responsedur', usernameOb);
        try {
          resolve(JSON.parse(usernameOb));
        } catch (e) {
          reject(e);
        }
      })
      .catch((err) => {
        console.log('error', err);
        // reject(err);
        resolve("error");
        // return err;
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
  getUsersShoppingCartLists,
  addShoppingList,
  changeShopListName,
  createCommunity,
  getCommunities,
  getCommunityMembership,
  getCommunityOwner,
  addShoppingListToCommunity,
  removeShoppingListFromCommunity,
  getShoppingListCommunities,
  deleteShoplist,
  searchBarcode,
  updateLocationCoords,
  addManuelProduct,
  getStatistics,
  getUserData
};
