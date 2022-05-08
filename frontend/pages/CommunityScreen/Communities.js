/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { colors } from '../../constants/styles';
import { styles } from './styles/index';
import AddShopListButton from '../../components/Buttons/AddShopListButton';
import CommunityButton from '../../components/Buttons/CommunityButton';
import { userToken } from '../../store/slices/token';
import { userService } from '../../services/userService';

export default function Communities({ navigation }) {
    const isFocused = useIsFocused();
    const [items, setItems] = useState([]);
    const token = useSelector(userToken);
    const [rerender, setRerender] = useState(false);
    // userService.getCommunities(token);
    const ListCommunities = () => {
        userService.getCommunityOwner(token).then((communities) => {
            console.log(communities.length);
            if (communities.length !== 0) {
                console.log(communities);
                const mappedItems = communities.map((community) => (
                    <CommunityButton
                        key={community.id}
                        name={community.name}
                        users={community.users}
                        ownerName={community.community_owner.username}
                        navigation={navigation}
                        rerender={rerender}
                        setRerender={setRerender}
                        id={community.id}
                    />
                ));
                setItems(mappedItems);
            }
        });
        userService.getCommunityMembership(token).then((communities) => {
            if (communities.length !== 0) {
                console.log("this is membership", communities);
                const mappedItems = communities.map((community) => (
                    <CommunityButton
                        key={community.id}
                        name={community.name}
                        users={community.users}
                        ownerName={community.community_owner.username}
                    />
                ));
                setItems((prev) => [...prev, mappedItems]);
            }
        })
    };
    useEffect(() => {
        ListCommunities();
    }, [isFocused, rerender]);
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
            <ScrollView style={styles.scrollView}>{items}</ScrollView>
            <AddShopListButton onPress={() => navigation.navigate('Create or Search Community')} />
        </View>
    )
}