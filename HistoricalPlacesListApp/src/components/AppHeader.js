import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AppHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Historical Places</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 30,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
