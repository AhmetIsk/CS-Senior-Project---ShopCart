/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, Text, TextInput, View } from 'react-native'
import { styles } from './styles';
import { login } from '../../store/actions/auth';
import { ButtonLabel, StyledSignInUpButton } from '../../components/Buttons';
import { colors } from '../../constants/styles';
import { useDispatch } from 'react-redux';
import { getAuthAsyncStorage } from '../../services/getAuthAsyncStorage';
import { setToken } from '../../store/slices/token';



// TODO: Input alinacak kisimlar yeni bir child componentte verilecek rerender sayisini azaltmak icin
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const load = async () => {
      const userStorage = await getAuthAsyncStorage();
      console.log('bu user storage homedaki',userStorage);
      dispatch(setToken(userStorage.token));
    }
    load();
  }, []);

  const handleSubmit = () => {
    login(username, password, dispatch);
    setUsername('');
    setPassword('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <Image source={require('../../images/brandLogo.png')} style={{ width: 200, height: 200 }} />
      <Text style={styles.header}>ShopCart</Text>
      <Text style={styles.subheader}>Smart Shopping List Creator</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <Text style={styles.subcomment}>Let's start!</Text>
      <View style={styles.buttonContainer}>
        <StyledSignInUpButton
          color={colors.headerRed}
          onPress={handleSubmit}
        >
          <ButtonLabel color={colors.white}>Sign In</ButtonLabel>
        </StyledSignInUpButton>
        <StyledSignInUpButton
          onPress={()  => navigation.navigate('Sign Up')}
          color = {colors.white}
        >
          <ButtonLabel color={colors.headerRed}>Sign Up</ButtonLabel>
        </StyledSignInUpButton>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
