/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { DataTable } from 'react-native-paper';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';
import { DecreaseProduct } from '../../components/Buttons';
import { colors } from '../../constants/styles';
import ProductButtons from '../../assets/productButtons.svg';

// TODO: bu ard arda api req yollamak sikintiliydi. onun cozumune bak; ek olarak trigger seri basmalarda ise yaramiyor cozumu budur belki; degilse shopliste tasi
export default function ProductRow({
  name,
  quantity,
  barcode,
  trigger,
  value,
  imageUrl,
  bestPrice,
}) {
  const token = useSelector(userToken);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={{ width: 84, height: 84, margin: 5 }} />
        <View style={styles.infoContainer}>
          <Text style={styles.textStyle}>{name}</Text>
          <Text style={styles.textStyle}>Quantity: {quantity}</Text>
          <Text>{bestPrice[0]?.name}</Text>
        </View>
      </View>

      <ProductButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    width: 327,
    height: 100,
    borderRadius: 4,
    backgroundColor: `${colors.white}`,
    shadowColor: `${colors.shadowColor}`,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 7,
    shadowOpacity: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    padding: 8,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 16,
    letterSpacing: -0.39,
    color: `${colors.textColor}`,
    paddingTop: 10,
  },
});
// <DataTable.Row>
//   <DataTable.Cell style={{ width: 300 }}>{name}</DataTable.Cell>
//   <DataTable.Cell centered numeric>
//     <DecreaseProduct
//       onPress={() => {
//         userService.addProduct(barcode, 1, token);
//         trigger(!value);
//       }}
//     >
//       <Image source={require('../../images/add.png')} style={{ width: 30, height: 30 }} />
//     </DecreaseProduct>
//   </DataTable.Cell>
//   <DataTable.Cell centered numeric>
//     {quantity}
//   </DataTable.Cell>
//   <DataTable.Cell centered numeric>
//     <DecreaseProduct
//       onPress={() => {
//         userService.removeFromList(barcode, 1, token);
//         trigger(!value);
//       }}
//     >
//       <Image source={require('../../images/buy.png')} style={{ width: 30, height: 30 }} />
//     </DecreaseProduct>
//   </DataTable.Cell>
//   <DataTable.Cell centered numeric>
//     <DecreaseProduct
//       onPress={() => {
//         userService.removeFromList(barcode, 1, token);
//         trigger(!value);
//       }}
//     >
//       <Image source={require('../../images/NN.jpg')} style={{ width: 30, height: 30 }} />
//     </DecreaseProduct>
//   </DataTable.Cell>
// </DataTable.Row>
