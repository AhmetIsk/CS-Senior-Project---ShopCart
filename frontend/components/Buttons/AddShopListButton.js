/* eslint-disable react/prop-types */
import { TouchableOpacity } from 'react-native';
import React from 'react';
import AddShopList from '../../assets/addShopList.svg';

export default function AddShopListButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AddShopList />
    </TouchableOpacity>
  );
}
