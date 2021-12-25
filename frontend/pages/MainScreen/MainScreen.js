import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import LoginScreen from '../LoginScreen/LoginScreen';
import HomeScreen from '../HomeScreen/HomeScreen';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import BarcodeScanner from '../BarcodeScanner/BarcodeScanner';
import ShoppingListScreen from '../ShoppingListScreen/ShoppingListScreen';
import { useSelector } from 'react-redux';
import { userToken } from '../../store/slices/token';
import ApprovalScreen from '../BarcodeScanner/ApprovalScreen';

const Stack = createNativeStackNavigator();

const MainScreen = () => {
  const isSignedIn = useSelector(userToken);
  console.log('this is issigned in', isSignedIn)
  return (
    <Stack.Navigator>
      {
        isSignedIn ? (
          <>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Add Product via Barcode" component={BarcodeScanner} />
            <Stack.Screen options={{ headerShown: false }} name="Shopping List" component={ShoppingListScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Approval" component={ApprovalScreen} />
          </>
        ) : (
          <>
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Sign Up" component={SignUpScreen} />
          </>
        )
      }
    </Stack.Navigator>
  )
}

export default MainScreen

