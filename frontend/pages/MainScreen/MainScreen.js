import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
// import { useSelector } from "react-redux";
import LoginScreen from '../LoginScreen/LoginScreen';
import HomeScreen from '../HomeScreen/HomeScreen';
// import { getAuthAsyncStorage } from '../../services/getAuthAsyncStorage';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import BarcodeScanner from '../BarcodeScanner/BarcodeScanner';
import ShoppingListScreen from '../ShoppingListScreen/ShoppingListScreen';

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
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Add Product via Barcode" component={BarcodeScanner} />
        <Stack.Screen options={{ headerShown: false }} name="Shopping List" component={ShoppingListScreen} />
    </Stack.Navigator>
  )
}

export default MainScreen

