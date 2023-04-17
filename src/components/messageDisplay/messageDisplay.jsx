import { useContext, useEffect, useRef } from "react";
import { View, Text, Dimensions, FlatList, BackHandler } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MessageContext } from "../../screens/messaging/messaging";
import { db } from "../../../firebase";
import { ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import { conversationActions } from "../../store/conversation/conversation";

const OutboundMessage = styled(View)`
    background:#FFD580;
    padding:10px 20px 10px 20px;
    border-radius:20px;
    align-self:flex-end;
    ${"max-width:" + Dimensions.get('window').width * 0.7 + "px;"}
    margin:5px;
    `
const InboundMessage = styled(View)`
    background:grey;
    padding:10px 20px 10px 20px;
    border-radius:20px;
    align-self:flex-start;
    ${"max-width:" + Dimensions.get('window').width * 0.7 + "px;"}
    margin:5px;
    `
const MessageText = styled(Text)`
    font-size:18px;
    `
const Message = ({ messageDetails, userId }) => {
    if (messageDetails.sender === userId)
        return (
            <OutboundMessage>
                <MessageText>{messageDetails.message}</MessageText>
            </OutboundMessage>
        )
    else
        return (
            <InboundMessage>
                <MessageText style={{ color: "white" }}>{messageDetails.message}</MessageText>
            </InboundMessage>
        )
}
export const MessageDisplay = () => {
    const userId = useSelector(state => state.user.userData.uid);
    const conversationDispatch = useDispatch()
    const conid=useSelector(state => state.conversation.conversationId)
    BackHandler.addEventListener('hardwareBackPress',()=>{
        conversationDispatch(conversationActions.loadMessages({}))
    })
    const flatList = useRef(null)
    useEffect(() => {
        if(conid!=null)
        {
        const messageFlow = ref(db, `/${conid}`);
        onValue(messageFlow, (snapshot) => {
            const data = snapshot.val();
            const messages=Object.keys(data).map(key=>({
                id:key,
                ...data[key]
            }))
            conversationDispatch(conversationActions.loadMessages(messages))
        });
        }
    },[conid])
    const message=useSelector(state=>state.conversation.messages)

    return (
        <>
        {message.length>0 && <FlatList
                data={message}
                renderItem={({ item }) => <Message messageDetails={item} userId={userId} />}
                ref = {flatList}
                onContentSizeChange={()=> flatList.current.scrollToEnd()} 
            />}
        </>
    )
}