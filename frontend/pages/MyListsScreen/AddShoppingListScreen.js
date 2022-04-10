/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable global-require */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { styles } from './styles';
import { inputStyles } from './styles/inputStyle';
import { getAuthAsyncStorage } from '../../services/getAuthAsyncStorage';
import { setToken, userToken } from '../../store/slices/token';
import { colors } from '../../constants/styles';
import PriorityButton from '../../components/Buttons/radioButton';
import { userService } from '../../services/userService';

// TODO: Input alinacak kisimlar yeni bir child componentte verilecek rerender sayisini azaltmak icin
const AddShoppingListScreen = ({ navigation }) => {
  const token = useSelector(userToken);
  const dispatch = useDispatch();
  const [listName, setListName] = useState('');
  const [community, setCommunity] = useState('');
  const [checked, setChecked] = useState(false);
  const [priority, setPriority] = useState('');

  useEffect(() => {
    const load = async () => {
      const userStorage = await getAuthAsyncStorage();
      dispatch(setToken(userStorage.token));
    };
    load();
  }, []);

  const handleSubmit = () => {
    userService.addShoppingList(listName, priority, token);
    setListName('');
    setCommunity('');
    setPriority('');
    setChecked(false);
  };

  const discardChanges = () => {
    setListName('');
    setCommunity('');
    setPriority('');
    setChecked(false);
  };

  return (
    <>
      <KeyboardAvoidingView style={inputStyles.container}>
        <View style={styles.header}>
          <Entypo
            name="chevron-thin-left"
            size={26}
            color={colors.white}
            style={{ padding: 8 }}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>My Lists</Text>
          <Text style={{ width: 33 }} />
        </View>
        <View style={inputStyles.inputContainer}>
          <Text style={inputStyles.inputLabel}>Add List Name</Text>
          <TextInput
            placeholder="Eg. Weekend List"
            value={listName}
            onChangeText={(text) => setListName(text)}
            style={inputStyles.input}
          />
          <Text style={inputStyles.inputLabel}>Communities</Text>
          <TextInput
            placeholder="Add new community"
            value={community}
            onChangeText={(text) => setCommunity(text)}
            style={inputStyles.input}
            secureTextEntry
          />
          <View style={inputStyles.checkbox}>
            <View style={inputStyles.checkboxBackground}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
                color="red"
              />
            </View>
            <Text style={inputStyles.inputLabel}>Make it default</Text>
          </View>
        </View>
        <View>
          <Text style={inputStyles.inputLabel}>Set Priority</Text>
          <View style={inputStyles.priorityContainer}>
            <View style={inputStyles.radioContainer}>
              <PriorityButton
                priority="high"
                onPress={() => setPriority('High')}
                selected={priority}
              />
              <Text style={inputStyles.informalText}>High</Text>
            </View>
            <View style={inputStyles.radioContainer}>
              <PriorityButton
                priority="medium"
                onPress={() => setPriority('Medium')}
                selected={priority}
              />
              <Text style={inputStyles.informalText}>Medium</Text>
            </View>
            <View style={inputStyles.radioContainer}>
              <PriorityButton
                priority="low"
                onPress={() => setPriority('Low')}
                selected={priority}
              />
              <Text style={inputStyles.informalText}>Low</Text>
            </View>
          </View>
        </View>
        <View style={inputStyles.buttonContainer}>
          <TouchableOpacity style={styles.addListButton} onPress={handleSubmit}>
            <Text style={styles.addListLabel}>Add List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.discardChanges} onPress={discardChanges}>
            <Text style={inputStyles.discardChanges}>Discard Changes</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddShoppingListScreen;
