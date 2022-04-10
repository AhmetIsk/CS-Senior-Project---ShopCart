/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text, KeyboardAvoidingView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  AddProductButton,
  ButtonLabel,
  EditButton,
  EditButtonLabel,
  ShoppingListButton,
  SignOut,
} from '../../components/Buttons';
import { ButtonContainer } from '../../components/Containers';
import { colors } from '../../constants/styles';
import SVGImg from '../../assets/logo.svg';
import { logout } from '../../store/actions/auth';
import { styles } from './styles';
import { userInfoToken } from '../../store/slices/user';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoToken);
  console.log('This is user info', userInfo);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SVGImg width={118} height={134} />
      <Text style={styles.welcomePage}>Welcome, {userInfo?.first_name} !</Text>
      <ButtonContainer />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
