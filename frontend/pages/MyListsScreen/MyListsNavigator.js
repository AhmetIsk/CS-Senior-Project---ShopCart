/* eslint-disable react-hooks/exhaustive-deps */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userToken } from '../../store/slices/token';
import { userService } from '../../services/userService';
import EmptyListsScreen from './EmptyListsScreen';
import MyListsScreen from './MyListsScreen';
import AddShoppingListScreen from './AddShoppingListScreen';
import ShoppingListScreen from '../ShoppingListScreen/ShoppingListScreen';
import AddNewProductScreen from '../AddProductScreen/AddNewProductScreen';
import BestPricesScreen from '../BestPricesScreen/BestPricesScreen';

const Stack = createNativeStackNavigator();

const MyListsNavigator = () => {
  const token = useSelector(userToken);
  const [isEmpty, setIsEmpty] = useState(true);
  const ListProducts = () => {
    userService.getUsersShoppingCartLists(token).then((products) => {
      if (products.length > 0) setIsEmpty(false);
    });
  };
  useEffect(() => {
    ListProducts();
  }, []);
  // console.log('This is user info', userInfo.first_name);
  return (
    <Stack.Navigator>
      {isEmpty ? (
        <Stack.Screen
          options={{ headerShown: false }}
          name="Empty Lists"
          component={EmptyListsScreen}
        />
      ) : (
        <Stack.Screen options={{ headerShown: false }} name="My Lists" component={MyListsScreen} />
      )}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Add a Shopping List"
        component={AddShoppingListScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Shopping List"
        component={ShoppingListScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Add New Product"
        component={AddNewProductScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Best Prices"
        component={BestPricesScreen}
      />
    </Stack.Navigator>
  );
};

export default MyListsNavigator;
