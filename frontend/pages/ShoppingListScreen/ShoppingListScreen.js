import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';
import { styles } from '../BarcodeScanner/styles';

export default function ShoppingListScreen() {
  const token = useSelector(userToken);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  userService.getShoppingList(token).then(products => {
    console.log(products.length)
    for(let i = 0; i < products.length; i++) {
      setItemName(products[i].product.name);
      setItemQuantity(products[i].quantity);
    }
    // forEach(product => {
    //   setItemName(...itemName, product[0].product.name);
    //   setItemQuantity(...itemQuantity, product[0].quantity);
    // });
  });
  return (
    <View style={styles.container}>
      <Text>
        {itemName}
      </Text>
      <Text>
        {itemQuantity}
      </Text>
    </View>
  )
}
