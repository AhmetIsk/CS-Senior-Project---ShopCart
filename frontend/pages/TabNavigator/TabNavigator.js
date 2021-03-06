import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HomeScreen from '../HomeScreen/HomeScreen';
import { styles } from '../HomeScreen/styles';
import { colors } from '../../constants/styles';
import SettingsScreen from '../Settings/SettingsScreen';
import MyListsNavigator from '../MyListsScreen/MyListsNavigator';
import StatisticsScreen from '../StatisticsScreen/StatisticsScreen';
import SettingsNavigator from '../Settings/SettingsNavigator';
import SearchWithBarcode from '../SearchForBarcode/SearchWithBarcode';

const Tab = createBottomTabNavigator();

const ShopCartBottomTabs = () => (
  <Tab.Navigator
    initialRouteName="Feed"
    screenOptions={{
      tabBarActiveTintColor: `${colors.orange}`,
      tabBarShowLabel: false,
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
      name="My Lists Navigator"
      component={MyListsNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="shopping-basket" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      comp
      name="Search Product with Barcode"
      component={SearchWithBarcode}
      options={{
        headerShown: false,
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
      name="Statistics"
      component={StatisticsScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="stats-chart-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={SettingsNavigator}
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
