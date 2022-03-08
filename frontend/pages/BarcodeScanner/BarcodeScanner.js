import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useSelector } from 'react-redux';
import ApprovalScreen from './ApprovalScreen';
import { styles } from './styles';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';

const BarcodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeId, setBarcodeId] = useState('');
  const token = useSelector(userToken);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setBarcodeId(data);
    const barcode = `${data}`;
    userService.addProduct(barcode, 1, token);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (scanned) {
    return <ApprovalScreen barcodeId={barcodeId}/>;
  }
  
    return (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.barcodeNotifier}>Scan Barcode to Camera</Text>
            <Button onPress={() => setScanned(true)} title='Click me'/>
          </View>
          <View style={styles.container}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.cameraFit}
              />
            {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}
          </View>
        </>
    );
  
}

export default BarcodeScanner;

