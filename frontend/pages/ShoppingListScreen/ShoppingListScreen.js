/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { DataTable } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';
import { styles } from './styles/index';
import ProductRow from './ProductRow';
import { MyShoppingList } from '../../components/Headers';
import { GoBack } from '../../components/Buttons';
import NOLists from '../../assets/noLists.svg';
import { colors } from '../../constants/styles';

const ShoppingListScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const token = useSelector(userToken);
  const [rerender, setRerender] = useState(false);
  const ListProducts = () => {
    userService.getShoppingList(token).then((products) => {
      console.log(products.length);
      const mappedItems = products.map((product) => (
        <ProductRow
          key={product.id}
          name={product.product.name}
          quantity={product.quantity}
          barcode={product.product.barcode}
          trigger={setRerender}
          value={rerender}
        />
      ));
      setItems(mappedItems);
    });
  };
  useEffect(() => {
    ListProducts();
  }, [rerender]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Entypo
          name="chevron-thin-left"
          size={26}
          color={colors.white}
          style={{ padding: 8 }}
          onPress={() => navigation.navigate('Feed')}
        />
        <Text style={styles.headerTitle}>My Lists</Text>
        <Text style={{ width: 33 }} />
      </View>
      <NOLists />
      <MyShoppingList>My Shopping List</MyShoppingList>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Product Name</DataTable.Title>
          <DataTable.Title>Add</DataTable.Title>
          <DataTable.Title numeric sortDirection="descending">
            Quantity
          </DataTable.Title>
          <DataTable.Title numeric>Buy</DataTable.Title>
          <DataTable.Title numeric>NN</DataTable.Title>
        </DataTable.Header>
        {items}
      </DataTable>
    </View>
  );
};
export default ShoppingListScreen;
