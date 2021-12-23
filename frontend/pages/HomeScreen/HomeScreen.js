import React, { useEffect, useState } from "react";
import { Text, KeyboardAvoidingView, Image } from "react-native";
import {useSelector} from "react-redux";
import { AddProductButton, ButtonLabel, EditButton, EditButtonLabel, ShoppingListButton, SignOut } from "../../components/Buttons";
import { ButtonContainer } from "../../components/Containers";
import { colors } from "../../constants/styles";
import { getAuthAsyncStorage } from "../../services/getAuthAsyncStorage";
import { logout } from "../../store/actions/auth";
import { styles } from "./styles";
// import store from "../store/reducers";

const HomeScreen = () => {
  const auth = useSelector((state) => state.auth);
  const [tag, setTag] = useState(null);
  // const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      const userStorage = await getAuthAsyncStorage();
      console.log('bu user storage homedaki',userStorage, auth);
      setTag({  user: userStorage.user, token: userStorage.token});
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
        <ShoppingListButton onPress={() => {}}>
          <ButtonLabel color={colors.white}>My Shopping List</ButtonLabel>
        </ShoppingListButton>
        <Text style={styles.addProduct}>Add product to list:</Text>
        <AddProductButton onPress={() => {}} color={colors.green}>
          <ButtonLabel color={colors.white}>Scan Barcode</ButtonLabel>
        </AddProductButton>
      </ButtonContainer>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
