import { KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { styles } from '../LoginScreen/styles';
import LayoutSVG from '../../assets/layout.svg';
import { ButtonLabel, SettingsButtons } from '../../components/Buttons';
import { ButtonContainer } from '../../components/Containers';
import { colors } from '../../constants/styles';

const buttonStyle = {
  shadowColor: 'rgba(0,0,0, .4)', // IOS
  shadowOffset: { height: -5, width: -5 }, // IOS
  shadowOpacity: 1, // IOS
  shadowRadius: 1, // IOS
  backgroundColor: '#fff',
  elevation: 5, // Android
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: 15,
};

const SettingsScreen = ({navigation}) => (
  <KeyboardAvoidingView style={styles.container} behavior="padding">
    <LayoutSVG width={414} height={245} style={{ position: 'absolute', top: 0 }} />
    <ButtonContainer style={{ marginTop: 245 }}>
      <SettingsButtons style={buttonStyle}>
        <ButtonLabel color={colors.black} onPress={() => navigation.navigate('Edit Profile')}>Edit Profile</ButtonLabel>
      </SettingsButtons>
      <SettingsButtons style={buttonStyle}>
        <ButtonLabel color={colors.black}>Home Location</ButtonLabel>
      </SettingsButtons>
      <SettingsButtons style={buttonStyle}>
        <ButtonLabel color={colors.black}>Previous Lists</ButtonLabel>
      </SettingsButtons>
      <SettingsButtons style={buttonStyle}>
        <ButtonLabel color={colors.black}>Communities</ButtonLabel>
      </SettingsButtons>
      <SettingsButtons style={buttonStyle}>
        <ButtonLabel color={colors.black}>Notification</ButtonLabel>
      </SettingsButtons>
      <SettingsButtons style={buttonStyle}>
        <ButtonLabel color={colors.black}>Log out</ButtonLabel>
      </SettingsButtons>
    </ButtonContainer>
  </KeyboardAvoidingView>
);

export default SettingsScreen;
