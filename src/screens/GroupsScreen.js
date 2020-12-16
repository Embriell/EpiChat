import React, {useLayoutEffect, useState, useEffect} from 'react'
import {StyleSheet, View, Text, FlatList, TouchableOpacity, Alert} from 'react-native'
import ButtonWithBackground from '../components/ButtonWithBackground'
import Images from '../const/Images'
import GroupsItems from '../components/GroupsItems'
import firebase, {firestore} from '../firebase/Firebase'
import LottieView from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient'
import Constants from '../const/Constants'
import SearchBar from '../components/SearchBar'
import Strings from '../const/Strings'
import FooterTabGroups from '../components/FooterTabGroups'
import FooterTabMessages from '../components/FooterTabMessages'

function GroupsScreen({navigation}) {

    const [groups, setGroups] = useState([])
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [search, setSearch] = useState('')
    const isSearch = search.length > 0;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'rgb(31, 189, 251)'
            },

            headerRight:() => (
                <ButtonWithBackground onPress={() => {
                    navigation.navigate('AddGroupScreen')
                }}
                image={Images.add}
                />
            ),
            headerLeft:() => (
                <ButtonWithBackground onPress={() => {
                    SignOutUser()
                }}
                image={Images.logout}
                />
            ),
        })
    })

    const SignOutUser = async () => {
        try {
            await firebase.auth().signOut()
            navigation.reset({
                index: 0,
                routes: [{name: "SplashScreen"}]
            })
        }catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getChats()
    }, [])

    function getChats() {
        const db = firestore
        var groupsArray = []

        db.collection("groups")
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                // setIsDataLoaded(true)
                if (change.type == "added") {
                    // console.log("New group: ", change.doc.data())
                    groupsArray.push(change.doc.data())
                }
                if (change.type == "modified") {
                    console.log("Modified group: ", change.doc.data())
                }
                if (change.type == "removed") {
                    console.log("Removed group: ", change.doc.data())
                }
                setGroups(groupsArray)
            })
        })
    }

    function GoToGroupsScreen() {
        navigation.navigate("GroupsScreen")
    }

    function GoToMessageScreen() {
        const item = groups
        navigation.navigate('PrivateMessagesScreen', {item})
    }

    function ShowGroupsSearch() {

        var groupsSearch = []
    
        for (var i = 0; i < groups.length; i++) {
            if (groups[i].groupName.includes(search)) {
                groupsSearch.push(groups[i])
            }
        }
        return (
            <View style={styles.container}>
                <View style={styles.containerSearchbar}>
                    <SearchBar 
                        placeHolder={Strings.Search}
                        value={search}
                        onTermChange={newSearch => setSearch(newSearch)}
                    />
                </View>
                <FlatList 
                    data={groupsSearch}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('ChatScreen', {item})
                            }}>
                                <GroupsItems item={item}>
    
                                </GroupsItems>
                            </TouchableOpacity>
                        );
                    }}
                >
                </FlatList>
                <View style={styles.footerTab}>
                    <View style={styles.fieldView}>
                        <FooterTabGroups onGroups={GoToGroupsScreen}/>
                        <FooterTabMessages onMessages={GoToMessageScreen}/>
                    </View>
                </View>
            </View>
        );
    }

    function ShowGroupsView() {
        return(
            <View style={styles.container}>
                <View style={styles.containerSearchbar}>
                    <SearchBar 
                        placeHolder={Strings.Search}
                        value={search}
                        onTermChange={newSearch => setSearch(newSearch)}
                    />
                </View>
                <FlatList 
                    data={groups}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('ChatScreen', {item})
                            }}>
                                <GroupsItems item={item}>
    
                                </GroupsItems>
                            </TouchableOpacity>
                        );
                    }}
                >
                </FlatList>
                <View style={styles.footerTab}>
                    <View style={styles.fieldView}>
                        <FooterTabGroups onGroups={GoToGroupsScreen}/>
                        <FooterTabMessages onMessages={GoToMessageScreen}/>
                    </View>
                </View>
            </View>
        );
    }

    return (
        !isSearch ? ShowGroupsView() : ShowGroupsSearch()
    );
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },

    footerTab: {
        width: Constants.screenWidth,
        height: 55,
        backgroundColor: 'rgb(31, 189, 251)'
    },

    fieldView: {
        flex: 1,
        flexDirection: 'row',
        borderRightColor: "black",
    },

    containerSearchbar: {
        backgroundColor: 'rgb(31, 189, 251)',
        width: Constants.screenWidth,
        height: 46,
    },

    text: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default GroupsScreen;