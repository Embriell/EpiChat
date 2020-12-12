import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import Constants from '../const/Constants'
import Images from '../const/Images'
import Colors from '../utils/Colors'
import firebase, {firestore} from '../firebase/Firebase'
import Button from '../components/Button'
import Strings from '../const/Strings'

const MessagesItems = ({item}) => {

    const userID = firebase.auth().currentUser.uid
    console.log("senderEmail =", item.senderEmail)

    function MessageView() {
        if (userID === item.senderID) {
            return (
                <View style={styles.othersMessageContainerView}>
                    <Text style={[styles.senderName, {textAlign: 'right'}]}>{item.senderEmail}</Text>
                    <Text style={[styles.message, {textAlign: 'right'}]}>{item.message}</Text>
                </View>
            );
        }
        else {
            return (
                <View style={styles.myMessageContainerView}>
                    <Text style={[styles.senderName, {textAlign: 'left'}]}>{item.senderEmail}</Text>
                    <Text style={[styles.message, {textAlign: 'left'}]}>{item.message}</Text>
                </View>
            );
        }
    }

    return (
        MessageView()
    );

}

const styles = StyleSheet.create({
    othersMessageContainerView: {
      width: Constants.screenWidth - 50,
      backgroundColor: Colors.gray,
      borderRadius: 5,
      marginLeft: 25,
      marginTop: 5,
      marginBottom: 5,
      padding: 10
    },

    myMessageContainerView: {
      width: Constants.screenWidth -50,
      backgroundColor: Colors.gray,
      borderRadius: 5,
      margin: 5,
      padding: 10
    },

    senderName: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold'
    },

    message: {
        color: Colors.white,
        fontSize: 14,
    },
});

export default MessagesItems;