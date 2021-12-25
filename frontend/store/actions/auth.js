// import { InvalidTokenError } from "jwt-decode";
import { resetAuthAsyncStorage, setAuthAsyncStorage } from "../../services/getAuthAsyncStorage";
import {navigate} from "../../services/navRef";
import {userService} from "../../services/userService";
import { resetToken, setToken } from "../slices/token";


export const login = (username, password, dispatch)  => {
  // dispatch(loggingIn(true));
  userService.login(username, password).then(async (res) => {
    // await dispatch(loggedIn(JSON.stringify(res.data)));
    await setAuthAsyncStorage(res);
    dispatch(setToken(res.data.access));
    console.log(" bakin bu response dur: ", JSON.stringify(res.data));
    // await navigate('Home');
  }).catch(() => {
    // dispatch(errorLogIn('Wrong username or password'));
  }).finally(() => {
    // dispatch(loggingIn(false));
  });
};

export const signUp = (username, password, email, firstName, lastName )  => {
  // dispatch(loggingIn(true));
  userService.signUp(username, password, email, firstName, lastName).then(async (res) => {
    // await dispatch(loggedIn(JSON.stringify(res.data)));
    console.log(" bakin bu response dur: ", JSON.stringify(res.data));
    await navigate('Login');
  }).catch(() => {
    // dispatch(errorLogIn('Wrong username or password'));
  }).finally(() => {
    // dispatch(loggingIn(false));
  });
};

export const logout = async (dispatch) => {
  // dispatch(loggingOut(true));
  await userService.logout().then(() => {
    resetAuthAsyncStorage();
    dispatch(resetToken());
    // dispatch(loggedOut());
  }).then(() => navigate('Login')
  ).catch(() => {
    // dispatch(errorLogOut('Error logging out.'));
  }).finally(() => {
    // dispatch(loggingOut(false));
  });
};
