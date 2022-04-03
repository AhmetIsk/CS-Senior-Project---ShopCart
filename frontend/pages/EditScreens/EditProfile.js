import { View, Text, KeyboardAvoidingView, TextInput, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles';
import LayoutSVG from '../../assets/layout.svg';
import { ButtonLabel, SettingsButtons } from '../../components/Buttons';
import { ButtonContainer } from '../../components/Containers';
import { colors } from '../../constants/styles';
import { useDispatch } from 'react-redux';

const EditProfile = () => {
  const dispatch = useDispatch();
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log("Submitted")
  };

  return (
    <View style={styles.container} behavior="padding">
      <LayoutSVG width={414} height={245} style={{ position: 'absolute', top: 0, zIndex: 2 }} />
      <View style={styles.settingsContainer}>
          <View style={styles.inputsContainer}>
            <Text style={styles.inputLabel}>FirstName</Text>
            <TextInput
              placeholder="Ravan"
              value={FirstName}
              onChangeText={(text) => {setFirstName(text)}}
              style={styles.input}
            />
            <Text style={styles.inputLabel}>LastName</Text>
            <TextInput
              placeholder="Aliyev"
              value={LastName}
              onChangeText={(text) => {setLastName(text)}}
              style={styles.input}
            />
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              placeholder="mehmetyaylaci2011@hotmail.com"
              value={email}
              onChangeText={(text) => {setEmail(text)}}
              style={styles.input}
            />
            <ButtonContainer style= {styles.buttonContainer}>
              <SettingsButtons style={styles.buttonPassword}>
                <ButtonLabel color={colors.black}>Change Password</ButtonLabel>
              </SettingsButtons>
            </ButtonContainer>
          </View>
      </View>
    </View>
  )
}

export default EditProfile