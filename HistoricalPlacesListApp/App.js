import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppHeader } from './src/components/AppHeader';
import { HomeScreen } from './src/screens/HomeScreen';
import { ItemDetailsScreen } from './src/screens/ItemDetailsScreen';
import { SuggestionScreen } from './src/screens/SuggestionScreen';
import { NotVisitedScreen } from './src/screens/NotVisitedScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SuggestionStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ title: 'Item Details' }} />
    </HomeStack.Navigator>
  );
}

function SuggestionStackNavigator() {
  return (
    <SuggestionStack.Navigator>
      <SuggestionStack.Screen name="SuggestionScreen" component={SuggestionScreen} options={{ headerShown: false }} />
      <SuggestionStack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ title: 'Item Details' }} />
    </SuggestionStack.Navigator>
  );
}

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Home: {
        screens: {
          HomeScreen: 'home',
          ItemDetails: 'item/:id',
        },
      },
      Suggestion: {
        screens: {
          SuggestionScreen: 'suggestion',
          ItemDetails: 'item/:id',
        },
      },
      NotVisited: 'not-visited',
      Settings: 'settings',
    },
  },
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <NavigationContainer linking = {linking}>
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
          <Tab.Screen
            name="Home"
            component={HomeStackNavigator}
            listeners={({ navigation }) => ({
              tabPress: (e) => {
                e.preventDefault(); // Prevent default behavior
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }], // Reset to the HomeStackNavigator root
                });
              },
            })}
          />

          <Tab.Screen
            name="Suggestion"
            component={SuggestionStackNavigator}
            listeners={({ navigation }) => ({
              tabPress: (e) => {
                e.preventDefault(); // Prevent default behavior
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Suggestion' }], // Reset to the root of the SuggestionStackNavigator
                });
              },
            })}
          />
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
