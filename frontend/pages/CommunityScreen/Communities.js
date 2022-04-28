import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { colors } from '../../constants/styles';
import { styles } from './styles/index';
import AddShopListButton from '../../components/Buttons/AddShopListButton';
import CommunityButton from '../../components/Buttons/CommunityButton';

export default function Communities({ navigation }) {
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
            <ScrollView style={styles.scrollView}><CommunityButton /></ScrollView>
            <AddShopListButton onPress={() => navigation.navigate('Create or Search Community')} />
        </View>
    )
}