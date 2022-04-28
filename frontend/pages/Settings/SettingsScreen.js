import { KeyboardAvoidingView, View } from 'react-native';
import React from 'react';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/auth';
import { styles } from '../LoginScreen/styles';
import LayoutSVG from '../../assets/layout.svg';
import { ButtonLabel, SettingsButtons } from '../../components/Buttons';
import { ButtonContainer } from '../../components/Containers';
import { colors } from '../../constants/styles';

const buttonStyle = {
  shadowColor: `${colors.borderColor}`, // IOS
  shadowOffset: { height: -5, width: -5 }, // IOS
  shadowOpacity: 1, // IOS
  shadowRadius: 10, // IOS
  backgroundColor: '#fff',
  elevation: 5, // Android
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: 15,
};

const viewStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <LayoutSVG width={414} height={245} style={{ position: 'absolute', top: 0 }} />
      <ButtonContainer style={{ marginTop: 245 }}>
        <SettingsButtons style={buttonStyle} onPress={() => navigation.navigate('Edit Profile')}>
          <View style={viewStyle}>
            <Ionicons
              name="person"
              size={20}
              color={colors.buttonLabel}
              style={{ paddingLeft: 15, paddingRight: 15 }}
            />
            <ButtonLabel color={colors.buttonLabel}>Edit Profile</ButtonLabel>
          </View>
          <Entypo
            name="chevron-small-right"
            size={20}
            color={colors.buttonLabel}
            style={{ paddingRight: 8 }}
          />
        </SettingsButtons>
        <SettingsButtons style={buttonStyle}>
          <View style={viewStyle}>
            <Entypo
              name="location"
              size={20}
              color={colors.buttonLabel}
              style={{ paddingLeft: 15, paddingRight: 15 }}
            />
            <ButtonLabel color={colors.buttonLabel}>Home Location</ButtonLabel>
          </View>
          <Entypo
            name="chevron-small-right"
            size={20}
            color={colors.buttonLabel}
            style={{ paddingRight: 8 }}
          />
        </SettingsButtons>
        <SettingsButtons style={buttonStyle}>
          <View style={viewStyle}>
            <Ionicons
              name="time"
              size={20}
              color={colors.buttonLabel}
              style={{ paddingLeft: 15, paddingRight: 15 }}
            />
            <ButtonLabel color={colors.buttonLabel}>Previous Lists</ButtonLabel>
          </View>
          <Entypo
            name="chevron-small-right"
            size={20}
            color={colors.buttonLabel}
            style={{ paddingRight: 8 }}
          />
        </SettingsButtons>
        <SettingsButtons style={buttonStyle} onPress={() => navigation.navigate('Communities')}>
          <View style={viewStyle}>
            <Ionicons
              name="people"
              size={20}
              color={colors.buttonLabel}
              style={{ paddingLeft: 15, paddingRight: 15 }}
            />
            <ButtonLabel color={colors.buttonLabel}>Communities</ButtonLabel>
          </View>
          <Entypo
            name="chevron-small-right"
            size={20}
            color={colors.buttonLabel}
            style={{ paddingRight: 8 }}
          />
        </SettingsButtons>
        <SettingsButtons style={buttonStyle}>
          <View style={viewStyle}>
            <Ionicons
              name="notifications"
              size={20}
              color={colors.buttonLabel}
              style={{ paddingLeft: 15, paddingRight: 15 }}
            />
            <ButtonLabel color={colors.buttonLabel}>Notification</ButtonLabel>
          </View>
          <Entypo
            name="chevron-small-right"
            size={20}
            color={colors.buttonLabel}
            style={{ paddingRight: 8 }}
          />
        </SettingsButtons>
        <SettingsButtons style={buttonStyle} onPress={() => logout(dispatch)}>
          <View style={viewStyle}>
            <Entypo
              name="log-out"
              size={20}
              color={colors.buttonLabel}
              style={{ paddingLeft: 15, paddingRight: 15 }}
            />
            <ButtonLabel color={colors.buttonLabel}>Log out</ButtonLabel>
          </View>
        </SettingsButtons>
      </ButtonContainer>
    </KeyboardAvoidingView>
  );
};

export default SettingsScreen;
