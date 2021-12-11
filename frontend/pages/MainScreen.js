import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import { getAuthAsyncStorage } from '../services/getAuthAsyncStorage';
import SignUpScreen from './SignUpScreen';

const Stack = createNativeStackNavigator();

const MainScreen = () => {
  // const [isLoading, setIsLoadingFromAsyncStorage] = useState(true);

  // useEffect(()=> {
  //   const load = async () => {
  //     setIsLoadingFromAsyncStorage(true);
  //     const userStorage = await getAuthAsyncStorage();
  //     if (userStorage.user && userStorage.token) {
  //       setIsLoadingFromAsyncStorage(false);
  //     }
  //   }
  //   load();
  // }, []);
  // console.log('bu da isloading', isLoading)
  return (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default MainScreen

