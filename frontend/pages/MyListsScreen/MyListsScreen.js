/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { userService } from '../../services/userService';
import NOLists from '../../assets/noLists.svg';
import { userToken } from '../../store/slices/token';
import { colors } from '../../constants/styles';
import { styles } from './styles/index';
import ShoppingListContainer from '../../components/Containers/ShoppingListContainer';
import AddShopListButton from '../../components/Buttons/AddShopListButton';
import { resetId } from '../../store/slices/shopListId';

const MyListsScreen = ({ navigation }) => {
  const token = useSelector(userToken);
  const isFocused = useIsFocused();
  const [shopLists, setShopLists] = useState([]);
  const dispatch = useDispatch();
  const [rerender, setRerender] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  dispatch(resetId);
  const ListShopLists = () => {
    userService.getUsersShoppingCartLists(token).then((products) => {
      if (products.length === 0) {
        setShopLists(
          <>
            <NOLists style={{ marginTop: 220 }} />
            <Text style={styles.emptyListHeader}>No Items in the Cart</Text>
            <Text style={styles.emptyListText}>Create list and add products to the list.</Text>
            <TouchableOpacity
              style={styles.addListButton}
              onPress={() => navigation.navigate('Add a Shopping List')}
            >
              <Text style={styles.addListLabel}>Add List</Text>
            </TouchableOpacity>
          </>
        );
        setIsEmpty(true);
      }
      else {
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
            rerender={rerender}
            setRerender={setRerender}
          />
        ));
        setShopLists(mappedItems);
        setIsEmpty(false);
      }
      setIsLoading(false);
    });
  };
  useEffect(() => {
    setIsLoading(true);
    ListShopLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, rerender]);
  console.log('this page shows shopping lists', isLoading);
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
      {isLoading ? (
        <ActivityIndicator
          // visibility of Overlay Loading Spinner
          visible={isLoading}
          size="large" color={colors.orange}
        />) : (
        <>
          {
            isEmpty ?
              shopLists :
              <ScrollView style={styles.scrollView}>{shopLists}</ScrollView>
          }
          < AddShopListButton onPress={() => navigation.navigate('Add a Shopping List')} />
        </>
      )}
    </View>
  );
};
export default MyListsScreen;
