/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { DataTable } from 'react-native-paper';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';
import { DecreaseProduct } from '../../components/Buttons';

// TODO: bu ard arda api req yollamak sikintiliydi. onun cozumune bak; ek olarak trigger seri basmalarda ise yaramiyor cozumu budur belki; degilse shopliste tasi
export default function ProductRow({ name, quantity, barcode, trigger, value }) {
  const token = useSelector(userToken);
  return (
    <DataTable.Row>
      <DataTable.Cell style={{ width: 300 }}>{name}</DataTable.Cell>
      <DataTable.Cell centered numeric>
        <DecreaseProduct
          onPress={() => {
            userService.addProduct(barcode, 1, token);
            trigger(!value);
          }}
        >
          <Image source={require('../../images/add.png')} style={{ width: 30, height: 30 }} />
        </DecreaseProduct>
      </DataTable.Cell>
      <DataTable.Cell centered numeric>
        {quantity}
      </DataTable.Cell>
      <DataTable.Cell centered numeric>
        <DecreaseProduct
          onPress={() => {
            userService.removeFromList(barcode, 1, token);
            trigger(!value);
          }}
        >
          <Image source={require('../../images/buy.png')} style={{ width: 30, height: 30 }} />
        </DecreaseProduct>
      </DataTable.Cell>
      <DataTable.Cell centered numeric>
        <DecreaseProduct
          onPress={() => {
            userService.removeFromList(barcode, 1, token);
            trigger(!value);
          }}
        >
          <Image source={require('../../images/NN.jpg')} style={{ width: 30, height: 30 }} />
        </DecreaseProduct>
      </DataTable.Cell>
    </DataTable.Row>
  );
}
