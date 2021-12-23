import { StyleSheet } from "react-native";
import { colors, fontStyles } from "../../../constants/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 25,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  header: {
    color: `${colors.headerRed}`,
    fontFamily: `${fontStyles.Arial}`,
    fontWeight: "bold",
    fontSize: 50,
    padding: 20,
    paddingBottom: 5,

  },
  enrollHeader: {
    color: `${colors.headerRed}`,
    fontFamily: `${fontStyles.Arial}`,
    fontWeight: "bold",
    fontSize: 30,
    padding: 20,
  },
  subheader: {
    color: `${colors.gray}`,
    fontWeight: "200",
    paddingBottom: 40,
    fontSize: 20
  },
  subcomment: {
    color: `${colors.headerRed}`,
    paddingTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  }
})