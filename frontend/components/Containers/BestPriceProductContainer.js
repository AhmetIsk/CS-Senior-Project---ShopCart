/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/styles'
import { Entypo } from '@expo/vector-icons'

export default function BestPriceProductContainer({
    name,
    imageUrl,
    bestPrice,
    minPrice
}) {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={{ width: 84, height: 84, margin: 5 }} />
                <View style={styles.infoContainer}>
                    <Text style={styles.textStyle}>{`${name.substring(0, 18)}...`}</Text>
                    <View style={styles.marketContainer}>
                        <Entypo name="shop" size={18} color="black" />
                        <Text style={{ paddingLeft: 5 }}>{bestPrice[0]?.name}</Text>
                    </View>
                    <Text style={styles.textStyle}>{`${minPrice} TL`}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        width: 327,
        height: 100,
        borderRadius: 4,
        backgroundColor: `${colors.white}`,
        shadowColor: `${colors.shadowColor}`,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 7,
        shadowOpacity: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    imageContainer: {
        flexDirection: 'row',
        width: 245
    },
    infoContainer: {
        width: 245,
        padding: 8,
    },
    textStyle: {
        fontSize: 15,
        fontWeight: '500',
        fontStyle: 'normal',
        lineHeight: 16,
        letterSpacing: -0.39,
        color: `${colors.textColor}`,
        paddingTop: 10,
    },
    marketContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
})