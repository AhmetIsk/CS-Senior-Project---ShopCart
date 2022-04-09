// import { InvalidTokenError } from "jwt-decode";
import { resetAuthAsyncStorage, setAuthAsyncStorage } from '../../services/getAuthAsyncStorage';
import { navigate } from '../../services/navRef';
import { userService } from '../../services/userService';
import { resetToken, setToken } from '../slices/token';
import { resetUser, setUser } from '../slices/user';

export const login = (username, password, dispatch) => {
  // dispatch(loggingIn(true));
  userService
    .login(username, password)
    .then(async (res) => {
      // await dispatch(loggedIn(JSON.stringify(res.data)));
      await setAuthAsyncStorage(res);
      dispatch(setToken(res.data.access));
      dispatch(setUser(res.data.user));
      console.log(res.data.user);
      console.log(' bakin bu response dur: ', JSON.stringify(res.data));
      // await navigate('Home');
    })
    .catch(() => {
      // dispatch(errorLogIn('Wrong username or password'));
    })
    .finally(() => {
      // dispatch(loggingIn(false));
    });
};

export const signUp = (username, password, email, firstName, lastName) => {
  // dispatch(loggingIn(true));
  userService
    .signUp(username, password, email, firstName, lastName)
    .then(async (res) => {
      // await dispatch(loggedIn(JSON.stringify(res.data)));
      console.log(' bakin bu response dur: ', JSON.stringify(res.data));
      await navigate('Login');
    })
    .catch(() => {
      // dispatch(errorLogIn('Wrong username or password'));
    })
    .finally(() => {
      // dispatch(loggingIn(false));
    });
};

export const logout = async (dispatch) => {
  // dispatch(loggingOut(true));
  await userService
    .logout()
    .then(() => {
      resetAuthAsyncStorage();
      dispatch(resetToken());
      dispatch(resetUser());
      // dispatch(loggedOut());
    })
    .then(() => navigate('Initial Screen'))
    .catch(() => {
      // dispatch(errorLogOut('Error logging out.'));
    })
    .finally(() => {
      // dispatch(loggingOut(false));
    });
};
