import { TouchableOpacity } from 'react-native';
import React from 'react';
import VoiceButton from '../../assets/VoiceSearchButton.svg';

// eslint-disable-next-line react/prop-types
export default function VoiceSearchButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <VoiceButton />
    </TouchableOpacity>
  );
}
