import React, { useState } from 'react'
import { KeyboardAvoidingView, TextInput, View, Text, Image } from 'react-native'
import { ButtonLabel, StyledSignInUpButton } from '../../components/Buttons';
import { colors } from '../../constants/styles';
// import { useSelector } from 'react-redux'
import { signUp } from '../../store/actions/auth';
import { styles } from '../LoginScreen/styles';
// import HomeScreen from './HomeScreen';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const auth= useSelector((state) => state.auth);
  // const { errorMessageLogin } = auth;
  // const dispatch = useDispatch();

  const handleSubmit = () => {
    signUp(username, password, email, firstName, lastName);
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
      <Text style={styles.enrollHeader}>Enroll ShopCart</Text>
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
        <TextInput
          placeholder="Password Again"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={text => setLastName(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <StyledSignInUpButton
          onPress={handleSubmit}
          color={colors.headerRed}
        >
          <ButtonLabel color={colors.white}>Sign Up</ButtonLabel>
        </StyledSignInUpButton>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen
