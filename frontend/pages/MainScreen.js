import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import { getAuthAsyncStorage } from '../services/getAuthAsyncStorage';

const Stack = createNativeStackNavigator();

const MainScreen = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <Stack.Navigator>
      {auth.token === null ? (
        <>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        </>
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  )
}

export default MainScreen

