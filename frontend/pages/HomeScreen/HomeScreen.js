/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text, KeyboardAvoidingView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonContainer } from '../../components/Containers';
import SVGImg from '../../assets/logo.svg';
import { styles } from './styles';
import { userInfoToken } from '../../store/slices/user';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoToken);
  console.log('This is user info', userInfo);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ShopCart</Text>
      </View>
      <SVGImg width={118} height={134} />
      <Text style={styles.welcomePage}>Welcome, {userInfo?.first_name} !</Text>
      <ButtonContainer />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
