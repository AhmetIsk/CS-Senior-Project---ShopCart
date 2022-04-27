/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';
import { colors, fontStyles } from '../../../constants/styles';

export const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  successNotifier: {
    color: `${colors.softGreen}`,
    fontFamily: `${fontStyles.Arial}`,
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
    alignSelf: 'center',
  },
  cameraFit: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
  approvalAnimation: {
    height: 200,
  },
  progressBar: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    backgroundColor: `${colors.softGreen}`,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
  },
  bar: {
    flexDirection: 'row',
    height: 200,
    width: '80%',
  },
  barcodeNotifier: {
    color: `${colors.headerRed}`,
    fontFamily: `${fontStyles.Arial}`,
    fontWeight: 'bold',
    fontSize: 24,
    padding: 20,
  },
  text: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    paddingTop: 100,
    color: `${colors.orange}`,
    fontSize: 16,
  },
});
