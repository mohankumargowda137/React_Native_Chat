import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import axios from "axios";
import { API_URL } from "../../utility/utilities";
GoogleSignin.configure({
  webClientId:
    "173224929022-alomdu9fk32rnfhdmujf1hskr628pc40.apps.googleusercontent.com"
});

export const SignInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  const user_sign_in = await auth().signInWithCredential(googleCredential);
  const userData = {
    name: user_sign_in.user.displayName,
    email: user_sign_in.user.email || "",
    photoURL: user_sign_in.user.photoURL,
    provider: user_sign_in.user.providerData[0].providerId,
    uid: user_sign_in.user.uid,
    idToken: idToken
  };
  const userLoginRecord = axios.post(`${API_URL}/user/authenticatedUser`, userData);
  const res = await userLoginRecord;
  if (res.error) 
  throw res.error
  return userData;
};

export const SignOut = () => {
  auth()
    .signOut();
};
