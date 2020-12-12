import React from 'react'
import {TextInput, StyleSheet, Text, View} from 'react-native'
import Colors from '../utils/Colors'
import Constants from '../const/Constants'

const CustomTextField = ({term, placeHolder, onTermChange, onValidateTextField, error}) => {

    return (
        <View>
            <Text style={styles.TextError}>{error}</Text>
            <View style={styles.TextFieldView}>
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
        marginHorizontal: 20,
    },

    TextFieldView: {
        height: Constants.screenHeight * 0.06,
        width: Constants.screenWidth * 0.85,
        marginTop: 5,
        marginBottom: 10,
        borderColor: Colors.black,
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: Colors.smoke,
    },

    TextError: {
        fontSize: 12,
        color: Colors.red,
        marginBottom: -5,
        marginHorizontal: 20
    }
});

export default CustomTextField;