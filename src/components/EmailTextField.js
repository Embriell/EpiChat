import React from 'react'
import {TextInput, Text, StyleSheet, View} from 'react-native'
import Color from '../utils/Colors'
import Constants from '../const/Constants'

const EmailTextField = ({term, placeHolder, onTermChange, onValidateEmailAddress, error}) => {

    const isEnabled = error.length > 0;

    return (
        <View>
            <Text style={styles.textError}>{error}</Text>
            <View style={isEnabled ? styles.textFieldViewError : styles.textFieldView}>
                <TextInput
                    autoCorrect={false}
                    style={styles.textField}
                    placeholder={placeHolder}
                    placeholderTextColor={Color.gray}
                    value={term}
                    onChangeText={onTermChange}
                    onEndEditing={onValidateEmailAddress}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textField: {
        fontSize: 14,
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: 'white'
    },

    textFieldView: {
        marginTop: 20,
        height: 45,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#BAB7C3",
        borderRadius: 30,
        paddingHorizontal: 15,
        color: "#514E5A",
        fontWeight: "600",
        marginBottom: 10,
    },

    textFieldViewError: {
        marginTop: 20,
        height: 45,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'red',
        borderRadius: 30,
        paddingHorizontal: 15,
        color: "#514E5A",
        fontWeight: "600",
        marginBottom: 10,
    },

    textError: {
        fontSize: 12,
        color: Color.red,
        marginBottom: -15,
        marginTop: 10,
        marginHorizontal: 20
    }
});

export default EmailTextField;