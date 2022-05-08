/* eslint-disable react/prop-types */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Swipeable } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { colors } from '../../constants/styles'
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';

export default function CommunityButton({ name, users, ownerName, navigation, rerender, setRerender, id }) {
    const token = useSelector(userToken);
    const usersNames = [];
    const rightSwipeActions = () => (
        <TouchableOpacity
            style={{
                backgroundColor: `${colors.headerRed}`,
                justifyContent: 'center',
                alignItems: 'flex-end',
                right: -40,
                height: 175,
                alignSelf: 'center',
                borderRadius: 12,
                top: 20,
                left: 0,
            }}
            onPress={() => userService.deleteCommunity(id, token).then(() => {
                setRerender(!rerender);
                navigation.navigate('Communities');
            })}
        >
            <Text
                style={{
                    color: `${colors.white}`,
                    paddingHorizontal: 10,
                    fontWeight: '600',
                    paddingVertical: 20,
                }}
            >
                Delete
            </Text>
        </TouchableOpacity>
    );
    return (
        <Swipeable
            renderRightActions={rightSwipeActions}
        >
            <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log('hello guys')}>
                <View style={styles.infoContainer}>
                    <Text style={styles.communityName}>{name}</Text>
                    <Text style={styles.communityName}>{ownerName}</Text>
                </View>
                <View style={styles.people}>
                    <Ionicons
                        name="people"
                        size={25}
                        color={colors.white}
                        style={{ paddingLeft: 15, paddingRight: 15 }}
                    />
                    <Text style={styles.communityName}>{users.map((user) => [...usersNames, user.first_name])}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
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
        marginTop: 40
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