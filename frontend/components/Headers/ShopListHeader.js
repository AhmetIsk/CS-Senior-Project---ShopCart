/* eslint-disable react/prop-types */
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import HighBackground from '../../assets/HighPriBackground.svg';
import MediumBackground from '../../assets/MediumPriBackground.svg';
import LowBackground from '../../assets/LowPriBackground.svg';
import { colors } from '../../constants/styles';
import { userService } from '../../services/userService';
import { userToken } from '../../store/slices/token';
import { shopListId } from '../../store/slices/shopListId';

export default function ShopListHeader({ priority, listName, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState(listName);
  const token = useSelector(userToken);
  const id = useSelector(shopListId);
  if (priority === 'Low') {
    return (
      <>
        <Entypo
          name="chevron-thin-left"
          size={26}
          color={colors.white}
          style={{ position: 'absolute', top: 50, left: 10, zIndex: 1 }}
          onPress={() => navigation.goBack()}
        />
        <LowBackground />
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <AntDesign name="closecircle" size={30} color={`${colors.orange}`} />
              </TouchableOpacity>
              <Text style={styles.changeNameHeader}>Edit the name below:</Text>
              <TextInput
                value={newName}
                style={styles.input}
                onChangeText={(text) => {
                  setNewName(text);
                }}
              />
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => {
                  userService
                    .changeShopListName(id, token, newName)
                    .then(() => setModalVisible(!modalVisible));
                }}
              >
                <Text style={styles.textStyle}>Change List Name</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.textContainer}>
          <View style={styles.inlineTextContainer}>
            <Text style={styles.listName}>{listName}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Entypo name="edit" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
  if (priority === 'Medium') {
    return (
      <>
        <Entypo
          name="chevron-thin-left"
          size={26}
          color={colors.white}
          style={{ position: 'absolute', top: 50, left: 10, zIndex: 1 }}
          onPress={() => navigation.goBack()}
        />
        <MediumBackground />
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <AntDesign name="closecircle" size={30} color={`${colors.orange}`} />
              </TouchableOpacity>
              <Text style={styles.changeNameHeader}>Edit the name below:</Text>
              <TextInput
                value={newName}
                style={styles.input}
                onChangeText={(text) => {
                  setNewName(text);
                }}
              />
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Change List Name</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.textContainer}>
          <View style={styles.inlineTextContainer}>
            <Text style={styles.listName}>{listName}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Entypo name="edit" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
  if (priority === 'High') {
    return (
      <>
        <Entypo
          name="chevron-thin-left"
          size={26}
          color={colors.white}
          style={{ position: 'absolute', top: 50, left: 10, zIndex: 1 }}
          onPress={() => navigation.goBack()}
        />
        <HighBackground />
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <AntDesign name="closecircle" size={30} color={`${colors.orange}`} />
              </TouchableOpacity>
              <Text style={styles.changeNameHeader}>Edit the name below:</Text>
              <TextInput
                value={newName}
                style={styles.input}
                onChangeText={(text) => {
                  setNewName(text);
                }}
              />
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Change List Name</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.textContainer}>
          <View style={styles.inlineTextContainer}>
            <Text style={styles.listName}>{listName}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Entypo name="edit" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  input: {
    backgroundColor: 'white',
    width: 200,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: `${colors.borderColor}`,
    marginTop: 10,
  },
  listName: {
    fontSize: 30,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 41,
    letterSpacing: 0.36,
    color: `${colors.white}`,
  },
  textContainer: {
    position: 'absolute',
    top: 150,
    left: 50,
    zIndex: 1,
    width: 300,
  },
  inlineTextContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    width: 200,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: `${colors.orange}`,
    margin: 20,
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  changeNameHeader: {
    fontSize: 20,
    paddingBottom: 20,
    color: `${colors.orange}`,
  },
});
