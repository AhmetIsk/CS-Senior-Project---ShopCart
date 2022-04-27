import { Text, View } from 'react-native';
import React from 'react';
import { commonStyles } from '../../commonStyles';

export default function StatisticsScreen() {
  return (
    <View style={commonStyles.container}>
      <View style={[commonStyles.header, { justifyContent: 'center' }]}>
        <Text style={commonStyles.headerTitle}>My Statistics</Text>
        <Text style={{ width: 33 }} />
      </View>
      <View style={commonStyles.centerItem}>
        <Text>This is the main part</Text>
      </View>
    </View>
  );
}
