/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/styles';

export const inputStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${colors.white}`,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: `${colors.inputBorder}`,
    marginTop: 10,
  },
  inputLabel: {
    paddingTop: 20,
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    color: `${colors.gray}`,
  },
  buttonContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  checkboxBackground: {
    borderColor: `${colors.inputBorder}`,
    borderWidth: 1,
    margin: 7,
    borderRadius: 100,
  },
  forgotPass: {
    display: 'flex',
    alignSelf: 'flex-end',
    margin: 15,
    color: `${colors.orange}`,
  },
  registrationContainer: {
    margin: 30,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  radioContainer: {
    alignItems: 'center',
  },
  informalText: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    color: `${colors.gray}`,
  },
  discardChanges: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: `${colors.gray}`,
  },
  communityContainer: {
    height: 50,
    width: '100%',
    display: 'flex',
    // flexDirection: 'row',
    flexGrow: 1
  },
  commInput: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: `${colors.inputBorder}`,
    marginTop: 10,
  }
});
