import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CreateCommunity from '../../pages/CommunityScreen/CreateCommunity';
import JoinCommunity from '../../pages/CommunityScreen/JoinCommunity';
import { colors } from '../../constants/styles';

export default function ComCreateContainer() {
    const [create, setCreate] = useState(true);
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setCreate(true)} style={create ? styles.active : styles.notActive}>
                    <Text style={create ? styles.activeText : styles.notActiveText}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCreate(false)} style={!create ? styles.active : styles.notActive}>
                    <Text style={!create ? styles.activeText : styles.notActiveText}>Join</Text>
                </TouchableOpacity>
            </View>
            {create ?
                <CreateCommunity /> :
                <JoinCommunity />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '60%',
        height: 57,
        borderRadius: 28.5,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 80
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    active: {
        width: '40%',
        height: 43,
        borderRadius: 21.5,
        backgroundColor: "#fc8b56",
        alignItems: 'center',
        justifyContent: 'center'
    },
    notActive: {
        width: '40%',
        height: 43,
        borderRadius: 21.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeText: {
        color: `${colors.white}`,
        fontWeight: 'bold'
    },
    notActiveText: {
        color: `${colors.disabledText}`,
        fontWeight: 'bold'
    }
})