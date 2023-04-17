import { createContext } from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";
import Icon from "react-native-vector-icons/AntDesign";
import { MessageBox } from "../../components/messageBox/messageBox";
import { MessageDisplay } from "../../components/messageDisplay/messageDisplay";
import React from "react";
import { useDispatch } from "react-redux";
import { conversationActions } from "../../store/conversation/conversation";
import axios from "axios";
import { API_URL } from "../../utility/utilities";
export const MessageContext = createContext(null)

const NewPeopleProfile = styled(Image)`
height:80px;
width:80px;
margin-top:-30px;
border-radius:100px;
align-self:center;
`

const MessageContainer = styled(View)`
flex:1;
margin-top:10px;
background:rgba(1,1,1,0.6);
border-top-left-radius:20px;
border-top-right-radius:20px;
`


export const Messaging = ({ navigation, route }) => {
    const { conversation_id, photourl, user } = route.params
    const conversationDispatch = useDispatch()
    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={['#4c669f', 'brown', '#192f6a']}
            start={{ x: 0.6, y: 1 }}
            end={{ x: 0., y: 0.4 }}
        >
            <TouchableOpacity>
                <Icon style={{ padding: 20, alignSelf: "flex-start" }} name="arrowleft" size={30} color="white" onPress={() => {
                    conversationDispatch(conversationActions.loadMessages([]))
                    navigation.navigate('Home')
                }} />
            </TouchableOpacity>
            <MessageContainer>
                <NewPeopleProfile
                    source={{
                        uri: photourl,
                    }}
                />
                <MessageContext.Provider value={{ conversation_id, photourl, user }}>
                    <View style={{ flex: 1 }}>
                        <MessageDisplay />
                    </View>
                    <MessageBox />
                </MessageContext.Provider>
            </MessageContainer>
        </LinearGradient>
    )
}