/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Text, KeyboardAvoidingView, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { ButtonContainer } from '../../components/Containers';
import SVGImg from '../../assets/logo.svg';
import { styles } from './styles';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';

const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState(null);
  const token = useSelector(userToken);
  useEffect(() => {
    userService.getUserData(token).then((res) => setUserData(res));
  }, [isFocused, token])
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ShopCart</Text>
      </View>
      <SVGImg width={118} height={134} />
      <Text style={styles.welcomePage}>Welcome, {userData?.user.first_name} !</Text>
      <Image source={require('../../assets/homeScreenDesign.jpg')} style={{ height: 390, width: 385, top: 80 }} />
      <ButtonContainer />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
