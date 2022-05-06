import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import { useSelector } from 'react-redux';
import { colors } from '../../constants/styles'
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';
import BestPriceProductContainer from '../../components/Containers/BestPriceProductContainer';

export default function SearchWithBarcode({ navigation }) {
    const token = useSelector(userToken);
    const [product, setProduct] = useState('');
    const [errorMsg, setErrorMsg] = useState();
    const [productBarcode, setProductBarcode] = useState('');
    const handleSubmit = () => {
        userService.searchBarcode(productBarcode, token).then((response) => {
            if (response === "error") {
                setErrorMsg(<Text style={{ color: 'red', fontSize: 15 }}>The product with the given barcode cannot be found!</Text>)
            }
            else {
                setProduct(response)
            }
        });
    };
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
                <Text style={styles.headerTitle}>Search Product with Barcode</Text>
                <Text style={{ width: 33 }} />
            </View>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Please enter the product barcode to find best price and online market:</Text>
                    <TextInput
                        placeholder="Eg. 903728372"
                        value={productBarcode}
                        onChangeText={(text) => setProductBarcode(text)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.registrationContainer}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={{
                            backgroundColor: productBarcode ? colors.orange : colors.inputBackground, width: '100%',
                            borderRadius: 12,
                            padding: 15
                        }}
                        disabled={!(productBarcode)}
                    >
                        <Text style={{ color: productBarcode ? colors.white : colors.disabledText }} >Search Product</Text>
                    </TouchableOpacity>
                </View>
                {product ?
                    <BestPriceProductContainer
                        key={product.name}
                        name={product.name}
                        imageUrl={product.photo_url}
                        bestPrice={product.store.price}
                        minPrice={product.store.price}
                        bestPlace={product.store.store_name}
                    /> :
                    errorMsg}
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 85,
        flexDirection: 'row',
        backgroundColor: `${colors.headerOrange}`,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    headerTitle: {
        fontSize: 21,
        fontStyle: 'italic',
        textAlign: 'center',
        color: `${colors.white}`,
        paddingBottom: 10,
    },
    buttonContainer: {
        paddingTop: 20,
    },
    addProduct: {
        color: `${colors.headerOrange}`,
        textAlign: 'center',
        fontSize: 21,
        paddingBottom: 40,
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 12,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: `${colors.borderColor}`,
        marginTop: 10,
    },
    inputLabel: {
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: '600',
        fontStyle: 'normal',
        color: '#374151',
    },
    registrationContainer: {
        margin: 30,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 5,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginBottom: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 25,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})