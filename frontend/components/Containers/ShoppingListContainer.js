/* eslint-disable react/prop-types */
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import LowPriShopList from '../../assets/LowPriShopList.svg';
import MediumPriShopList from '../../assets/MediumPriShopList.svg';
import HighPriShopList from '../../assets/HighPriShopList.svg';
import { colors } from '../../constants/styles';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';

export default function ShoppingListContainer({
  id,
  priority,
  communities,
  name,
  navigation,
  totalItems,
}) {
  const token = useSelector(userToken);

  const rightSwipeActions = () => (
    <TouchableOpacity
      style={{
        backgroundColor: `${colors.headerRed}`,
        justifyContent: 'center',
        alignItems: 'flex-end',
        right: -40,
        height: 140,
        alignSelf: 'center',
        borderRadius: 12,
        top: 13,
        left: 28,
      }}
      onPress={() => userService.deleteShoplist(id, token)}
    >
      <Text
        style={{
          color: `${colors.white}`,
          paddingHorizontal: 10,
          fontWeight: '600',
          paddingVertical: 20,
        }}
      >
        Delete
      </Text>
    </TouchableOpacity>
  );


  const communityNames = communities.length === 0 ? 'Personal List' : communities.map(comm => comm.name).join(',');
  console.log('these are total items', communities.map(comm => comm.name));
  if (priority === 'Low') {
    return (
      <Swipeable
        renderRightActions={rightSwipeActions}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Shopping List', {
              itemId: id,
              listName: name,
              priority,
              communities
            });
          }}
        >
          <LowPriShopList />
          <View style={styles.contentContainer}>
            <Text style={styles.items}>{totalItems} Items</Text>
            <Text style={styles.listName}>{name}</Text>
            <View style={styles.community}>
              <Ionicons name="people" size={24} color="white" />
              <Text style={styles.communityName}>{communityNames}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  }
  if (priority === 'Medium') {
    return (
      <Swipeable
        renderRightActions={rightSwipeActions}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Shopping List', {
              itemId: id,
              listName: name,
              priority,
              communities
            });
          }}
        >
          <MediumPriShopList />
          <View style={styles.contentContainer}>
            <Text style={styles.items}>{totalItems} Items</Text>
            <Text style={styles.listName}>{name}</Text>
            <View style={styles.community}>
              <Ionicons name="people" size={24} color="white" />
              <Text style={styles.communityName}>{communityNames}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  }
  if (priority === 'High') {
    return (
      <Swipeable
        renderRightActions={rightSwipeActions}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Shopping List', {
              itemId: id,
              listName: name,
              priority,
              communities
            });
          }}
        >
          <HighPriShopList />
          <View style={styles.contentContainer}>
            <Text style={styles.items}>{totalItems} Items</Text>
            <Text style={styles.listName}>{name}</Text>
            <View style={styles.community}>
              <Ionicons name="people" size={24} color="white" />
              <Text style={styles.communityName}>{communityNames}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    position: 'absolute',
    top: 73,
    left: 43,
    zIndex: 1,
  },
  items: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: -0.39,
    color: `${colors.white}`,
  },
  listName: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: 'normal',
    fontStyle: 'italic',
    letterSpacing: -0.58,
    color: `${colors.white}`,
  },
  community: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  communityName: {
    paddingLeft: 8,
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: -0.39,
    color: `${colors.white}`,
  },
});
