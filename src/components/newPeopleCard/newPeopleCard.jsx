import { useState, useLayoutEffect } from "react";
import axios from "axios";
import { View, Text, Dimensions, Image, ActivityIndicator } from "react-native";
import styled from "styled-components";
import Carousel from "react-native-snap-carousel";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../../utility/utilities";
import { conversationActions } from "../../store/conversation/conversation";

const NewPeopleWrapper = styled(View)`
flex:1;
padding-top:80px;
align-items:center;
`
const NewPeopleCardContainer = styled(View)`
border:white;
height:350px;
width:280px;
border-radius:20px;
margin:0px;
align-items:center;
align-self:center;
background:rgba(1,1,1,0.6)
`

const NewPeopleProfile = styled(Image)`
height:100px;
width:100px;
margin-top:20px;
border-radius:100px;
`

const NewPeopleInformation= styled(View)`
border-radius:20px;
margin-top:30px;
padding:30px;
background:white;
height:180px;
width:250px;
align-items:center;
`
const TextHeader = styled(Text)`
font-size:20px;
font-weight:bold
`

const MessageButton = styled(TouchableOpacity)`
align-items:center;
background:white;
width:100px;
border:black;
padding:10px;
border-radius:20px;
`

const SLIDER_WIDTH = Dimensions.get('window').width


const CardContainer = (item,index,navigation,conversationDispatch) => {
    return (
        <NewPeopleCardContainer>
            <NewPeopleProfile
                    source={{
                        uri: item.photourl,
                    }}
                />
                <NewPeopleInformation>
                    <TextHeader>{item.name.split(" ")[0]}</TextHeader>
                    <Text style={{marginBottom:20,fontSize:10}}>{item.email}</Text>
                    <MessageButton onPress={() => {
                        conversationDispatch(conversationActions.setConversationId(null))
                        navigation.navigate('Message',{conversation_id:null,user:item.user_id,photourl:item.photourl})
                    } }><Text>Message</Text></MessageButton>
                </NewPeopleInformation>
        </NewPeopleCardContainer>
    )
}
export const NewPeopleCard = ({navigation}) => {
    const userId = useSelector(state => state.user.userData.uid)
    const unconversedUsers=useSelector(state => state.conversation.unconversedUsers)
    const conversationDispatch=useDispatch()
    const [loading,setLoading]=useState(true)
    useLayoutEffect(() => {
        axios.post(`${API_URL}/user/getUnconversedUsers`, { userId: userId })
            .then(response => {
                conversationDispatch(conversationActions.setUnconversedUsers(response.data))
                setLoading(false)
            })
    }, [userId])
    if(!loading)
    return (
        <NewPeopleWrapper style={{justifyContent:"center"}}>
            <Carousel
                layout={'default'}
                data={unconversedUsers}
                renderItem={({item,index}) => CardContainer(item,index, navigation,conversationDispatch)}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={280}
            />
        </NewPeopleWrapper>
    )
    if(loading){
        <ActivityIndicator size="large" color="#0000ff" />
    }
}