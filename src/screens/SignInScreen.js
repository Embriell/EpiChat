import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Alert, SafeAreaView, Image, KeyboardAvoidingView} from 'react-native'
import Button from '../components/Button'
import Strings from '../const/Strings'
import EmailTextField from '../components/EmailTextField'
import PasswordTextField from '../components/PasswordTextField'
import DismissKeyboard from '../components/DismissKeyboard'
import Colors from '../utils/Colors'
import Images from '../const/Images'
import Constants from '../const/Constants'
import Utility from '../utils/Utility'
import firebase from '../firebase/Firebase'
import LinearGradient from 'react-native-linear-gradient'

function SignInScreen({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const ValidateEmailAddress = () => {
        const isValidEmail = Utility.isEmailValid(email)
        isValidEmail ? setEmailError('') : setEmailError(Strings.InvalidEmailAdress)
        return isValidEmail
    }

    const ValidatePasswordField = () => {
        const isValidField = Utility.isValidField(password)
        isValidField ? setPasswordError('') : setPasswordError(Strings.PasswordFieldEmpty)
        return isValidField
    }

    const performAUth = () => {
        const isValidEmail = ValidateEmailAddress()
        const isValidPassword = ValidatePasswordField()

        if (isValidEmail && isValidPassword) {
            setEmailError('')
            setPasswordError('')
            Registration(email, password)
        }
    }

    const Registration = (email, password) => {

        try {
            setIsLoading(true)
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                setIsLoading(false)
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'GroupsScreen'}]
                    })
                // Alert.alert("Logged In")
            }).catch((error) => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => {
                    setIsLoading(false)
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'GroupsScreen'}]
                        })
                    // Alert.alert("Create a new user")
                }).catch((error) => {
                    setIsLoading(false)
                    console.log('error')
                    Alert.alert(error.message)
                })
            })
        }
        catch(error){
            setIsLoading(false)
            Alert.alert(error.message)
        }
    }

    return(
        <DismissKeyboard>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <LinearGradient colors={['#3b4d61', 'rgb(31, 189, 251)']} start={[1, 3]} end={[0, 0]} style={styles.gradient_header}/>
            <Image style={styles.logo} source={Images.logo}></Image>
            <View style={styles.circle}/>
                <View>
                    <Text style={styles.text_log}>Login :</Text>
                    <SafeAreaView>
                        <EmailTextField
                            term={email}
                            error={emailError}
                            placeHolder={Strings.EmailPlaceHolder}
                            onTermChange={newEmail => setEmail(newEmail)}
                            onValidateEmailAddress={ValidateEmailAddress}
                        />
                        <PasswordTextField
                            term={password}
                            error={passwordError}
                            placeHolder={Strings.PasswordPlaceHolder}
                            onTermChange={newPassword => setPassword(newPassword)}
                            onValidatePasswordField={ValidatePasswordField}
                        />
                        <Button onPress={performAUth} isLoading={isLoading}/>
                    </SafeAreaView>
                </View>
            </KeyboardAvoidingView>
        </DismissKeyboard>
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

    logo: {
        alignSelf: 'center',
        position: 'absolute',
        width: 125,
        height: 30,
        top: 40,
        tintColor: 'white'
    },

    gradient_header: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '200%'
    },
    circle: {
        width: 600,
        height: 600,
        borderRadius: 600/ 2,
        backgroundColor: "#FFF",
        position: 'absolute',
        shadowColor: "grey",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 1,
            width: 1
          },
        top: 100,
        left: 10
    },

    text_log: {
        fontWeight: "700",
        fontSize: 30,
        color: "#514E5A",
        left: 5,
    },
});

export default SignInScreen;