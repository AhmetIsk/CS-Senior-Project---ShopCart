/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Text, KeyboardAvoidingView, Image } from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { AddProductButton, ButtonLabel, EditButton, EditButtonLabel, ShoppingListButton, SignOut } from "../../components/Buttons";
import { ButtonContainer } from "../../components/Containers";
import { colors } from "../../constants/styles";
import { getAuthAsyncStorage } from "../../services/getAuthAsyncStorage";
import { userService } from "../../services/userService";
import { logout } from "../../store/actions/auth";
import { setToken, userToken } from "../../store/slices/token";
import { styles } from "./styles";
// import store from "../store/reducers";

const HomeScreen = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);
  const [tag, setTag] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector(userToken);
  useEffect(() => {
    const load = async () => {
      const userStorage = await getAuthAsyncStorage();
      console.log('bu user storage homedaki',userStorage, auth);
      setTag({  user: userStorage.user, token: userStorage.token});
      dispatch(setToken(userStorage.token));
      console.log('bu da redux tokeni', token);
      // if (userStorage.user && userStorage.token) {
      //   await store.dispatch(loggedIn({
      //     user: userStorage.user,
      //     token: userStorage.token,
      //   }));
      // }
    }
    load();
  }, []);

  if (!tag) {
    return null;
  }

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
      <SignOut onPress={() => logout()}>
        <Image source={require('../../images/logout.png')} style={{ width: 50, height: 50 }}/>
      </SignOut>
      <Image source={require('../../images/defaultAvatar.png')} style={{ width: 150, height: 150 }} />
      <Text style={styles.welcomePage}>Welcome User!</Text>
      <ButtonContainer>
        <EditButton
          color={colors.white}
          onPress={() => {}}
        >
          <EditButtonLabel>Edit My Profile</EditButtonLabel>
        </EditButton>
        <ShoppingListButton onPress={() => navigation.navigate('Shopping List')}>
          <ButtonLabel color={colors.white}>My Shopping List</ButtonLabel>
        </ShoppingListButton>
        <ShoppingListButton onPress={() => userService.addProduct("8690525041316", 1, token)}>
          <ButtonLabel color={colors.white}>My Shopping List</ButtonLabel>
        </ShoppingListButton>
        <Text style={styles.addProduct}>Add product to list:</Text>
        <AddProductButton onPress={() => navigation.navigate('Add Product via Barcode')} color={colors.green}>
          <ButtonLabel color={colors.white}>Scan Barcode</ButtonLabel>
        </AddProductButton>
      </ButtonContainer>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
