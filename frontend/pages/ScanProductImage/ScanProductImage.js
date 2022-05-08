import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import ApprovalScreen from '../BarcodeScanner/ApprovalScreen';
import { styles } from '../BarcodeScanner/styles';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';
import { shopListId } from '../../store/slices/shopListId';
import { commonStyles } from '../../commonStyles';
import { colors } from '../../constants/styles';

const ScanProductImage = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [barcodeId, setBarcodeId] = useState('');
    const token = useSelector(userToken);
    const id = useSelector(shopListId);
    console.log(id, 'this is initial id');
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
        console.log('this is id ', id, 'this is end');
        userService.addProduct(barcode, 1, id, token);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    if (scanned) {
        return <ApprovalScreen barcodeId={barcodeId} />;
    }

    return (
        <>
            <View style={styles.headerContainer}>
                <View style={commonStyles.header}>
                    <Entypo
                        name="chevron-thin-left"
                        size={26}
                        color={colors.white}
                        style={{ padding: 8 }}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={commonStyles.headerTitle}>Scan Product Image</Text>
                    <Text style={{ width: 33 }} />
                </View>
                <Text style={styles.text}>Show product label to the camera:</Text>
            </View>
            <>
                <View style={styles.container}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={styles.cameraFit}
                    />
                    {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}
                </View>
            </>
        </>
    );
};

export default ScanProductImage;
