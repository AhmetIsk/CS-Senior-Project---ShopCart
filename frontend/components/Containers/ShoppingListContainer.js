/* eslint-disable react/prop-types */
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import LowPriShopList from '../../assets/LowPriShopList.svg';
import MediumPriShopList from '../../assets/MediumPriShopList.svg';
import HighPriShopList from '../../assets/HighPriShopList.svg';
import { colors } from '../../constants/styles';

export default function ShoppingListContainer({
  id,
  priority,
  communities,
  name,
  navigation,
  totalItems,
}) {
  const communityNames = communities.length === 0 ? 'Personal List' : communities.join(',');
  console.log('these are total items', totalItems);
  if (priority === 'Low') {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Shopping List', {
            itemId: id,
            listName: name,
            priority,
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
    );
  }
  if (priority === 'Medium') {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Shopping List', {
            itemId: id,
            listName: name,
            priority,
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
    );
  }
  if (priority === 'High') {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Shopping List', {
            itemId: id,
            listName: name,
            priority,
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
