/* eslint-disable array-callback-return */
import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { colors } from '../../constants/styles'
import SearchOrJoinButton from '../../components/Buttons/SearchOrJoinButton'
import { userService } from '../../services/userService'
import { userToken } from '../../store/slices/token'

export default function CreateCommunity({ navigation }) {
    const token = useSelector(userToken);
    const [communityName, setCommunityName] = useState('');
    const [warning, setWarning] = useState(<Text />);
    const handleSubmit = (e) => {
        e.preventDefault();

        userService.getCommunities(token).then((response) => {
            // eslint-disable-next-line array-callback-return
            let exists = false;
            const result = response.map((community) => {
                if (community.name.toLowerCase() === communityName.toLocaleLowerCase()) {
                    exists = true;
                }
            });
            return exists;
        }).then((result) => {
            console.log("result", result);
            if (!result) {
                userService.createCommunity(communityName, token).then(() => {
                    navigation.navigate('Communities');
                });
            }
            else {
                setWarning(<Text style={{ color: 'red', fontSize: 12, paddingVertical: 12 }}>Commmunity name {communityName} is already exist!</Text>);
            }
        });
    }
    return (
        <View style={styles.firstContainer}>
            <View style={styles.inputContainer}>
                <View style={styles.outerContainer}>
                    <Ionicons name="people-circle" size={30} color="black" style={{ marginRight: 8 }} />
                    <View>
                        <Text style={styles.informative}>Enter the community name to create:</Text>
                        <TextInput
                            placeholder="xxxxx"
                            value={communityName}
                            onChangeText={(text) => setCommunityName(text)}
                            style={styles.input}
                        />
                    </View>
                </View>
                {warning}
            </View>
            <SearchOrJoinButton onPress={handleSubmit} text="Create Community" />
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