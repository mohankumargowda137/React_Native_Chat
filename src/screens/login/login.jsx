import { View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from "styled-components";
import { LinearGradient } from 'expo-linear-gradient';
import { LoginButton, LoginText } from "../../utility/utilities";
import { SignInWithGoogle } from '../../services/googleAuthentication/googleAuthentication';
import { SignInWithFacebook } from '../../services/facebookAuthentication/facebookAuthentication';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user/userSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const BackgroundWrapper = styled(View)`
flex:1;
justify-content:center;
align-items:center;
`;


export const Login = ({ navigation }) => {
    const userDispatch=useDispatch()
    const [loading,setLoading] = useState(false)
    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={['#4c669f', 'brown', '#192f6a']}
            start={{ x: 0.6, y: 1 }}
            end={{ x: 0., y: 0.4 }}
        >
            <BackgroundWrapper>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
                <LoginButton onPress={ () => {
                    setLoading(true)
                    const response=SignInWithGoogle();
                    response.then(user=>{
                        userDispatch(userActions.login(user))
                        setLoading(false)
                    })
                    .then()
                    .catch((error)=>{
                        setLoading(false)
                        userDispatch(userActions.loginerror(error))
                    })
                }}>
                    <LoginText><Icon name="google" size={20} />   Signup with Google</LoginText>
                </LoginButton>
                <LoginButton onPress={()=>{
                    setLoading(true)
                    const response=SignInWithFacebook();
                    response.then(user=>{
                        userDispatch(userActions.login(user))
                        setLoading(false)
                    })
                    .catch((error)=>{
                        setLoading(false)
                        userDispatch(userActions.loginerror(error))
                    })
                }}
                ><LoginText><Icon name="facebook" size={20} />   Signup with Facebook</LoginText></LoginButton>
            </BackgroundWrapper>
        </LinearGradient>
    )
}