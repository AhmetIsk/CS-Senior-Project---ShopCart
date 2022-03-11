import React, { useState } from 'react';
import { KeyboardAvoidingView, TextInput, View, Text } from 'react-native';
import { ButtonLabel, StyledSignInUpButton } from '../../components/Buttons';
import { colors } from '../../constants/styles';
import SVGoogle from '../../assets/icGoogle.svg';
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
    setEmail('');
    setFirstName('');
    setLastName('');
  };
  // useEffect(() => {
  //   if (auth.user)
  //     navigation.navigate('Home');
  // }, [auth]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* <Image source={require('../../images/brandLogo.png')} style={{ width: 200, height: 200 }} />
      <Text style={styles.enrollHeader}>Enroll ShopCart</Text> */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.registrationContainer}>
        <StyledSignInUpButton
          onPress={handleSubmit}
          color={
            username && password && email && firstName && lastName ? colors.orange : colors.disabled
          }
          disabled={!(username && password && email && firstName && lastName)}
        >
          <ButtonLabel
            color={
              username && password && email && firstName && lastName
                ? colors.white
                : colors.disabledText
            }
          >
            Registration
          </ButtonLabel>
        </StyledSignInUpButton>
        <StyledSignInUpButton
          onPress={handleSubmit}
          color={
            username && password && email && firstName && lastName ? colors.orange : colors.disabled
          }
        >
          <SVGoogle width={20} height={20} />
          <ButtonLabel
            color={
              username && password && email && firstName && lastName
                ? colors.white
                : colors.disabledText
            }
          >
            Sign Up with Google
          </ButtonLabel>
        </StyledSignInUpButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
