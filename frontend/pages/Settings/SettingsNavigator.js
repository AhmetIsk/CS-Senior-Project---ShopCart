import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Communities from '../CommunityScreen/Communities';
import CreateJoinNavigator from '../CommunityScreen/CreateJoinNavigator';
import EditProfile from '../EditScreens/EditProfile';
import SettingsScreen from './SettingsScreen';

const Stack = createNativeStackNavigator();

export default function SettingsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Settings Screen"
                component={SettingsScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Edit Profile"
                component={EditProfile}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Communities"
                component={Communities}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Create or Search Community"
                component={CreateJoinNavigator}
            />
        </Stack.Navigator>
    )
}
