/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import { Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles/index';
import NOLists from '../../assets/noLists.svg';
import { colors } from '../../constants/styles';

const EmptyListsScreen = ({ navigation }) => (
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
    <NOLists style={{ marginTop: 250 }} />
    <Text style={styles.emptyListHeader}>No Items in the Cart</Text>
    <Text style={styles.emptyListText}>Create list and add products to the list.</Text>
    <TouchableOpacity
      style={styles.addListButton}
      onPress={() => navigation.navigate('Add a Shopping List')}
    >
      <Text style={styles.addListLabel}>Add List</Text>
    </TouchableOpacity>
  </View>
);
export default EmptyListsScreen;
