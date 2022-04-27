import { TouchableOpacity } from 'react-native';
import React from 'react';
import AddProduct from '../../assets/addProduct.svg';

// eslint-disable-next-line react/prop-types
export default function AddProductButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AddProduct />
    </TouchableOpacity>
  );
}
