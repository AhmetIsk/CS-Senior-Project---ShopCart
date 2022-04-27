import { TouchableOpacity } from 'react-native';
import React from 'react';
import ScanBarcode from '../../assets/ScanBarcodeButton.svg';

// eslint-disable-next-line react/prop-types
export default function ScanBarcodeButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ScanBarcode />
    </TouchableOpacity>
  );
}
