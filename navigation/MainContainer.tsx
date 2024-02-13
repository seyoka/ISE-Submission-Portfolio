import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, Text } from 'react-native';
import {  StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';


import Svg, { Path } from 'react-native-svg';

// Screens
import ProfilePage from './ProfilePage';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import DetailsScreen from './DetailsScreen';
import CustomButton from './CustomButton'; 
import tailwind from 'twrnc';


// Screen names
const homeName = 'Home';
const detailsName = 'Details';
const settingsName = 'Settings';
const profileName = 'Profile';

//Params becuase fearghal made me fucking use type script 
type RootStackParamList ={
  Home: undefined;
  Profile: undefined; 
}

//Another param list as fearghal made me use fucking type script 
type TabParamList={
  Home: undefined;
  Settings: undefined;
  Details: undefined;
  Profile: undefined;
}


const Tab = createBottomTabNavigator<TabParamList>();



export default function MainContainer() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Tab.Navigator 
          initialRouteName={homeName}
          screenOptions={({ route }:{route: RouteProp<TabParamList, keyof TabParamList> }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              type IconName = 'home' | 'home-outline' | 'list' | 'list-outline' | 'albums' | 'albums-outline' | 'person' | 'person-outline'; // Add more as needed
              let iconName: IconName | undefined; 

              let rn = route.name as keyof TabParamList;
              

              if (rn === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (rn === 'Settings') {
                iconName = focused 
                ? 'list' 
                : 'list-outline';
              } else if (route.name === 'Details') {
                iconName = focused 
                ? 'albums' 
                : 'albums-outline'; 
              } else if (route.name === 'Profile') {
                iconName = focused 
                ? 'person' 
                : 'person-outline'; 
              }

    
              return <Ionicons name={iconName} size={size} color={color}  style={tailwind`px-8 `}/>;
            },
            tabBarStyle:{
              backgroundColor: '#EEEEEE',
              padding: 10,
            },
            headerShown: false, 
            tabBarItemStyle:{
              marginHorizontal: 2,
            }
          })}
        >
          <Tab.Screen name={homeName} component={HomeScreen} />
          <Tab.Screen name={detailsName} component={DetailsScreen} />
          <Tab.Screen name={settingsName} component={SettingsScreen} />
          <Tab.Screen name={profileName} component={ProfilePage} />
        </Tab.Navigator>

       
        <View style={{
            position: 'absolute',
            bottom: 50,
            alignSelf: 'center',
            borderRadius: 40, // Set border radius to half of the width/height to make it a circle
            width: 80, // Adjust width and height as needed
            height: 80,
            backgroundColor: '#EEEEEE',
            justifyContent: 'center', // Center content horizontally
            alignItems: 'center', // Center content vertically
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.6,
            shadowRadius: 2,  
            elevation: 5
        }}>
            <TouchableOpacity
            style={{
            width: 60, // Adjust width and height of the inner circle
            height: 60,
            borderRadius: 30, // Set border radius to half of the width/height to make it a circle
            backgroundColor: '#0666FB',
            justifyContent: 'center', // Center content horizontally
            alignItems: 'center', // Center content vertically

            }}

            
            >
            <Svg width="30" height="30" viewBox='0 0 84 90' > 
                <Path
                d="M30 15C38.5229 15 45 21.4771 45 30V60C45 64.4183 48.5817 68 53 68C57.4183 68 61 64.4183 61 60V30C61 12.7676 47.2324 0 30 0C12.7676 0 0 12.7676 0 30V60C0 64.4183 3.58173 68 8 68C12.4183 68 16 64.4183 16 60V30C16 21.4771 22.4771 15 30 15ZM53 75C44.4771 75 38 68.5229 38 60V30C38 26.6863 34.3137 23 31 23C27.6863 23 24 26.6863 24 30V60C24 76.2086 37.7914 90 54 90C70.2086 90 84 76.2086 84 60V30C84 26.6863 80.3137 23 77 23C73.6863 23 70 26.6863 70 30V60C70 68.5229 63.5229 75 55 75Z"
                fill="white"
                stroke="white"
                strokeWidth="3" 
                />
            </Svg>
            </TouchableOpacity>
        </View>

      </View>
    </NavigationContainer>
  );
}

