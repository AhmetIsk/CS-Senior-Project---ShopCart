import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { RadioButton } from 'react-native-paper';
import { colors } from '../../constants/styles'

export default function NotificationsScreen({ navigation }) {
    const [value, setValue] = React.useState('first');
    const [yes, setYes] = React.useState('false');
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
                <Text style={styles.headerTitle}>Notifications</Text>
                <Text style={{ width: 33 }} />
            </View>
            <View style={styles.backOne}>
                <RadioButton.Group onValueChange={newValue => setYes(newValue)} value={yes}>
                    <View style={styles.radioone}>
                        <Text>Allow Notifications</Text>
                        <RadioButton value='true' />
                    </View>
                </RadioButton.Group>
            </View>
            <View style={styles.selection}>
                <Text>Get notification from the lists with...</Text>
                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                    <View style={styles.radio}>
                        <RadioButton value="first" />
                        <Text>High Priority</Text>
                    </View>
                    <View style={styles.radio}>
                        <RadioButton value="second" />
                        <Text>Medium or High Priority</Text>
                    </View>
                    <View style={styles.radio}>
                        <RadioButton value="third" />
                        <Text>All Priorities</Text>
                    </View>
                </RadioButton.Group>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    backOne: {
        width: 340,
        height: 57,
        borderRadius: 6,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        marginBottom: 40,
        justifyContent: 'center',
    },
    selection: {
        width: 340,
        height: 160,
        borderRadius: 6,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioone: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    radio: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
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