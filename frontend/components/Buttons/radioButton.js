/* eslint-disable react/prop-types */
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import LowPriority from '../../assets/LowPriority.svg';
import MediumPriority from '../../assets/MediumPriority.svg';
import HighPriority from '../../assets/HighPriority.svg';

export default function PriorityButton({ priority, onPress, selected }) {
  if (priority === 'low') {
    return (
      <TouchableOpacity onPress={onPress}>
        <LowPriority />
        <AntDesign
          name="check"
          size={24}
          color="white"
          style={
            selected === 'Low'
              ? { position: 'absolute', top: 43, left: 43, zIndex: 1 }
              : { display: 'none' }
          }
        />
      </TouchableOpacity>
    );
  }
  if (priority === 'medium') {
    return (
      <TouchableOpacity onPress={onPress}>
        <MediumPriority />
        <AntDesign
          name="check"
          size={24}
          color="white"
          style={
            selected === 'Medium'
              ? { position: 'absolute', top: 43, left: 43, zIndex: 1 }
              : { display: 'none' }
          }
        />
      </TouchableOpacity>
    );
  }
  if (priority === 'high') {
    return (
      <TouchableOpacity onPress={onPress}>
        <HighPriority />
        <AntDesign
          name="check"
          size={24}
          color="white"
          style={
            selected === 'High'
              ? { position: 'absolute', top: 43, left: 43, zIndex: 1 }
              : { display: 'none' }
          }
        />
      </TouchableOpacity>
    );
  }
}
