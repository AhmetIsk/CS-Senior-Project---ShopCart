/* eslint-disable react/prop-types */
import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import HighBackground from '../../assets/HighPriBackground.svg';
import MediumBackground from '../../assets/MediumPriBackground.svg';
import LowBackground from '../../assets/LowPriBackground.svg';
import { colors } from '../../constants/styles';

export default function ShopListHeader({ priority, listName, navigation }) {
  if (priority === 'Low') {
    return (
      <>
        <Entypo
          name="chevron-thin-left"
          size={26}
          color={colors.white}
          style={{ position: 'absolute', top: 50, left: 10, zIndex: 1 }}
          onPress={() => navigation.goBack()}
        />
        <LowBackground />
        <Text style={styles.listName}>{listName}</Text>
      </>
    );
  }
  if (priority === 'Medium') {
    return (
      <>
        <Entypo
          name="chevron-thin-left"
          size={26}
          color={colors.white}
          style={{ position: 'absolute', top: 50, left: 10, zIndex: 1 }}
          onPress={() => navigation.goBack()}
        />
        <MediumBackground />
        <Text style={styles.listName}>{listName}</Text>
      </>
    );
  }
  if (priority === 'High') {
    return (
      <>
        <Entypo
          name="chevron-thin-left"
          size={26}
          color={colors.white}
          style={{ position: 'absolute', top: 50, left: 10, zIndex: 1 }}
          onPress={() => navigation.goBack()}
        />
        <HighBackground />
        <Text style={styles.listName}>{listName}</Text>
      </>
    );
  }
}

const styles = StyleSheet.create({
  listName: {
    position: 'absolute',
    top: 150,
    left: 50,
    zIndex: 1,
    fontSize: 30,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 41,
    letterSpacing: 0.36,
    color: `${colors.white}`,
  },
});
