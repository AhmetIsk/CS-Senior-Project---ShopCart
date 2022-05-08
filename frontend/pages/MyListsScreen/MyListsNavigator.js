/* eslint-disable react-hooks/exhaustive-deps */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MyListsScreen from './MyListsScreen';
import AddShoppingListScreen from './AddShoppingListScreen';
import ShoppingListScreen from '../ShoppingListScreen/ShoppingListScreen';
import AddNewProductScreen from '../AddProductScreen/AddNewProductScreen';
import BestPricesScreen from '../BestPricesScreen/BestPricesScreen';

const Stack = createNativeStackNavigator();

const MyListsNavigator = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="My Lists" component={MyListsScreen} />
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
    {/* <Stack.Screen
            options={{ headerShown: false }}
            name="Empty List"
            component={EmptyListsScreen}
          /> */}
  </Stack.Navigator >
);

export default MyListsNavigator;
