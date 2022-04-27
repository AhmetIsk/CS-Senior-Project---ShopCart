/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';
import { colors } from '../../constants/styles';
import { styles } from './styles/index';
import ShoppingListContainer from '../../components/Containers/ShoppingListContainer';
import AddShopListButton from '../../components/Buttons/AddShopListButton';
import { resetId } from '../../store/slices/shopListId';

const MyListsScreen = ({ navigation }) => {
  const token = useSelector(userToken);
  const [shopLists, setShopLists] = useState([]);
  const dispatch = useDispatch();
  dispatch(resetId);
  const ListShopLists = () => {
    userService.getUsersShoppingCartLists(token).then((products) => {
      const mappedItems = products.map((product) => (
        <ShoppingListContainer
          key={product.id}
          id={product.id}
          priority={product.priority}
          name={product.name}
          communities={product.communities}
          navigation={navigation}
          totalItems={product.products
            .map((object) => object.quantity)
            .reduce((prev, curr) => prev + curr, 0)}
        />
      ));
      setShopLists(mappedItems);
    });
  };
  useEffect(() => {
    ListShopLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('this page shows shopping lists');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Entypo
          name="chevron-thin-left"
          size={26}
          color={colors.white}
          style={{ padding: 8 }}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>My Lists</Text>
        <Text style={{ width: 33 }} />
      </View>
      <ScrollView style={styles.scrollView}>{shopLists}</ScrollView>
      <AddShopListButton onPress={() => navigation.navigate('Add a Shopping List')} />
    </View>
  );
};
export default MyListsScreen;
