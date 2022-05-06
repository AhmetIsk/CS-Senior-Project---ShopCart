import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import { useSelector } from 'react-redux';
import { colors } from '../../constants/styles'
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';
import { shopListId } from '../../store/slices/shopListId';

export default function TypeProductBarcode({ navigation }) {
    const token = useSelector(userToken);
    const id = useSelector(shopListId);
    const [productName, setProductName] = useState('');
    const handleSubmit = () => {
        userService.addManuelProduct(productName, 1, id, token).then(() => navigation.navigate('My Lists'));
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
                <Text style={styles.headerTitle}>Type Product Name</Text>
                <Text style={{ width: 33 }} />
            </View>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Please enter the product name that you want to add:</Text>
                    <TextInput
                        placeholder="Eg. Cucumber"
                        value={productName}
                        onChangeText={(text) => setProductName(text)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.registrationContainer}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={{
                            backgroundColor: productName ? colors.orange : colors.inputBackground, width: '100%',
                            borderRadius: 12,
                            padding: 15
                        }}
                        disabled={!(productName)}
                    >
                        <Text style={{ color: productName ? colors.white : colors.disabledText }} >Add Product</Text>
                    </TouchableOpacity>
                </View>
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