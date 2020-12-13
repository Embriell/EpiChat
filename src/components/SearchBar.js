import React from 'react'
import {TextInput, Text, StyleSheet, View} from 'react-native'
import Colors from '../utils/Colors'
import Constants from '../const/Constants'
import Ionicons from 'react-native-ionicons'

const SearchBar = ({term, placeHolder, onTermChange}) => {
    return (
        <View style={styles.textFieldView}>
            <Ionicons style={styles.searchIcon} name="ios-search" size={20} color="grey"/>
            <TextInput
                autoCorrect={false}
                style={styles.textField}
                placeholder={placeHolder}
                placeholderTextColor={Colors.gray}
                value={term}
                onChangeText={onTermChange}
            />
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
        height: 40,
        width: Constants.screenWidth * 0.95,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#BAB7C3",
        borderRadius: 30,
        paddingHorizontal: 15,
        color: "#514E5A",
        fontWeight: "600",
        marginTop: 3,
        backgroundColor: 'white',
        alignSelf: 'center',
        flexDirection: 'row'
    },

    searchIcon: {
        padding: 10,
    },
});

export default SearchBar;