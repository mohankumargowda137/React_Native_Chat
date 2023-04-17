import Icon from "react-native-vector-icons/SimpleLineIcons"
import { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { MessageDashboard } from "../../components/messageDashboard/messageDashboard";
import { TouchableOpacity } from "react-native";
import { NewPeopleCard } from "../../components/newPeopleCard/newPeopleCard";
import { SignOut } from "../../services/googleAuthentication/googleAuthentication";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user/userSlice';
import axios from "axios";
import { conversationActions } from "../../store/conversation/conversation";
import { API_URL } from "../../utility/utilities";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from "react";
import AwesomeAlert from 'react-native-awesome-alerts';




export const Home = ({ navigation }) => {
    const [showAlert, setShowAlert] = useState(false)
    const userDispatch = useDispatch();
    const conversationDispatch = useDispatch();
    const userId = useSelector(state => state.user.userData.uid)
    useEffect(() => {
        axios.post(`${API_URL}/user/getUserConversations`, { userId: userId })
            .then(response => {
                conversationDispatch(conversationActions.setConversedUsers(response.data))
            })
    },[])
    useFocusEffect(
        useCallback(() => {
            const messageUpdates = setInterval(() => {
                axios.post(`${API_URL}/user/getUserConversations`, { userId: userId })
                    .then(response => {
                        conversationDispatch(conversationActions.setConversedUsers(response.data))
                    })
            }, 10000)
            return () => {
                clearInterval(messageUpdates)

            };
        }, [])
    );
    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={['#4c669f', 'brown', '#192f6a']}
            start={{ x: 0.6, y: 1 }}
            end={{ x: 0., y: 0.4 }}
        >
            <TouchableOpacity onPress={() => {
                setShowAlert(true)

            }}>
                <Icon style={{ padding: 20, alignSelf: "flex-end" }} name="logout" size={30} color="white" />
            </TouchableOpacity>
            <MessageDashboard navigation={navigation} />
            <NewPeopleCard navigation={navigation} />

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Do you want to Logout?"
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                confirmText="No"
                confirmButtonColor="pink"
                cancelText="Yes"
                cancelButtonColor="cyan"
                onCancelPressed={() => {
                    SignOut();
                    userDispatch(userActions.logout())
                    setShowAlert(false)
                }}
                onConfirmPressed={() => {
                    setShowAlert(false)
                }}
            />
        </LinearGradient>
    )
}