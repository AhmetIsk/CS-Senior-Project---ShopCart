/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable global-require */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Linking, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import SVGoogle from '../../assets/icGoogle.svg';
import { styles } from './styles';
import { login } from '../../store/actions/auth';
import { ButtonLabel, StyledSignInUpButton } from '../../components/Buttons';
import { getAuthAsyncStorage } from '../../services/getAuthAsyncStorage';
import { setToken } from '../../store/slices/token';
import { colors } from '../../constants/styles';

// TODO: Input alinacak kisimlar yeni bir child componentte verilecek rerender sayisini azaltmak icin
const LoginScreen = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const userStorage = await getAuthAsyncStorage();
      console.log('bu user storage homedaki', userStorage);
      dispatch(setToken(userStorage.token));
    };
    load();
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    login(username, password, dispatch, setLoading);
    // setLoading(false);
    setUsername('');
    setPassword('');
  };


  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {loading ? (
          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
            size="large" color={colors.orange}
          />
        ) : (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                placeholder="Eg. AhmetIsk"
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
              />
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                placeholder="*** **** ***"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                secureTextEntry
              />
              <Text style={styles.forgotPass} onPress={() => Linking.openURL('http://google.com')}>
                Forgot Password?
              </Text>
            </View>
            <View style={styles.registrationContainer}>
              <StyledSignInUpButton
                onPress={handleSubmit}
                color={username && password ? colors.orange : colors.disabled}
                disabled={!(username && password)}
              >
                <ButtonLabel color={username && password ? colors.white : colors.disabledText}>
                  Login
                </ButtonLabel>
              </StyledSignInUpButton>
              <StyledSignInUpButton
                onPress={startLoading}
                color={username && password ? colors.orange : colors.disabled}
              >
                <SVGoogle width={20} height={20} />
                <ButtonLabel color={username && password ? colors.white : colors.disabledText}>
                  Login with Google
                </ButtonLabel>
              </StyledSignInUpButton>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
