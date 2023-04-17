import auth from "@react-native-firebase/auth";

import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import axios from "axios";
import { API_URL } from "../../utility/utilities";

export const SignInWithFacebook = async () => {
  const result = await LoginManager.logInWithPermissions([
    "public_profile",
    "email"
  ]);

  if (result.isCancelled) {
    throw "User cancelled the login process";
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw "Something went wrong obtaining access token";
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken
  );

  // Sign-in the user with the credential
  const response=await auth().signInWithCredential(facebookCredential);
  const idToken=data.accessToken
  const userData = {
    name: response.user.displayName,
    email: response.user.email || "",
    photoURL: response.user.photoURL,
    provider: response.user.providerData[0].providerId,
    uid: response.user.uid,
    idToken: idToken
  };
  const userLoginRecord = axios.post(`${API_URL}/user/authenticatedUser`, userData);
  const res = await userLoginRecord;
  if (res.error) 
  throw res.error
  return userData
};
