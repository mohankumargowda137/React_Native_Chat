import {
  TouchableOpacity,
  Platform,
  View,
  Text,
  StatusBar
} from "react-native";
import styled from "styled-components/native";
//  ${Platform.OS == "android" && "marginTop:" + StatusBar.currentHeight + "px;"}
export const Wrapper = styled(View)`

  flex:1;
`;

export const LoginButton = styled(TouchableOpacity)`
  padding: 15px;
  padding-left: 30px;
  background: white;
  width: 230px;
  margin: 5px;
  border-radius: 15px;
`;
export const LoginText = styled(Text)`
  font-size: 16px;
`;

export const API_URL='https://highon-backend.onrender.com';