import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

export const ItemDetailsScreen = ({ route, navigation }) => {
  const { item } = route.params; // Access the item passed from the previous screen

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>

      {/* Add Image component with additional debugging */}
      {item.imageLink ? (
        <Image
          source={{ uri: item.imageLink }}
          style={styles.image}
          resizeMode="contain"
          onError={(e) => console.log("Image failed to load: ", e.nativeEvent.error)}
        />
      ) : (
        <Text style={styles.noImageText}>No image available</Text>
      )}

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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
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
  image: {
    width: 300, // Adjust the size to fit your layout
    height: 200,
    marginBottom: 16,
  },
  noImageText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
});
