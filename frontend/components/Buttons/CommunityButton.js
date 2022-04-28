import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../constants/styles'

export default function CommunityButton() {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log('hello guys')}>
            <View style={styles.infoContainer}>
                <Text style={styles.communityName}>CommunityButton</Text>
                <Text style={styles.communityName}>This is the date</Text>
            </View>
            <View style={styles.people}>
                <Ionicons
                    name="people"
                    size={25}
                    color={colors.white}
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                />
                <Text>This is the comm info</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#FC8B56',
        width: 278,
        height: 179,
        borderRadius: 18,
        shadowColor: "rgba(0, 120, 226, 0.36)",
        shadowOffset: {
            width: 0,
            height: 4
        },
    },
    people: {
        height: '35%',
        width: '100%',
        borderRadius: 18,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    communityName: {
        color: `${colors.white}`,
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "italic",
        lineHeight: 24,
        letterSpacing: 0.36,
    },
    infoContainer: {
        paddingLeft: 15,
        paddingTop: 25
    }
})