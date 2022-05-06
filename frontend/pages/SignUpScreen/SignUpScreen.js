import React, { useState } from 'react';
import { KeyboardAvoidingView, TextInput, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import RNFS from 'react-native-fs';
import { ButtonLabel, StyledSignInUpButton } from '../../components/Buttons';
import { colors } from '../../constants/styles';
import SVGoogle from '../../assets/icGoogle.svg';
// import { useSelector } from 'react-redux'
import { signUp } from '../../store/actions/auth';
import { styles } from '../LoginScreen/styles';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });
    // const data = await RNFS.readFile(result.uri, 'base64').then(res => { console.log(res) });

    if (result.cancelled) {
      return;
    }
    let imageUri = result.base64 ? `data:image/jpg;base64,${result.base64}` : null;
    setImageUri(result.uri);

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('avatar', { uri: localUri, name: filename, type });

    console.log(result);
    console.log("type of result", typeof (result.uri));
    console.log(formData);

    if (!result.cancelled) {
      setImage(imageUri.toString());
    }
  };
  // const auth= useSelector((state) => state.auth);
  // const { errorMessageLogin } = auth;
  // const dispatch = useDispatch();

  const handleSubmit = () => {
    signUp(username, password, email, firstName, lastName, image);
    setUsername('');
    setPassword('');
    setEmail('');
    setFirstName('');
    setLastName('');
    setImage([]);
  };
  // useEffect(() => {
  //   if (auth.user)
  //     navigation.navigate('Home');
  // }, [auth]);

  return (
    <ScrollView>
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
        <TouchableOpacity onPress={pickImage} style={styles.pick}><Text style={styles.pickText}>Select an avatar</Text></TouchableOpacity>
        {image && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
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
    </ScrollView>
  );
};

export default SignUpScreen;
