import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import BarcodeScanner from '../BarcodeScanner/BarcodeScanner';
import { userToken } from '../../store/slices/token';
import ApprovalScreen from '../BarcodeScanner/ApprovalScreen';
import InitialScreen from '../InitialScreen/InitialScreen';
import ShopCartBottomTabs from '../TabNavigator/TabNavigator';
import EditProfile from '../EditScreens/EditProfile';
import TypeProductBarcode from '../TypeProductBarcode/TypeProductBarcode';
import AddProductWithVoice from '../VoiceDetector/AddProductWithVoice';

const Stack = createNativeStackNavigator();

const MainScreen = () => {
  const isSignedIn = useSelector(userToken);
  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Tab Navigator"
            component={ShopCartBottomTabs}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Add Product via Barcode"
            component={BarcodeScanner}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Type Product Name"
            component={TypeProductBarcode}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Add Product with Voice"
            component={AddProductWithVoice}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Approval"
            component={ApprovalScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Edit Profile"
            component={EditProfile}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Initial Screen"
            component={InitialScreen}
          />
          <Stack.Screen options={{ headerShown: false }} name="Sign Up" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainScreen;
