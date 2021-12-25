/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';
import { styles } from '../BarcodeScanner/styles';

const ShoppingListScreen = () => {
  const [items, setItems] = useState([]);
  const token = useSelector(userToken);
  const ListProducts = () => {
    userService.getShoppingList(token).then(products => {
      console.log(products.length)
      const mappedItems = products.map(product => {
        return <Text key={product.id} >Name: {product.product.name} Quantity: {product.quantity}</Text>
      });
      setItems(mappedItems);
    });
  }
  useEffect(() => {
    ListProducts();
  }, [])
  return (
    <View style={styles.container}>
        {items}
    </View>
  )
}
export default ShoppingListScreen;