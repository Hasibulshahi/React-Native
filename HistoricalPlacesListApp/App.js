import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppHeader } from './src/components/AppHeader';
import { HomeScreen } from './src/screens/HomeScreen';
import { ItemDetailsScreen } from './src/screens/ItemDetailsScreen';
import { VisitedScreen } from './src/screens/VisitedScreen';
import { NotVisitedScreen } from './src/screens/NotVisitedScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ title: 'Item Details' }} />
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              height: 60,
              paddingBottom: 5,
            },
            tabBarLabelStyle: {
              fontSize: 12,
            },
          }}
        >
          <Tab.Screen name="Home" component={HomeStackNavigator} />
          <Tab.Screen name="Visited" component={VisitedScreen} />
          <Tab.Screen name="Not Visited" component={NotVisitedScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
