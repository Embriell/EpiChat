import React, {useEffect} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import Colors from '../utils/Colors'
import Images from '../const/Images'
import Constants from '../const/Constants'
import firebase from '../firebase/Firebase'
import LottieView from 'lottie-react-native'

function SplashScreen({navigation}) {

    useEffect(() => {
        NavigateToAuthOrGroupScreen()
    },[navigation])

    function NavigateToAuthOrGroupScreen() {
        setTimeout(function () {
            firebase.auth().onAuthStateChanged((user) => {
                if (user != null) {
                    navigation.reset({
                        index: 0,
                        routes: [{name: "GroupsScreen"}]
                    })
                }
                else {
                    navigation.reset({
                        index: 0,
                        routes: [{name: "SignInScreen"}]
                    })
                }
            })
        }, 1800);
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={Images.logo}></Image>
            <View style={{width: '100%', height: 0.6 * Constants.screenHeight}}>
                <LottieView source={require('../../assets/chat-animation.json')} autoPlay loop></LottieView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    logo: {
        alignSelf: 'center',
        margin: 0.04 * Constants.screenHeight,
        height: 48,
        width: 200
    },

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.theme
    },

    text: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
    },
});

export default SplashScreen;