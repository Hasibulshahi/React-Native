import React from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { ItemCard } from '../components/ItemCard';
import { useItemViewModel } from '../viewmodels/ItemViewModel';

export const VisitedScreen = () => {
  const { items, isLoading, toggleVisited } = useItemViewModel();

  // Filter items with visited = true
  const visitedItems = items.filter((item) => item.visited);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (visitedItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No visited items found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={visitedItems}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ItemCard item={item} onToggleVisited={toggleVisited} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});
