import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Color from '../utils/Colors'

const Button = (props) => {
    const {title = 'Enter', style = {}, textStyle = {}, onPress, isLoading, invalid} = props;

    const loader = () => {
        return (
            <ActivityIndicator animating={isLoading}/>
        );
    }

    const button = () => {
        return (
            // <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            //     <Text style={[styles.text, textStyle]}>{title}</Text>
            // </TouchableOpacity>

            <TouchableOpacity onPress={onPress} style={[styles.button, style]} >
                <Text style={styles.textButton} >Go</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={[styles.button, style]}>
            {isLoading ? loader() : button()}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        backgroundColor: "rgb(93, 93, 170)",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: "rgb(93, 93, 170)",
        shadowOpacity: 0.4,
        shadowOffset: {height: 5, width: 5},
        shadowRadius: 15,
    },

    text: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: Color.white,
    },

    textButton: {
        fontSize: 20,
        color: Color.white,
    },
});

export default  Button;