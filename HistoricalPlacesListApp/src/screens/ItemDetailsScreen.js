import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

export const ItemDetailsScreen = ({ route, navigation }) => {
  const { item } = route.params; // Access the item passed from the previous screen

  return (
    <View style={styles.container}>
      <View style={styles.topContainerLeft}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.visitedStatus}> 
          Visited: {item.visited ? 'Yes' : 'No'}
        </Text>
      </View>
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
      

      {/* <Button title="Back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left'
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  visitedStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 5,
  },
  image: {
    width: 350, // Adjust the size to fit your layout
    height: 250,
  },
  noImageText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  topContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5
  },
});
