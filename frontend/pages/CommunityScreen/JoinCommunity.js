import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { colors } from '../../constants/styles'
import SearchOrJoinButton from '../../components/Buttons/SearchOrJoinButton'
import { userService } from '../../services/userService'
import { userToken } from '../../store/slices/token'

export default function JoinCommunity({ navigation, userId }) {
    const token = useSelector(userToken);
    const [commId, setCommId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userId, commId);
        userService.joinCommunity(userId, commId, token).then(() => {
            navigation.goBack();
        });
    }
    return (
        <View style={styles.firstContainer}>
            <View style={styles.inputContainer}>
                <View style={styles.outerContainer}>
                    <Ionicons name="people-circle" size={30} color="black" style={{ marginRight: 8 }} />
                    <View>
                        <Text style={styles.informative}>Enter the community code to join:</Text>
                        <TextInput
                            placeholder="xxxxx"
                            value={commId}
                            onChangeText={(text) => setCommId(text)}
                            style={styles.input}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </View>
            <SearchOrJoinButton onPress={handleSubmit} text="Join Community" />
        </View>
    )
}

const styles = StyleSheet.create({
    firstContainer: {
        justifyContent: 'center',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
    },
    outerContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        display: 'flex',
        flexDirection: 'row'
    },
    inputContainer: {
        width: 336,
        height: 132,
        borderRadius: 14,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(34, 47, 85, 0.05)",
        shadowOffset: {
            width: 0,
            height: 18
        },
        shadowRadius: 20,
        shadowOpacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100
    },
    input: {
        width: 252,
        height: 32,
        borderRadius: 16,
        backgroundColor: `${colors.inputBackground}`,
        padding: 10
    },
    informative: {
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "italic",
        letterSpacing: 0.23,
        color: `${colors.informativeText}`,
        marginBottom: 10
    }
})