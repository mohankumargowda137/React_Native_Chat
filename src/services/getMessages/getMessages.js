import axios from "axios";
import { API_URL } from "../../utility/utilities";
import { db } from "../../../firebase";
import { ref,set,onValue, push } from "firebase/database";
import { conversationActions } from "../../store/conversation/conversation";
import { useDispatch } from "react-redux";

const sendMessage = async (conversation_id,userId,message,receiver) =>{
    if(conversation_id==null)
    {
        const createConversation=await axios.post(`${API_URL}/message/createConversation`,{user1:userId,user2:receiver})
        if(createConversation.data.message)
        {
            const conversationRef = ref(db, `${createConversation.data.conversation_id}`);
            const newConversationRef = push(conversationRef);
            set(newConversationRef, {
              message: message,
              sender: userId,
              datetime:new Date()
            });
            axios.post(`${API_URL}/message/updateLastMessage`,{conversationId:createConversation.data.conversation_id})
            return createConversation.data
        }
        else{
            const datetime=new Date();
            const conversationRef = ref(db, `${createConversation.data.conversation_id}`);
            const newConversationRef = push(conversationRef);
            set(newConversationRef, {
              message: message,
              sender: userId,
              datetime:datetime
            });
            axios.post(`${API_URL}/message/updateLastMessage`,{conversationId:createConversation.data.conversation_id})
            return createConversation.data
        }
        
    }
    else{
        const conversationRef = ref(db, `${conversation_id}`);
        const newConversationRef = push(conversationRef);
        set(newConversationRef,{
            message:message,
            sender:userId,
            datetime:new Date()
        })
        axios.post(`${API_URL}/message/updateLastMessage`,{conversationId:conversation_id})
    }
}


export {sendMessage}