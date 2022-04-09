/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import { Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { styles } from './styles/index';
import { colors } from '../../constants/styles';

const EmptyShoppingListScreen = ({ navigation }) => (
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
  </View>
);
export default EmptyShoppingListScreen;
