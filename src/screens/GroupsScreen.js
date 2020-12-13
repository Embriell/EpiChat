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
                    console.log("New group: ", change.doc.data())
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

    // function ShowEmptyGroupsAnim() {
    //     return (
    //         <View style={{width: '100%', height: '100%'}}>
    //             <LottieView source={require('../../assets/empty-groups-chat.json')} autoPlay loop></LottieView>
    //         </View>
    //     );
    // }

    function ShowGroupsSearch() {

        var groupsSearch = []
    
        for (var i = 0; i < groups.length; i++) {
            if (groups[i].groupName.includes(search)) {
                groupsSearch.push(groups[i])
            }
        }
        console.log("groupSearch:", groupsSearch)
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
            </View>
        );
    }

    function ShowGroupsView() {
        console.log("groups.length =", groups.length)
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
            </View>
        );
    }

    return (
        // isDataLoaded ? ShowEmptyGroupsAnim() :

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