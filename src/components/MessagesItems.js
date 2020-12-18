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
    var date = new Date(item.createdAt * 1000)
    var year = new Date().getFullYear()
    
     var datevalues  = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getDate(),
        date.getMonth()+1,
     ];
    
    if (datevalues[0] >= 0 && datevalues[0] < 10) {
        datevalues[0] = "0"+datevalues[0]
    }
    if (datevalues[1] >= 0 && datevalues[1] < 10) {
        datevalues[1] = "0"+datevalues[1]
    }
    if (datevalues[2] >= 0 && datevalues[2] < 10) {
        datevalues[2] = "0"+datevalues[2]
    }

    var dateForm = datevalues[3] + "/" + datevalues[4] + "/" + year + " At: " + datevalues[0]+ ":" + datevalues[1] + ":" + datevalues[2];

    function MessageView() {
        if (userID === item.senderID) {
            return (
                <View>
                    <View style={styles.othersMessageContainerView}>
                        <Text style={[styles.senderName, {textAlign: 'right'}]}>{item.senderEmail}</Text>
                        <Text style={[styles.message, {textAlign: 'right'}]}>{item.message}</Text>
                    </View>
                        <Text style={[styles.hours, {textAlign: 'right'}]}>{dateForm}</Text>
                </View>
            );
        }
        else {
            return (
                <View>
                    <View style={styles.myMessageContainerView}>
                        <Text style={[styles.senderName, {textAlign: 'left'}]}>{item.senderEmail}</Text>
                        <Text style={[styles.message, {textAlign: 'left'}]}>{item.message}</Text>
                    </View>
                        <Text style={[styles.hours, {textAlign: 'left'}]}>{dateForm}</Text>
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

    hours: {
        color: 'black',
        top: 0,
        padding: 10,
        marginTop: -12,
        fontSize: 10,
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
        fontSize: 12,
        fontWeight: 'bold'
    },

    message: {
        color: Colors.white,
        fontSize: 14,
    },
});

export default MessagesItems;