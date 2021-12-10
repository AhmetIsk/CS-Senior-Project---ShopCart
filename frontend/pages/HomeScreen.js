import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});