/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text, KeyboardAvoidingView, Image } from 'react-native';
import { useDispatch } from 'react-redux';
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
import { logout } from '../../store/actions/auth';
import { styles } from './styles';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SignOut onPress={() => logout(dispatch)}>
        <Image source={require('../../images/logout.png')} style={{ width: 50, height: 50 }} />
      </SignOut>
      <Image
        source={require('../../images/defaultAvatar.png')}
        style={{ width: 150, height: 150 }}
      />
      <Text style={styles.welcomePage}>Welcome User!</Text>
      <ButtonContainer>
        <EditButton color={colors.white} onPress={() => {}}>
          <EditButtonLabel>Edit My Profile</EditButtonLabel>
        </EditButton>
        <ShoppingListButton onPress={() => navigation.navigate('Shopping List')}>
          <ButtonLabel color={colors.white}>My Shopping List</ButtonLabel>
        </ShoppingListButton>
        <Text style={styles.addProduct}>Add product to list:</Text>
        <AddProductButton
          onPress={() => navigation.navigate('Add Product via Barcode')}
          color={colors.blue}
        >
          <ButtonLabel color={colors.white}>Scan Product Image</ButtonLabel>
        </AddProductButton>
        <AddProductButton
          onPress={() => navigation.navigate('Add Product via Barcode')}
          color={colors.green}
        >
          <ButtonLabel color={colors.white}>Scan Barcode</ButtonLabel>
        </AddProductButton>
        <AddProductButton
          onPress={() => navigation.navigate('Add Product via Barcode')}
          color={colors.purple}
        >
          <ButtonLabel color={colors.white}>Talk to me</ButtonLabel>
        </AddProductButton>
        <AddProductButton
          onPress={() => navigation.navigate('Add Product via Barcode')}
          color={colors.headerRed}
        >
          <ButtonLabel color={colors.white}>Type Product</ButtonLabel>
        </AddProductButton>
      </ButtonContainer>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
