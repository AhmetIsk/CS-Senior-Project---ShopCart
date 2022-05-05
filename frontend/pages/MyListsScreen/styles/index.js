/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  addListButton: {
    width: 240,
    height: 50,
    borderRadius: 100,
    backgroundColor: `${colors.buttonOrange}`,
    shadowColor: `${colors.borderColor}`,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5, // Android
    shadowRadius: 20,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addListLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: `${colors.white}`,
  },
  emptyListHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: `${colors.buttonLabel}`,
    paddingTop: 50,
  },
  emptyListText: {
    width: 209,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 25,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: `${colors.emptyListText}`,
  },
  discardChanges: {
    marginTop: 30,
  },
  scrollView: {
    marginTop: 100,
    height: 300,
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 80,
  },
  bestPrice: {
    fontSize: 20,
    color: `${colors.orange}`,
    fontWeight: '500'
  }
});
