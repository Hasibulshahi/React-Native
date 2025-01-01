import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaces } from '../viewmodels/redux_scripts/placesSlice';
import { ItemListView } from '../views/ItemListView';

export const SuggestionScreen = ({ navigation }) => {
  const [randomPlace, setRandomPlace] = useState(null);
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.places);

  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ItemListView navigation={navigation} items={items} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'left',
    color: '#333',
    marginLeft: 10,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

