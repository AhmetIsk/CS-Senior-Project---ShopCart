/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, Text, TextInput, View } from 'react-native'
import { styles } from './styles';
// import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/actions/auth';
import { ButtonLabel, StyledSignInUpButton } from '../../components/Buttons';
import { colors } from '../../constants/styles';
import { getAuthAsyncStorage } from '../../services/getAuthAsyncStorage';
import { navigate } from '../../services/navRef';
// import HomeScreen from '../HomeScreen/HomeScreen';


// TODO: Input alinacak kisimlar yeni bir child componentte verilecek rerender sayisini azaltmak icin
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tag, setTag] = useState(null);
  // const dispatch = useDispatch();
  const load = async () => {
    const userStorage = await getAuthAsyncStorage();
    setTag(userStorage.token);
    console.log('bunun sonucu budur', userStorage)
    // if (userStorage.user && userStorage.token) {
    //   await store.dispatch(loggedIn({
    //     user: userStorage.user,
    //     token: userStorage.token,
    //   }));
    // }
  }
  load();
  if (tag != null) {
    console.log(tag);
    navigate('Home');
  }
  // const auth= useSelector((state) => state.auth);
  // const { errorMessageLogin } = auth;
  // const dispatch = useDispatch();

  const handleSubmit = () => {
    login(username, password);
    setUsername('');
    setPassword('');
  };
  // useEffect(() => {
  //   if (auth.user)
  //     navigation.navigate('Home');
  // }, [auth]);

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
