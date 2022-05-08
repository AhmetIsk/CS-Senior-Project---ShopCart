import { View, Text, KeyboardAvoidingView, TextInput, ScrollView, Button, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { styles } from "./styles/styleIndex";
import { inputIndex } from './styles/inputIndex';
import LayoutSVG from '../../assets/layout.svg';
import { ButtonLabel, StyledSignInUpButton } from '../../components/Buttons';
import { ButtonContainer } from '../../components/Containers';
import { colors } from '../../constants/styles';
import { userToken } from '../../store/slices/token';
import { userService } from '../../services/userService';
import { Entypo, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// import RNFS from 'react-native-fs';
import SVGoogle from '../../assets/icGoogle.svg';
// import { useSelector } from 'react-redux'
import { signUp } from '../../store/actions/auth';

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState(null);
  const isFocused = useIsFocused();
  const token = useSelector(userToken);
  useEffect(() => {
    userService.getUserData(token).then((res) => {
      setUserData(res);
      setEmail(res.user.email);
      setFirstName(res.user.first_name);
      setLastName(res.user.last_name);
    });
    console.log(userData);
  }, [isFocused]);

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

  const handleSubmit = () => {
    console.log('Submitted');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Entypo
        name="chevron-thin-left"
        size={26}
        color={colors.white}
        style={{ padding: 8, position: 'absolute', top: 40, left: 10, zIndex: 2 }}
        onPress={() => navigation.goBack()}
      />
      <LayoutSVG width={414} height={245} style={{ position: 'absolute', top: 0 }} />
      {
        userData?.avatar ? <Image
          style={{ backgroundColor: 'white', borderRadius: 50, padding: 10, position: 'absolute', top: 100, width: 100, height: 100 }}
          source={{
            uri: userData.avatar,
          }}
        />
          :
          <View style={{ backgroundColor: 'white', borderRadius: 50, padding: 10, position: 'absolute', top: 100 }}>
            <Ionicons name="person" size={64} color="black" />
          </View>
      }
      <ScrollView style={{ marginTop: 250 }}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {/* <Image source={require('../../images/brandLogo.png')} style={{ width: 200, height: 200 }} />
      <Text style={styles.enrollHeader}>Enroll ShopCart</Text> */}
          <Text style={{ fontSize: 18, marginTop: 20 }}> Edit User Information </Text>
          <View style={styles.inputContainer}>
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
          <TouchableOpacity onPress={pickImage} style={inputIndex.pick}><Text style={inputIndex.pickText}>Change your avatar</Text></TouchableOpacity>
          {image && <><Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} /><TouchableOpacity onPress={() => setImage(null)}><Text style={{ color: 'blue' }}>Remove</Text></TouchableOpacity></>}
          <View style={styles.registrationContainer}>
            <StyledSignInUpButton
              onPress={handleSubmit}
              color={
                email && firstName && lastName ? colors.orange : colors.disabled
              }
              disabled={!(email && firstName && lastName)}
            >
              <ButtonLabel
                color={
                  email && firstName && lastName
                    ? colors.white
                    : colors.disabledText
                }
              >
                Change Your Information
              </ButtonLabel>
            </StyledSignInUpButton>
            <StyledSignInUpButton
              onPress={handleSubmit}
              color={colors.disabled
              }
            >
              <ButtonLabel
                color={colors.black
                }
              >
                Change Your Password
              </ButtonLabel>
            </StyledSignInUpButton>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
