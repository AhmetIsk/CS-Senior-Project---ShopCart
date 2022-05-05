/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';
import { styles } from './styles/index';
import ProductRow from './ProductRow';
import ListIsEmptyImage from '../../assets/listIsEmpty.svg';
import ShopListHeader from '../../components/Headers/ShopListHeader';
import { setId, shopListId } from '../../store/slices/shopListId';
import AddProductButton from '../../components/Buttons/AddProductButton';
import BestPricesButton from '../../components/Buttons/BestPricesButton';
import Tags from '../MyListsScreen/Tags';
import { colors } from '../../constants/styles';

const ShoppingListScreen = ({ route, navigation }) => {
  const [items, setItems] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const { itemId, listName, priority } = route.params;
  const [communities, setCommunities] = useState([]);
  // console.log(communities, 'this is idnum');
  const dispatch = useDispatch();
  dispatch(setId(itemId));
  const token = useSelector(userToken);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState(listName);
  const [comName, setComName] = useState([]);
  const id = useSelector(shopListId);
  const [rerender, setRerender] = useState(false);
  const ListShopLists = () => {
    userService.getShoppingListCommunities(id, token).then((products) => {
      const comms = [];
      console.log("look at here ", products.communities);
      products.communities.map((product) => {
        console.log("look at here ", product);
        comms.push(product);
      });
      console.log("this is comms ", comms);
      setCommunities(comms);
      console.log("this is communities ", communities);
    })
  };
  const getCommunities = () => {
    const commIds = [];
    userService.getCommunityMembership(token).then((community) => {
      community.map((item) => {
        commIds.push({ "id": item.id, "name": item.name });
      });
      // console.log("these are ", community);
    });
    userService.getCommunityOwner(token).then((community) => {
      community.map((item) => {
        commIds.push({ "id": item.id, "name": item.name });
      });
      // console.log("these are communities", community);
    });
    setComName(commIds);
  }
  const ListProducts = () => {
    userService.getShoppingList(itemId, token).then((products) => {
      console.log(products.length);
      if (products.length !== 0) {
        // console.log(products);
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
    ListProducts();
    getCommunities();
    ListShopLists();
  }, [rerender]);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <AntDesign name="closecircle" size={30} color={`${colors.orange}`} />
            </TouchableOpacity>
            <Text style={styles.changeNameHeader}>Select the community you want to share:</Text>
            <View style={styles.comContainer}>
              <ScrollView horizontal>
                {comName.map((item) =>
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedCommunity === { "community_id": item.id })
                        setSelectedCommunity('')
                      else
                        setSelectedCommunity({ "community_id": item.id });
                    }}
                    style={[styles.comButton, selectedCommunity.community_id === item.id ? { backgroundColor: `${colors.buttonOrange}`, } : { backgroundColor: `${colors.gray}`, }]} key={item.name}
                  >
                    <Text id={item.id} style={{ color: 'white' }}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            </View>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => userService
                .addShoppingListToCommunity(selectedCommunity.community_id, id, token)
                .then(() => ListShopLists()).then(() => setModalVisible(!modalVisible))}
            >
              <Text style={styles.textStyle}>Add Community</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ShopListHeader priority={priority} listName={listName} navigation={navigation} />
      {items.length === 0 ? (
        <View style={styles.contentContainer}>
          <View style={styles.communityContainer}>
            <ScrollView horizontal>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: 'orange', padding: 5, borderRadius: 10, justifyContent: 'center', margin: 5 }}><Text style={{ color: 'white' }}>Add Community</Text></TouchableOpacity>
              {communities && communities.map(community => <Tags key={community.name} name={community.name} onPress={() => {
                userService.removeShoppingListFromCommunity(community.id, id, token).then(() => ListShopLists());
              }} />)}
            </ScrollView>
          </View>
          <View>
            <ListIsEmptyImage />
          </View>
          <TouchableOpacity
            style={styles.addProduct}
            onPress={() => navigation.navigate('Add New Product')}
          >
            <Text style={styles.addProductLabel}>Add Product</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.communityContainer}>
            <ScrollView horizontal>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: 'orange', padding: 5, borderRadius: 10, justifyContent: 'center', margin: 5 }}><Text style={{ color: 'white' }}>Add Community</Text></TouchableOpacity>
              {communities && communities.map(community => <Tags key={community.name} name={community.name} onPress={() => {
                userService.removeShoppingListFromCommunity(community.id, id, token).then(() => ListShopLists());
              }} />)}
            </ScrollView>
          </View>
          <ScrollView style={styles.itemsContainer}>{items}</ScrollView>
          <View style={styles.buttonContainer}>
            <AddProductButton onPress={() => navigation.navigate('Add New Product')} />
            <BestPricesButton onPress={() => navigation.navigate('Best Prices', {
              itemId,
              listName,
              priority,
            })} />
          </View>
        </View>
      )}
    </View>
  );
};
export default ShoppingListScreen;
