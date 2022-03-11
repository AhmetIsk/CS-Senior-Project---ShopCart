import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HomeScreen from '../HomeScreen/HomeScreen';
import { styles } from '../HomeScreen/styles';
import { colors } from '../../constants/styles';
import SettingsScreen from '../Settings/SettingsScreen';

const Tab = createBottomTabNavigator();

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}
const ShopCartBottomTabs = () => (
  <Tab.Navigator
    initialRouteName="Feed"
    tabBarOptions={{
      showLabel: false,
    }}
    screenOptions={{
      tabBarActiveTintColor: `${colors.orange}`,
    }}
  >
    <Tab.Screen
      name="Feed"
      component={HomeScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <AntDesign name="home" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={Notifications}
      options={{
        tabBarLabel: 'Updates',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="shopping-basket" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      comp
      name="Notifications2"
      component={Notifications}
      options={{
        tabBarIconStyle: {
          position: 'absolute',
          top: -30,
        },
        tabBarLabel: 'Updates2',
        tabBarIcon: () => (
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={30} color="white" />
          </TouchableOpacity>
        ),
      }}
    />
    <Tab.Screen
      name="Notifications1"
      component={Notifications}
      options={{
        tabBarLabel: 'Updates1',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="stats-chart-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={SettingsScreen}
      options={{
        tabBarLabel: 'Profile',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default ShopCartBottomTabs;