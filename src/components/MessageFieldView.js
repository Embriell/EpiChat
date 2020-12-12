import React from 'react'
import {StyleSheet, View, Text, TextInput, Button} from 'react-native'
import Colors from '../utils/Colors'
import Constants from '../const/Constants'
import Strings from '../const/Strings'

const MessageFieldView = ({term, placeHolder, onTermChange, onValidateTextField, error, onSubmit, isJoined}) => {
    return (
        <View style={styles.containerView}>
            <View style={styles.fieldView}>
                <TextInput
                    autoCorrect={true}
                    style={styles.textField}
                    placeholder={placeHolder}
                    placeholderTextColor={Colors.gray}
                    value={term}
                    onChangeText={onTermChange}
                    onEndEditing={onValidateTextField}
                />
                <Button title={Strings.Send} color={Colors.white} onPress={onSubmit}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerView: {
      backgroundColor: Colors.white,
      width: Constants.screenWidth,
      flex: 1,
      justifyContent: 'space-between',
    },

    fieldView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.uaStudiosGreen
    },

    textField: {
        fontSize: 14,
        flex: 1,
        marginRight: 10,
        paddingLeft: 10,
        width: '75%',
        borderColor: Colors.gray,
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: Colors.smoke
    },

    button: {
        flex: 1,
        alignSelf: 'center',
        fontWeight: 'bold',
        width: '25%',
        height: '100%'
    },
});

export default MessageFieldView;