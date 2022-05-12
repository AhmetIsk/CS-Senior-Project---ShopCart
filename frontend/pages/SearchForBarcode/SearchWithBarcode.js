import { ActivityIndicator, Alert, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons'
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
    const [shopLists, setShopLists] = useState([]);
    // const [userId, setUserId] = useState(null);
    const [selectedShopList, setSelectedShopList] = useState('');
    // useEffect(() => {
    //     userService.getUserData(token).then((res) => setUserId(res.user.id))
    // }, []);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = () => {
        setLoading(true);
        userService.searchBarcode(productBarcode, token).then((response) => {
            setLoading(false);
            if (response === "error") {
                setErrorMsg(<Text style={{ color: 'red', fontSize: 15 }}>The product with the given barcode cannot be found!</Text>)
            }
            else {
                setProduct(response);
                userService.getUsersShoppingCartLists(token).then((products) => {
                    if (products.length === 0) {
                        setShopLists(
                            <Text style={{ color: 'red', fontSize: 15 }}>
                                Please create a shopping list first!
                            </Text>
                        );
                    }
                    else {
                        products.map((list) => (
                            setShopLists((prev => [...prev, { "shopListId": list.id, "ShopListName": list.name }]))
                        ));
                    }
                })
            }
        });
    };
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <AntDesign name="closecircle" size={30} color={`${colors.orange}`} />
                        </TouchableOpacity>
                        <Text style={styles.changeNameHeader}>Select the shop lists you want to add:</Text>
                        <View style={styles.comContainer}>
                            <ScrollView horizontal>
                                {shopLists.map((item) =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (selectedShopList === { "id": item.shopListId })
                                                setSelectedShopList('')
                                            else
                                                setSelectedShopList({ "id": item.shopListId });
                                        }}
                                        style={[styles.comButton, selectedShopList.id === item.shopListId ? { backgroundColor: `${colors.buttonOrange}`, } : { backgroundColor: `${colors.gray}`, }]} key={item.ShopListName}
                                    >
                                        <Text id={item.id} style={{ color: 'white' }}>{item.ShopListName}</Text>
                                    </TouchableOpacity>
                                )}
                            </ScrollView>
                        </View>
                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={() => userService
                                .addProduct(productBarcode, 1, selectedShopList.id, token)}
                        >
                            <Text style={styles.textStyle}>Add to Shop List</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
                {loading ? (
                    <ActivityIndicator
                        //visibility of Overlay Loading Spinner
                        visible={loading}
                        size="large" color={colors.orange}
                    />
                ) : (
                    <>
                        {product ?
                            <>
                                <BestPriceProductContainer
                                    key={product.name}
                                    name={product.name}
                                    imageUrl={product.photo_url}
                                    bestPrice={product.store.price}
                                    minPrice={product.store.price}
                                    bestPlace={product.store.store_name}
                                    shopURL={product.product_url}
                                />
                                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: 'orange', padding: 15, borderRadius: 10, justifyContent: 'center', margin: 5 }}><Text style={{ color: 'white' }}>Add to Shop List</Text></TouchableOpacity>
                            </> :
                            errorMsg}
                    </>
                )}
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
    listName: {
        fontSize: 30,
        fontWeight: '600',
        fontStyle: 'normal',
        lineHeight: 41,
        letterSpacing: 0.36,
        color: `${colors.white}`,
    },
    textContainer: {
        position: 'absolute',
        top: 150,
        left: 50,
        zIndex: 1,
        width: 300,
    },
    inlineTextContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonClose: {
        width: 200,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        backgroundColor: `${colors.orange}`,
        margin: 20,
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    changeNameHeader: {
        fontSize: 20,
        paddingBottom: 20,
        color: `${colors.orange}`,
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    comButton: {
        padding: 8,
        borderRadius: 8,
        marginRight: 5,
    },
    comContainer: {
        display: 'flex',
        flexDirection: 'row',
    }
})