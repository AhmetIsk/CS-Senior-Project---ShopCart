import styled from "styled-components";
import { colors } from "../../constants/styles";

export const StyledSignInUpButton = styled.TouchableOpacity`
  background-color: ${props => props.color || '#0782F9'};
  width: 100%;
  border-radius: 10px;
  align-items: center;
  margin-top: 15px;
  padding: 15px;
`
export const ButtonLabel = styled.Text`
  color: ${props => props.color || '#0782F9'};
  font-weight: 700;
  font-size: 25px;
`
export const SignOut = styled.TouchableOpacity`
  margin-top: 60px;
  margin-right: 15px;
  position:absolute;
  top:0;
  right:0;
`

export const GoBack = styled.TouchableOpacity`
  margin-top: 60px;
  margin-left: 15px;
  position:absolute;
  top:0;
  left:0;
`

export const EditButton = styled.TouchableOpacity`
  background-color: ${props => props.color || '#0782F9'};
  width: 80%;
  border-radius: 10px;
  align-items: center;
  margin-top: 1px;
  margin-bottom: 200px;
  padding: 10px;
`

export const EditButtonLabel = styled.Text`
  color: ${colors.headerRed};
  font-weight: 700;
  font-size: 15px;
`
export const ShoppingListButton = styled.TouchableOpacity`
  background-color: ${colors.headerRed};
  width: 100%;
  border-radius: 10px;
  align-items: center;
  padding: 15px;
`
export const AddProductButton = styled.TouchableOpacity`
  background-color: ${props => props.color || '#0782F9'};
  width: 100%;
  border-radius: 10px;
  align-items: center;
  padding: 10px;
`
export const DecreaseProduct = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`