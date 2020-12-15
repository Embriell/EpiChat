import React from 'react'
import {StyleSheet, View, Text, TextInput, Button, TouchableOpacity} from 'react-native'
import Colors from '../utils/Colors'
import Constants from '../const/Constants'
import Strings from '../const/Strings'

const FooterTabMessages = ({onMessages}) => {
    
    return (
        <View style={styles.fieldView}>
            <TouchableOpacity style={styles.button} color={Colors.white} onPress={onMessages}>
                <Text style={styles.buttonText}>Messages</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    buttonText: {
        color: 'white',
        fontSize: 15
    },

    fieldView: {
        flex: 1,
        flexDirection: 'row',
        borderRightColor: "black",
    },

    button: {
        flex: 1,
        alignItems: 'center',
        fontWeight: 'bold',
        width: '25%',
        height: '100%',
        borderColor: "white",
        borderBottomColor: 'rgb(31, 189, 251)',
        borderTopColor: 'grey',
        paddingTop: 15,
        borderWidth: 0.3,
    },
});

export default FooterTabMessages;