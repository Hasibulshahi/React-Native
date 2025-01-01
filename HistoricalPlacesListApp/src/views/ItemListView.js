import React from 'react';
import { FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ItemCard } from '../components/ItemCard';

export const ItemListView = ({ navigation, items }) => {
  if (!items || items.length === 0) {
    return <Text style={styles.emptyText}>No places available.</Text>;
  }

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ItemDetails', { item })}
        >
          <ItemCard item={item} onToggleVisited={(id, visited) => console.log(id, visited)} />
        </TouchableOpacity>        
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});


// import React from 'react';
// import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { ItemCard } from '../components/ItemCard';

// export const ItemListView = ({ navigation, items }) => {
//   if (!items || items.length === 0) {
//     return <Text style={styles.emptyText}>No places available.</Text>;
//   }

//   return (
//     <FlatList
//       data={items}
//       renderItem={({ item }) => (
//         <TouchableOpacity
//           onPress={() => navigation.navigate('ItemDetails', { item })}>
//             <ItemCard item={item} />
//         </TouchableOpacity>        
//       )}
//       keyExtractor={(item) => item.id.toString()}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   emptyText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//     color: '#888',
//   },
// });
