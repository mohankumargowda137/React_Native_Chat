import { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, Image, ActivityIndicator, FlatList } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../../utility/utilities";
import { conversationActions } from "../../store/conversation/conversation";
import { useDispatch } from "react-redux";

const MessageDashboardWrapper = styled(View)`
height: 60px;
flex-direction:row;
background:white;
border-radius:60px;
padding:5px;
margin: 10px;
`

const MessageDashboardProfile = styled(Image)`
height:40px;
width:40px;
margin-top:5px;
border-radius:100px;
`
const ConversedUser = ({ data, navigation }) => {
    return (
        <>
            <TouchableOpacity style={{ marginRight: 10, marginLeft: 10 }} onPress={() => navigation.navigate('Message', { conversation_id: data.conversation_id, user: data.user, photourl: data.photourl })} key={data.user}>
                <MessageDashboardProfile
                    source={{
                        uri: data.photourl,
                    }}
                />
            </TouchableOpacity>
        </>

    )

}

export const MessageDashboard = ({ navigation }) => {

    const conversations = useSelector(state => state.conversation.conversedUsers)
    const [index,setIndex] = useState(0)
    const flatlist=useRef(null)
    useEffect(()=>{
        flatlist.current?.scrollToIndex({
            index,
            animated:true
        })
    },[index])

    return (
        <>
            {conversations.length > 0 &&
                <MessageDashboardWrapper>
                    <View style={{ flex: 0.2, height: 50, justifyContent: "center" }}>
                        <TouchableOpacity
                        disabled={(index==0)}
                         onPress={()=>setIndex(index - 1)}>
                            <Icon style={{ alignSelf: "flex-start" }} color={(index==0)?"grey":"black"} name="leftcircleo" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.6, height: 50, flexGrow: 1, justifyContent: "flex-start", flexDirection: "row" }}>
                        <FlatList
                            ref={flatlist}
                            horizontal={true}
                            data={conversations}
                            initialScrollIndex={0}
                            renderItem={({ item }) => <ConversedUser data={item} navigation={navigation} />}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}
                        />

                    </View>
                    <View style={{ flex: 0.2, height: 50, justifyContent: "center" }} >
                        <TouchableOpacity 
                        disabled={(index>=(conversations.length/4)-1)}
                        onPress={()=>setIndex(index+1)}>
                            <Icon style={{ alignSelf: "flex-end" }} color={(index>=(conversations.length/4)-1)?"grey":"black"} name="rightcircleo" size={30} />
                        </TouchableOpacity>
                    </View>
                </MessageDashboardWrapper>
            }
        </>
    )
}