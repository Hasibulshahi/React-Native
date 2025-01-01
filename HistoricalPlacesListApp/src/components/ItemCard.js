import React from 'react';
import { View, Text, StyleSheet, Switch, Image } from 'react-native';

export const ItemCard = ({ item, onToggleVisited }) => {
  const toggleSwitch = () => {
    onToggleVisited(item.id, !item.visited);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.imageLink }} 
          style={styles.image} 
          resizeMode="cover" 
        />
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Visited</Text>
        <Switch
          value={item.visited}
          onValueChange={toggleSwitch}
          thumbColor={item.visited ? '#6200EE' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    alignItems: 'flex-start',
    marginRight: 10,
  },
  image: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    borderRadius: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'left',
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 8,
  },
});
