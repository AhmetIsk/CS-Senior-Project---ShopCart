/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import { ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { styles } from '../MyListsScreen/styles';
import { colors } from '../../constants/styles';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';
import BestPriceProductContainer from '../../components/Containers/BestPriceProductContainer';

export default function BestPricesScreen({ route, navigation }) {
  const [items, setItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const { itemId, listName, priority } = route.params;
  const token = useSelector(userToken);
  const ListProducts = () => {
    console.log(itemId, listName, priority);
    userService.getShoppingList(itemId, token).then((products) => {
      console.log(products.length);
      if (products.length !== 0) {
        console.log(products);
        const mappedItems = products.map((product) => (
          <BestPriceProductContainer
            key={product.id}
            name={product.product.name}
            imageUrl={product.product.external_photo_url}
            bestPrice={product.product.store_set}
            minPrice={product.product.min_price}
          />
        ));
        let total = 0;
        products.map((product) => { total += product.product.min_price });
        console.log("this is total ", total);
        setTotalCost(total);

        setItems(mappedItems);
      }
    });
  };
  useEffect(() => {
    console.log(itemId, 'this is idnum i nsh');
    ListProducts();
  }, []);
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
        <Text style={styles.headerTitle}>Best Prices</Text>
        <Text style={{ width: 33 }} />
      </View>
      <ScrollView style={styles.scrollView}>
        {items}
        <View style={styles.priceContainer}>
          <Text style={styles.bestPrice}><Text style={{ color: 'black' }}>Approximate Cart Cost: </Text>{parseFloat(totalCost.toString()).toFixed(2)} TL</Text>
        </View>
      </ScrollView>
    </View>
  );
}
