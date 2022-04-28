import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { colors } from '../../constants/styles'
import { styles } from './styles'
import ComCreateContainer from '../../components/Containers/ComCreateContainer'

export default function CreateJoinNavigator({ navigation }) {
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
                <Text style={styles.headerTitle}>Communities</Text>
                <Text style={{ width: 33 }} />
            </View>
            <View style={styles.inputContainer}>
                <ComCreateContainer />
            </View>
        </View>
    )
}
