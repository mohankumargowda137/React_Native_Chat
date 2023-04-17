import { useState, useEffect, useRef, useContext } from "react";
import { TextInput, TouchableOpacity, View, Keyboard } from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { sendMessage } from "../../services/getMessages/getMessages";
import { MessageContext } from "../../screens/messaging/messaging";
import { useSelector, useDispatch } from "react-redux";
import { conversationActions } from "../../store/conversation/conversation";

const CustomTextInput = styled(TextInput)`
background:white;
border-top-left-radius:20px;
border-bottom-left-radius:20px;
justify-content: center;
align-items: center;
flex:1;
padding:10px;
`

const KeyboardEmojiToggler = styled(TouchableOpacity)`
background:white;
border-top-right-radius:20px;
border-bottom-right-radius:20px;
justify-content:center;
padding-right:5px;
`


export const MessageBox = () => {
    const userId=useSelector(state=>state.user.userData.uid)
    const conversationDispatch=useDispatch()
    const {conversation_id,photourl,user} = useContext(MessageContext)
    conversationDispatch(conversationActions.setConversationId(conversation_id))
    const conid=useSelector(state=>state.conversation.conversationId)

    const [emojiToggler, setEmojiToggler] = useState(false);
    const [message,setMessage] = useState('')
    
    const messageInput=useRef(null)
    useEffect(() => {
        if (emojiToggler)
            Keyboard.dismiss()
        else
        messageInput.current.focus()
    }, [emojiToggler])

    const handleSendMessage=async()=>{
        if(message=='')
        return
        if(conid==null)
        {
            const data=await sendMessage(conid,userId,message,user);
            conversationDispatch(conversationActions.setConversationId(data.conversation_id))
            conversationDispatch(conversationActions.removeFromUnconversedUser({user:user,conversation_id:data.conversation_id,photourl:photourl}))
            setMessage('')
        }
        else{
            const data=await sendMessage(conid,userId,message,user);
            conversationDispatch(conversationActions.updateConversedUsersOrder({conversation_id:conversation_id,photourl:photourl,user:user}))
            setMessage('')
        }    
    }
    return (
        <>
            <View style={{ flexDirection: "row", margin: 10 }}>
                <CustomTextInput
                    editable
                    multiline
                    ref={messageInput}
                    value={message}
                    onChangeText={newText => setMessage(newText)}
                    
                />
                <KeyboardEmojiToggler onPress={() => {
                    setEmojiToggler(!emojiToggler)
                }
                } >
                    {!emojiToggler && <Icon style={{ alignSelf: "flex-start" }} name="emoji-emotions" size={30} color="grey" />}
                    {emojiToggler && <Icon style={{ alignSelf: "flex-start" }} name="keyboard" size={30} color="grey" />}
                </KeyboardEmojiToggler>
                <View style={{justifyContent:"center",margin:5,padding:5,backgroundColor:'#FFD580',borderRadius:100}} >
                    <TouchableOpacity onPress={()=>handleSendMessage()}>
                        <Icon  name="send" size={25} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            {
                (emojiToggler && <EmojiSelector
                    category={Categories.symbols}
                    columns ={9}
                    showSearchBar={false}
                    onEmojiSelected={emoji => setMessage(message+emoji)}
                />)
            }


        </>

    );
}