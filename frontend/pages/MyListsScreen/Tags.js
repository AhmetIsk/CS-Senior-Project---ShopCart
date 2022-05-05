/* eslint-disable react/prop-types */
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../../constants/styles'

export default function Tags({ name, onPress, unable }) {
    const [hidden, setHidden] = useState(false);
    const handlePress = (parentPress) => (e) => {
        e.preventDefault();
        parentPress();
        // setHidden(true);
    }
    return (
        <TouchableOpacity onPress={handlePress(onPress)} style={hidden ? styles.hidden : styles.buttonContainer}>
            <Text style={styles.text}>{name}</Text>
            {!unable && <AntDesign name="closecircleo" size={18} color={colors.inputBorder} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 100,
        backgroundColor: `${colors.inputBackground}`,
        borderRadius: 12,
        padding: 5,
        margin: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        color: `${colors.inputBorder}`
    },
    hidden: {
        display: 'none'
    }
})