/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable global-require */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Linking, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'react-native-paper';
import SVGoogle from '../../assets/icGoogle.svg';
import { styles } from '../LoginScreen/styles';
import { login } from '../../store/actions/auth';
import { ButtonLabel, StyledSignInUpButton } from '../../components/Buttons';
import { getAuthAsyncStorage } from '../../services/getAuthAsyncStorage';
import { setToken } from '../../store/slices/token';
import { colors } from '../../constants/styles';

// TODO: Input alinacak kisimlar yeni bir child componentte verilecek rerender sayisini azaltmak icin
const AddShoppingListScreen = () => {
  const dispatch = useDispatch();
  const [listName, setListName] = useState('');
  const [community, setCommunity] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const load = async () => {
      const userStorage = await getAuthAsyncStorage();
      console.log('bu user storage homedaki', userStorage);
      dispatch(setToken(userStorage.token));
    };
    load();
  }, []);

  const handleSubmit = () => {
    login(listName, community, dispatch);
    setListName('');
    setCommunity('');
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Add List Name</Text>
          <TextInput
            placeholder="Eg. AhmetIsk"
            value={listName}
            onChangeText={(text) => setListName(text)}
            style={styles.input}
          />
          <Text style={styles.inputLabel}>Add to Community</Text>
          <TextInput
            placeholder="*** **** ***"
            value={community}
            onChangeText={(text) => setCommunity(text)}
            style={styles.input}
            secureTextEntry
          />
          <View style={styles.checkbox}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              color="red"
            />
            <Text style={styles.inputLabel}>Make it default</Text>
          </View>
          <Text style={styles.forgotPass} onPress={() => Linking.openURL('http://google.com')}>
            Forgot Community?
          </Text>
        </View>
        <View style={styles.registrationContainer}>
          <StyledSignInUpButton
            onPress={handleSubmit}
            color={listName && community ? colors.orange : colors.disabled}
            disabled={!(listName && community)}
          >
            <ButtonLabel color={listName && community ? colors.white : colors.disabledText}>
              Login
            </ButtonLabel>
          </StyledSignInUpButton>
          <StyledSignInUpButton
            onPress={handleSubmit}
            color={listName && community ? colors.orange : colors.disabled}
          >
            <SVGoogle width={20} height={20} />
            <ButtonLabel color={listName && community ? colors.white : colors.disabledText}>
              Login with Google
            </ButtonLabel>
          </StyledSignInUpButton>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddShoppingListScreen;
