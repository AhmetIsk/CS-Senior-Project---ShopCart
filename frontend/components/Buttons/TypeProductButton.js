import { TouchableOpacity } from 'react-native';
import React from 'react';
import TypeButton from '../../assets/TypeProductButton.svg';

// eslint-disable-next-line react/prop-types
export default function TypeProductButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <TypeButton />
    </TouchableOpacity>
  );
}
