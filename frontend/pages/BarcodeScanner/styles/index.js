/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';
import { colors, fontStyles } from '../../../constants/styles';

export const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
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
    top: 40,
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
});
