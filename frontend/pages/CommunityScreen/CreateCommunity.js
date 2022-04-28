import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../constants/styles'
import SearchOrJoinButton from '../../components/Buttons/SearchOrJoinButton'

export default function CreateCommunity() {
    return (
        <View style={styles.firstContainer}>
            <View style={styles.inputContainer}>
                <View style={styles.outerContainer}>
                    <Ionicons name="people-circle" size={30} color="black" style={{ marginRight: 8 }} />
                    <View>
                        <Text style={styles.informative}>Enter the community name to create:</Text>
                        <TextInput
                            placeholder="xxxxx"
                            // value={community}
                            // onChangeText={(text) => setCommunity(text)}
                            style={styles.input}
                        />
                    </View>
                </View>
            </View>
            <SearchOrJoinButton onPress={() => console.log("Hello guys")} text="Create Community" />
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