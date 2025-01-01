import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { ItemListView } from '../views/ItemListView';
import places from '../places.json'; // Import your places.json file

export const HomeScreen = ({ navigation }) => {
  const [randomPlace, setRandomPlace] = useState(null);

  useEffect(() => {
    // Function to set a random place
    const changeRandomPlace = () => {
      const randomIndex = Math.floor(Math.random() * places.length);
      setRandomPlace(places[randomIndex]);
    };

    // Set initial random place
    changeRandomPlace();

    // Set interval to change the image every 5 seconds
    const interval = setInterval(changeRandomPlace, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleImageClick = () => {
    if (randomPlace) {
      navigation.navigate('ItemDetails', { item: randomPlace });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Places you can visit</Text>
      {randomPlace && (
        <TouchableOpacity onPress={handleImageClick} style={styles.imageContainer}>
          <Image
            source={{ uri: randomPlace.imageLink }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
      <ItemListView navigation={navigation} />
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
    paddingRight: 10
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
});
