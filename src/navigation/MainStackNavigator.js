import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import SignInScreen from '../screens/SignInScreen'
import GroupsScreen from '../screens/GroupsScreen'
import ChatScreen from '../screens/ChatScreen'
import AddGroupScreen from '../screens/AddGroupScreen'
import SplashScreen from '../screens/SplashScreen'

const Stack = createStackNavigator()

function ChatFlow() {
    return (
        <NavigationContainer>
            <Stack.Navigator name= "chat">
                <Stack.Screen name= "SplashScreen" component={SplashScreen} options = {{headerShown: false}}/>
                <Stack.Screen name= "SignInScreen" component={SignInScreen} options = {{headerShown: false}}/>
                <Stack.Screen name= "GroupsScreen" component={GroupsScreen} options = {{title: "Groups"}}/>
                <Stack.Screen name= "ChatScreen" component={ChatScreen} options = {{title:"Chats"}}/>
                <Stack.Screen name= "AddGroupScreen" component={AddGroupScreen} options = {{title: "Add Group"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function MainStackNavigator() {
    return(
        ChatFlow()
    );
}

export default MainStackNavigator;