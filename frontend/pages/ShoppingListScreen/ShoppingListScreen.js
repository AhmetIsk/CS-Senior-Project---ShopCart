/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';
import { styles } from './styles/index';
import ProductRow from './ProductRow';
import { MyShoppingList } from '../../components/Headers';
import ListIsEmptyImage from '../../assets/listIsEmpty.svg';
import ShopListHeader from '../../components/Headers/ShopListHeader';
import { setId } from '../../store/slices/shopListId';
import { colors } from '../../constants/styles';
import AddProductButton from '../../components/Buttons/AddProductButton';
import BestPricesButton from '../../components/Buttons/BestPricesButton';

const ShoppingListScreen = ({ route, navigation }) => {
  const [items, setItems] = useState([]);
  const { itemId, listName, priority } = route.params;
  console.log(itemId, 'this is idnum');
  const dispatch = useDispatch();
  dispatch(setId(itemId));
  const token = useSelector(userToken);
  const [rerender, setRerender] = useState(false);
  const ListProducts = () => {
    userService.getShoppingList(itemId, token).then((products) => {
      console.log(products.length);
      if (products.length !== 0) {
        console.log(products);
        const mappedItems = products.map((product) => (
          <ProductRow
            key={product.id}
            name={product.product.name}
            quantity={product.quantity}
            barcode={product.product.barcode}
            trigger={setRerender}
            value={rerender}
            imageUrl={product.product.external_photo_url}
            bestPrice={product.product.store_set}
          />
        ));
        setItems(mappedItems);
      }
    });
  };
  useEffect(() => {
    console.log(itemId, 'this is idnum i nsh');
    ListProducts();
  }, [rerender]);
  return (
    <View style={styles.container}>
      <ShopListHeader priority={priority} listName={listName} navigation={navigation} />
      {items.length === 0 ? (
        <View style={styles.contentContainer}>
          <ListIsEmptyImage />
          <TouchableOpacity
            style={styles.addProduct}
            onPress={() => navigation.navigate('Add New Product')}
          >
            <Text style={styles.addProductLabel}>Add Product</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <ScrollView style={styles.itemsContainer}>{items}</ScrollView>
          <View style={styles.buttonContainer}>
            <AddProductButton onPress={() => navigation.navigate('Add New Product')} />
            <BestPricesButton onPress={() => navigation.navigate('Best Prices')} />
          </View>
        </View>
      )}
      {/* <MyShoppingList>My Shopping List</MyShoppingList>
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
      </DataTable> */}
    </View>
  );
};
export default ShoppingListScreen;
