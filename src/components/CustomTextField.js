import React from 'react'
import { TextInput, StyleSheet, Text, View } from 'react-native'
import Colors from '../utils/Colors'
import Constants from '../const/Constants'

const CustomTextField = ({ term, placeHolder, onTermChange, onValidateTextField, error }) => {

    const isEnabled = error.length > 0;

    return (
        <View>
            <Text style={styles.TextError}>{error}</Text>
            <View style={isEnabled ? styles.textFieldViewError : styles.textFieldView}>
                <TextInput
                    autoCorrect={false}
                    style={styles.TextField}
                    placeholder={placeHolder}
                    placeholderTextColor={Colors.gray}
                    value={term}
                    onChangeText={onTermChange}
                    onEndEditing={onValidateTextField}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    TextField: {
        fontSize: 14,
        flex: 1,
        marginHorizontal: 10,
    },

    textFieldView: {
        height: 45,
        width: Constants.screenWidth * 0.85,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#BAB7C3",
        borderRadius: 30,
        paddingHorizontal: 15,
        color: "#514E5A",
        fontWeight: "600",
        marginBottom: 10,
    },

    TextError: {
        fontSize: 12,
        color: Colors.red,
        marginHorizontal: 10,
        marginBottom: -10
    },

    textFieldViewError: {
        marginTop: 20,
        height: 45,
        width: Constants.screenWidth * 0.85,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'red',
        borderRadius: 30,
        paddingHorizontal: 15,
        color: "#514E5A",
        fontWeight: "600",
        marginBottom: 10,
    },
});

export default CustomTextField;