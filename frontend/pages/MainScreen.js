import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View } from 'react-native'
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import { loadUser } from '../store/actions/authActions';

const Stack = createNativeStackNavigator();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
const MainScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default MainScreen

const styles = StyleSheet.create({})
