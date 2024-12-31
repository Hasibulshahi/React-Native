import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export const ItemDetailsScreen = ({ route, navigation }) => {
  const { item } = route.params; // Access the item passed from the previous screen

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.visitedStatus}>
        Visited: {item.visited ? 'Yes' : 'No'}
      </Text>

      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  visitedStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 16,
  },
});
