import { StyleSheet } from "react-native";
import { colors, fontStyles } from "../../../constants/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomePage: {
    color: `${colors.black}`,
    fontFamily: `${fontStyles.Arial}`,
    fontWeight: "bold",
    fontSize: 30,
    padding: 20,
    paddingBottom: 5,
  },
  addProduct: {
    color: `${colors.gray}`,
    fontWeight: "200",
    padding: 20,
    fontSize: 20
  },
})