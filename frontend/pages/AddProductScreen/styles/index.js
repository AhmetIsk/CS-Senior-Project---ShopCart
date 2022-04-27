/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 85,
    flexDirection: 'row',
    backgroundColor: `${colors.headerOrange}`,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 21,
    fontStyle: 'italic',
    textAlign: 'center',
    color: `${colors.white}`,
    paddingBottom: 10,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  addProduct: {
    color: `${colors.headerOrange}`,
    textAlign: 'center',
    fontSize: 21,
    paddingBottom: 40,
  },
});
