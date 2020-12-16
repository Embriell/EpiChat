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
    // console.log("item.createAt.seconds: ", item.createdAt.seconds)
    // console.log("item.createAt.nanoseconds: ", item.createdAt.nanoseconds)

    function MessageView() {
        if (userID === item.senderID) {
            return (
                <View style={styles.othersMessageContainerView}>
                    <Text style={[styles.senderName, {textAlign: 'right'}]}>{item.senderEmail}</Text>
                    <Text style={[styles.message, {textAlign: 'right'}]}>{item.message}</Text>
                    <Text style={[styles.message, {textAlign: 'right'}]}></Text>
                </View>
            );
        }
        else {
            return (
                <View style={styles.myMessageContainerView}>
                    <Text style={[styles.senderName, {textAlign: 'left'}]}>{item.senderEmail}</Text>
                    <Text style={[styles.message, {textAlign: 'left'}]}>{item.message}</Text>
                    <Text style={[styles.message, {textAlign: 'left'}]}></Text>
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
      width: Constants.screenWidth - 140,
      backgroundColor: '#3b4d61',
      borderRadius: 20,
      marginLeft: 120,
      marginTop: 5,
      marginRight: 5,
      marginBottom: 5,
      padding: 10
    },

    myMessageContainerView: {
      width: Constants.screenWidth -140,
      backgroundColor: Colors.gray,
      borderRadius: 20,
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