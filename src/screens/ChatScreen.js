import React, {useState, useEffect, useCallback} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, Alert, Button} from 'react-native'
import firebase, {firestore} from '../firebase/Firebase'
import MessageFieldView from '../components/MessageFieldView'
import MessagesItems from '../components/MessagesItems'
import Strings from '../const/Strings'
import DismissKeyboard from '../components/DismissKeyboard'
import { GiftedChat } from 'react-native-gifted-chat'

function ChatScreen({route, navigation}) {

    const [messageList, setMessageList] = useState([])
    const [message, setMessage] = useState('')
    const [isJoined, setIsJoined] = useState(false)

    const {item} = route.params
    const userID = firebase.auth().currentUser.uid

    navigation.setOptions({
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'rgb(31, 189, 251)'
        },

        headerRight:() => (
        <Text style={styles.nameGroup} >channel: {item.groupName}</Text>
        ),
    })

    useEffect(() => {
        console.log(item)
        GetUserJoinedAlreadyOrNot()
        GetMessages()
    }, [])

    function GetUserJoinedAlreadyOrNot() {
        firestore.collection("members").doc(item.groupID).collection("member").where("userID", "==", userID)
        .get().then(function (querySnapshot) {
            if (querySnapshot.size > 0) {
                querySnapshot.forEach(function (doc) {
                    if (doc.data() != null) {
                        setIsJoined(true)
                    }
                    else {
                        setIsJoined(false)
                        ShowAlertToJoinGroup()
                    }
                })
            }
            else {
                ShowAlertToJoinGroup()
            }
        }).catch(function (error) {
            console.log("Error getting documents:", error)
        })
    }

    function ShowAlertToJoinGroup() {
        if (!isJoined) {
            Alert.alret(
                Strings.joinChat,
                Strings.joinChatConfirm,
                [{
                    text: 'Yes', onPress: () => {
                        JoinGroup()
                    }
                }, {
                    text: 'No', onPress: () => {
    
                    }
                }
            ],
            {cancelable: false}
            )
        }
    }

    function JoinGroup() {
        const groupMemberRef = firestore.collection("members").doc(item.groupID).collection("member").doc()
        groupMemberRef.set({
            userID: userID
        }).then(function (docRef) {
            setIsJoined(true)
            Alert.alert(Strings.joinMessage)
            setMessage('')
        }).catch(function (error) {
            setIsJoined(false)
            Alert.alert(Strings.joinGroupError)
        })
    }

    function GetMessages() {
        const db = firebase.firestore()
        var messages = []
        db.collection("message").doc(item.groupID).collection("messages").orderBy("createdAt", "asc")
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    // console.log("New message", change.doc.data())
                    messages.push(change.doc.data())
                }
                if (change.type === "modified") {
                    console.log("Modified message: ", change.doc.data())
                }
                if (change.type === "removed") {
                    console.log("Removed message: ", change.doc.data())
                }
                setMessageList(messages)
            })
        })
    }

    function SendMessagesToChat() {

        const timestamp = firebase.firestore.FieldValue.serverTimestamp;
        var date = new Date(timestamp * 1000);
        console.log("offsetref:", date)
        const messageRef = firestore.collection("message").doc(item.groupID).collection("messages").doc()
        const userEmail = firebase.auth().currentUser.email

        messageRef.set({
            messageID: messageRef.id,
            message: message,
            senderID: userID,
            senderEmail: userEmail,
            createdAt: timestamp(),
        }).then(function (docRef) {
            console.log("Document written with ID", messageRef.id)
            setMessage('')
        }).catch(function (error) {
            Alert.alert(error.message)
            console.log("Error", error)
        })
    }

    return(
        <DismissKeyboard>
            <KeyboardAvoidingView style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}} behavior='padding' enabled keyboardVerticalOffset={100}>
                <View style={styles.container}>
                    <FlatList style={styles.flatList} 
                        data={messageList}
                        keyExtractor={(item, index) => 'key' + index}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity onPress={() => {

                                }}>
                                    <MessagesItems item={item}/>
                                </TouchableOpacity>
                            );
                        }}/>
                        <View style={styles.messageFieldView}>
                            <MessageFieldView term={message}
                                placeHolder={Strings.TextMessage}
                                onTermChange={message => setMessage(message)}
                                onSubmit={SendMessagesToChat}
                            >
                            </MessageFieldView>
                        </View>
                </View>
            </KeyboardAvoidingView>
        </DismissKeyboard>
    );
} 

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    },

    flatList: {
        marginBottom: 5,
        flex: 0.9,

    },

    nameGroup:{
        color: 'red',
        paddingRight: 15,
        marginTop: 23,
        fontSize: 18
    },

    messageFieldView: {
        flex: 0.07
    },
});

export default ChatScreen;