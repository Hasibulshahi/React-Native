import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ItemListView } from '../views/ItemListView'; 

export const SuggestionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ItemListView navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});