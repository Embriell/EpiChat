import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';
import GroupsScreen from '../screens/GroupsScreen'
import PrivateMessages from '../screens/PrivateMessages'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Groups"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Groups"
        component={GroupsScreen}
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({ color, size }) => (
            <Icon ios="ios-albums" android="md-add" size={40} color="green"/>
            ),
        }}
      />
      <Tab.Screen
        name="My Messages"
        component={PrivateMessages}
        options={{
          tabBarLabel: 'My Messages',
          tabBarIcon: ({ color, size }) => (
            <Icon ios="ios-albums" android="md-add" size={40} color="green"/>
            ),
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;