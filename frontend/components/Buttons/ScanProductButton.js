import { TouchableOpacity } from 'react-native';
import React from 'react';
import ScanButton from '../../assets/ScanProductButton.svg';
// eslint-disable-next-line react/prop-types
export default function ScanProductButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ScanButton />
    </TouchableOpacity>
  );
}
