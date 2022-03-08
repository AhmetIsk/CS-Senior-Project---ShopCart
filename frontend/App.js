import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './pages/MainScreen/MainScreen';
import store from './store/reducers/index';
import { navigationRef } from './services/navRef';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <MainScreen />
      </NavigationContainer>
    </Provider>
  );
}
