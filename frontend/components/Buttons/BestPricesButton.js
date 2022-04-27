import { TouchableOpacity } from 'react-native';
import React from 'react';
import BestPrices from '../../assets/BestPrices.svg';

// eslint-disable-next-line react/prop-types
export default function BestPricesButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <BestPrices />
    </TouchableOpacity>
  );
}
