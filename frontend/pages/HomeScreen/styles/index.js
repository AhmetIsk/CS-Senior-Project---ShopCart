/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';
import { colors, fontStyles } from '../../../constants/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${colors.white}`,
  },
  welcomePage: {
    color: `${colors.orange}`,
    fontFamily: `${fontStyles.Arial}`,
    fontWeight: 'normal',
    fontSize: 36,
    padding: 20,
    paddingBottom: 5,
  },
  addProduct: {
    color: `${colors.gray}`,
    fontWeight: '200',
    padding: 20,
    fontSize: 20,
  },
  searchButton: {
    width: 64,
    height: 62,
    borderRadius: 19,
    backgroundColor: '#fc8b56',
    shadowColor: '#ffc690',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotateY: '180deg' }],
  },
  searchLocation: {
    marginBottom: 100,
  },
});
