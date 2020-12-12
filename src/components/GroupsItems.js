import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import Colors from '../utils/Colors'
import Images from '../const/Images'
import Constants from '../const/Constants'

function GroupsItems({item}) {
    return(
        <View>
            <View style={styles.container}>
                <Image style={styles.Image} source={Images.groups}/>
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.groupTitle}>{item.groupName}</Text>
                    <Text style={styles.groupMembers}>{item.groupMembers}</Text>
                </View>
            </View>
                    <View style={styles.separator}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      height: 50,
      width: Constants.screenWidth,
      margin: 10
    },

    descriptionContainer: {
        margin: 5
    },

    Image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        shadowColor: Colors.gray,
        shadowOffset: {height: 1, width: 1},
        shadowRadius: 2,
        backgroundColor: Colors.theme
    },

    groupTitle: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 10
    },

    groupMembers: {
        color: Colors.smoke,
        fontSize: 14,
    },

    separator: {
        height: 0.5,
        width: Constants.width,
        backgroundColor: Colors.theme
    }
});

export default GroupsItems;