import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { getAuthAsyncStorage } from "../services/getAuthAsyncStorage";
import {loggedIn, logout} from "../store/actions/auth";
import store from "../store/reducers";

const HomeScreen = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);
  const [tag, setTag] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      const userStorage = await getAuthAsyncStorage();
      console.log('bu user storage homedaki',userStorage, auth);
      setTag({  user: userStorage.user, token: userStorage.token});
      if (userStorage.user && userStorage.token) {
        await store.dispatch(loggedIn({
          user: userStorage.user,
          token: userStorage.token,
        }));
      }
    }
    load();
  }, []);

  if (!tag) {
    return null;
  }

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Sign out" onPress={() => dispatch(logout())} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});