import axios from "axios";
import { url } from "../../api";

export const signUp = (user) => {
  return (dispatch) => {
    axios
      .post(`${url}/signup`, user)
      .then((token) => {
        localStorage.setItem("token", token.data);

        dispatch({
          type: "SIGN_UP",
          token: token.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const signIn = (email, password) => {
  console.log(email, password)
  console.log("SIGNING IN")
  return (dispatch) => {
    axios
      .post(`${url}/login/`, { email, password })
      .then((token) => {
        localStorage.setItem("token", token.data);
        console.log(token.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_TODOS",
    });

    dispatch({
      type: "SIGN_OUT",
    });

  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token) {
      dispatch({
        type: "USER_LOADED",
        token,
      });
    } else return null;
  };
};
