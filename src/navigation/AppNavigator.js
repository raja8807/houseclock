import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import SplashScreen from '../components/screens/Splash/SplashScreen';
import LoginScreen from '../components/screens/Login/LoginScreen';
import HomeSetupScreen from '../components/screens/HomeSetup/HomeSetupScreen';
import BottomTabs from './BottomTabs';
import ItemDetailScreen from '../components/screens/ItemDetail/ItemDetailScreen';
import AddMaintenanceScreen from '../components/screens/AddMaintenance/AddMaintenanceScreen';
import AddItemScreen from '../components/screens/AddItem/AddItemScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            >
                {/* Auth Flow */}
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="HomeSetup" component={HomeSetupScreen} />

                {/* Main App */}
                <Stack.Screen name="Main" component={BottomTabs} />

                {/* Screens that hide tabs */}
                <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
                <Stack.Screen name="AddItem" component={AddItemScreen} />
                <Stack.Screen name="AddMaintenance" component={AddMaintenanceScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
