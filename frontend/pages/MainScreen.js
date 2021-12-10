import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { useDispatch } from "react-redux";
import { StyleSheet } from 'react-native'
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
          {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : state.userToken == null ? (
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            ) : (
              // User is signed in
              <Stack.Screen name="Home" component={HomeScreen} />
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default MainScreen

const styles = StyleSheet.create({})
