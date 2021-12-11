import { InvalidTokenError } from "jwt-decode";
import {
  AUTH_ERR_LOG_IN,
  AUTH_ERR_LOG_OUT,
  AUTH_LOGGED_IN,
  AUTH_LOGGING_IN,
  AUTH_LOGGING_OUT,
  AUTH_LOGOUT
} from "../../constants/auth";
import { getAuthAsyncStorage, setAuthAsyncStorage } from "../../services/getAuthAsyncStorage";
import {navigate} from "../../services/navRef";
import {userService} from "../../services/userService";

export const loggingIn = (loggingIn) => ({
  type: AUTH_LOGGING_IN,
  payload: loggingIn
});

export const loggedIn = (data) => ({
  type: AUTH_LOGGED_IN,
  payload: data,
});

export const errorLogIn = (errorMessage) => ({
  type: AUTH_ERR_LOG_IN,
  payload: errorMessage,
});

export const login = (username, password) => (dispatch) => {
  dispatch(loggingIn(true));
  userService.login(username, password).then(async (res) => {
    await dispatch(loggedIn(JSON.stringify(res.data)));
    await setAuthAsyncStorage(res);
    console.log(" bakin bu response dur: ", JSON.stringify(res.data));
    await navigate('Home');
  }).catch(() => {
    dispatch(errorLogIn('Wrong username or password'));
  }).finally(() => {
    dispatch(loggingIn(false));
  });
};

export const loggedOut = () => ({
  type: AUTH_LOGOUT,
});

export const loggingOut = (lOut) => ({
  type: AUTH_LOGGING_OUT,
  payload: lOut,
});

export const errorLogOut = (errorMessage) => ({
  type: AUTH_ERR_LOG_OUT,
  payload: errorMessage,
});

export const logout = () => async (dispatch) => {
  dispatch(loggingOut(true));
  await userService.logout().then(() => {
    dispatch(loggedOut());
  }).catch(() => {
    dispatch(errorLogOut('Error logging out.'));
  }).finally(() => {
    dispatch(loggingOut(false));
  });
};
