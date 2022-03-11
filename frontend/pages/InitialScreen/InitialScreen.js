/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable global-require */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useEffect, useCallback, useMemo, useRef } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SVGImg from '../../assets/logo.svg';
import { ButtonLabel, StyledSignInUpButton } from '../../components/Buttons';
import { colors } from '../../constants/styles';
import { getAuthAsyncStorage } from '../../services/getAuthAsyncStorage';
import { setToken } from '../../store/slices/token';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import LoginScreen from '../LoginScreen/LoginScreen';
import { styles } from '../LoginScreen/styles';
// TODO: Input alinacak kisimlar yeni bir child componentte verilecek rerender sayisini azaltmak icin

const InitialScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    const load = async () => {
      const userStorage = await getAuthAsyncStorage();
      // console.log('bu user storage homedaki',userStorage);
      dispatch(setToken(userStorage.token));
    };
    load();
  }, []);

  const handleSheetChange = useCallback(() => {}, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    // sheetRef.current?.close();
  }, []);
  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '80%'], []);

  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <SVGImg width={118} height={134} />
        <Text style={styles.header}>ShopCart</Text>
        <Text style={styles.subheader}>Smart Shopping List Creator</Text>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Before enjoying ShopCart services Please register first</Text>
        <View style={styles.buttonContainer}>
          <StyledSignInUpButton
            onPress={() => {
              handleSnapPress(1);
              navigation.navigate('Create Account');
            }}
            color={colors.orange}
          >
            <ButtonLabel color={colors.white}>Create Account</ButtonLabel>
          </StyledSignInUpButton>
          <StyledSignInUpButton
            color={colors.fadeOrange}
            onPress={() => {
              handleSnapPress(1);
              navigation.navigate('Login');
            }}
          >
            <ButtonLabel color={colors.white}>Login</ButtonLabel>
          </StyledSignInUpButton>
        </View>
        <Text style={styles.termsconds}>
          By logging in or registering, you have agreed to{' '}
          <Text style={{ color: `${colors.orange}` }}>the Terms and Conditions</Text> and{' '}
          <Text style={{ color: `${colors.orange}` }}>Privacy Policy.</Text>
        </Text>
      </KeyboardAvoidingView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        enablePanDownToClose
        index={-1}
      >
        <Tab.Navigator>
          <Tab.Screen name="Create Account" component={SignUpScreen} />
          <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
      </BottomSheet>
    </>
  );
};

export default InitialScreen;
