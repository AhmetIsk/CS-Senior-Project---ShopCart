import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';
import { styles } from '../BarcodeScanner/styles';

export default function ShoppingListScreen() {
  const token = useSelector(userToken);
  const [items, setItems] = useState(null);
  userService.getShoppingList(token).then(products => setItems(products.data[0]["id"])).then(console.log("BAKIN BYRAI ITEMS", items));
  return (
    <View style={styles.container}>
      <Text>
        {items}

        burasi nobosfsds
        {items}
      </Text>
    </View>
  )
}
