/* eslint-disable react/prop-types */
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../constants/styles'

export default function SearchOrJoinButton({ onPress, text }) {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <Text style={styles.inputText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 336,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#fc8b56",
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputText: {
        color: `${colors.white}`,
        fontSize: 16,
        fontWeight: 'bold'
    }
})