import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import MainScreen from './pages/MainScreen';
import { NavigationContainer } from '@react-navigation/native';

// buralar duzenlencek
import {loggedIn} from "./store/actions/auth";
import {getAuthAsyncStorage} from "./services/getAuthAsyncStorage";
import store from './store/reducers';
import { navigationRef } from './services/navRef';

export default function App() {
  const [isLoading, setIsLoadingFromAsyncStorage] = useState(true);

  useEffect(()=> {
    const load = async () => {
      await setIsLoadingFromAsyncStorage(true);
      const userStorage = await getAuthAsyncStorage();
      if (userStorage.user && userStorage.token) {
        await store.dispatch(loggedIn({
          user: userStorage.user,
          token: userStorage.token,
        }));
      }
      await setIsLoadingFromAsyncStorage(false);
    }
    load();
  }, []);

  if (isLoading) {
    return null;
  }
  return (
    <Provider store={ store }>
      <NavigationContainer ref={navigationRef}>
        <MainScreen />
      </NavigationContainer>
    </Provider>
  );
}

