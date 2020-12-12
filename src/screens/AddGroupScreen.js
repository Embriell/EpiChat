import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Alert, Text} from 'react-native'
import CustomTextField from '../components/CustomTextField'
import Button from '../components/Button'
import Colors from '../utils/Colors'
import Strings from '../const/Strings'
import Utility from '../utils/Utility'
import firebase, {firestore} from '../firebase/Firebase'

function AddGroupScreen({navigation}) {

    const [groupName, setGroupName] = useState('')
    const [fieldError, setFieldError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const ValidateField = () => {
        const isValidField = Utility.isValidField(groupName)
        isValidField ? setFieldError('') : setFieldError(Strings.GroupNameEmpty)
        return isValidField
    }

    function CreateGroupToFirebase() {
        setIsLoading(true)
        const groupsRef = firestore.collection("groups").doc()
        const userID = firebase.auth().currentUser.uid
    
        groupsRef.set({
            groupID: groupsRef.id,
            groupName: groupName,
            userID: userID,
        }).then(function (docRef) {
            setIsLoading(false)
            console.log('Document written with ID: ', groupsRef.id)
            AddMembersOfChatToFireBase(groupsRef.id, userID)
        }).catch(function (error) {
            Alert.alert(error.message)
            setIsLoading(false)
            console.error('Error adding document ', error)
        })
    }

    function AddMembersOfChatToFireBase(groupID, userID) {
        const membersRef = firestore.collection("members").doc(groupID).collection("members").doc()
        membersRef.set({
            userID: userID
        }).then(function(docRef) {
            navigation.goBack()
        }).catch(function (error) {
            setIsLoading(false)
            console.error('Error adding document: ', error)
        })
    }

    const PerformCreateGroup = () => {
        const isValidField = ValidateField()
        if (isValidField) {
            CreateGroupToFirebase()
        }
    } 

    return(
        <View style={styles.container}>
            <CustomTextField
                term={groupName}
                error={fieldError}
                placeHolder={Strings.EnterYourGroupName}
                onTermChange={newGroupName => setGroupName(newGroupName)}
                onValidateTextField={ValidateField}
            />
            <Button title={Strings.createGroup} onPress={PerformCreateGroup} isLoading={isLoading}/>
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    text: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
    },
});

export default AddGroupScreen;