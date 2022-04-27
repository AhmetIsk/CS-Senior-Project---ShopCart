import { Text, View } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { colors } from '../../constants/styles';
import { styles } from './styles';
import ScanProductButton from '../../components/Buttons/ScanProductButton';
import ScanBarcodeButton from '../../components/Buttons/ScanBarcodeButton';
import VoiceSearchButton from '../../components/Buttons/VoiceSearchButton';
import TypeProductButton from '../../components/Buttons/TypeProductButton';
import { userService } from '../../services/userService';
import { shopListId } from '../../store/slices/shopListId';
import { userToken } from '../../store/slices/token';

export default function AddNewProductScreen({ navigation }) {
  const token = useSelector(userToken);
  const id = useSelector(shopListId);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Entypo
          name="chevron-thin-left"
          size={26}
          color={colors.white}
          style={{ padding: 8 }}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Add New Product</Text>
        <Text style={{ width: 33 }} />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.addProduct}>Select the way to add product:</Text>
        <ScanProductButton onPress={() => console.log('you clicked me ')} />
        <ScanBarcodeButton onPress={() => navigation.navigate('Add Product via Barcode')} />
        <VoiceSearchButton
          onPress={() => {
            userService.addProduct('8697404970026', 1, id, token);
          }}
        />
        <TypeProductButton onPress={() => console.log('you clicked me ')} />
      </View>
    </View>
  );
}
