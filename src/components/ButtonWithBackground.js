import React from 'react'
import {TouchableOpacity, StyleSheet, Image, View} from 'react-native'

const ButtonWithBackground = (props) => {
    const {style = {}, onPress, image} = props

    return (
        <View style={[styles.button, style]}>
            <TouchableOpacity onPress={onPress}>
                <Image
                source= {image}
                style={styles.ImagesIconStyle}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
      display: 'flex',
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },

    ImagesIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        tintColor: 'white'
    },
});

export default ButtonWithBackground;