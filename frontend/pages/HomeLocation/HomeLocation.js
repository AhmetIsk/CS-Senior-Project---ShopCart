import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useIsFocused } from '@react-navigation/native';
import { colors } from '../../constants/styles'
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';

export default function HomeLocation({ navigation }) {
    const [coordinates, setCoordinates] = useState();
    const token = useSelector(userToken);
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const isFocused = useIsFocused();
    useEffect(() => {
        userService.getUserData(token).then((res) => {
            setUserData(res);
            console.log(res);
            if (res.latitude && res.longitude)
                setCoordinates({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
        }
        )
    }, [isFocused])
    const handleMyLocation = () => {
        setLoading(true);
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setLongitude(location.coords.longitude);
            setLatitude(location.coords.latitude);
            setCoordinates({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            if (userData.latitude && userData.longitude)
                userService.updateLocationCoords(latitude, longitude, userData.user.id, token).then(() => setLoading(false));
            else
                userService.setLocationCoords(latitude, longitude, userData.user.id, token).then(() => setLoading(false));
        })();
    };

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

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
                <Text style={styles.headerTitle}>Home Location</Text>
                <Text style={{ width: 33 }} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>You can update your home location to receive notifications when you leave from your home by clicking the button below:</Text>
                <TouchableOpacity onPress={handleMyLocation} style={styles.button}><Text style={styles.buttonText}>Update My Location</Text></TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator
                    //visibility of Overlay Loading Spinner
                    visible={loading}
                    size="large" color={colors.orange}
                />
            ) : (
                <>
                    {
                        coordinates &&
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            initialRegion={coordinates}>
                            <Marker coordinate={coordinates} />
                        </MapView>
                    }
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '90%',
        height: '50%'
    },
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
        backgroundColor: 'orange',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 15,
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
        fontSize: 20,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})