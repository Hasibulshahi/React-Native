import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ItemListView } from '../views/ItemListView'; //'../components/ItemListView';

export const HomeScreen = ({ navigation }) => {
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
