import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './store/reducers/rootReducer'
import MainScreen from './pages/MainScreen';
import 'localstorage-polyfill';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default function App() {
  return (
    <Provider store={ store }>
      <MainScreen />
    </Provider>
  );
}

