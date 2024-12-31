import React from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ItemCard } from '../components/ItemCard'; //'../components/ItemCard';
import { useItemViewModel } from '../viewmodels/ItemViewModel' //'../viewmodels/ItemViewModel';

export const ItemListView = ({ navigation }) => {
  const { items, isLoading, toggleVisited } = useItemViewModel();

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ItemDetails', { item })} // Pass the item as a parameter
        >
          <ItemCard item={item} onToggleVisited={toggleVisited} />
        </TouchableOpacity>
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
});
