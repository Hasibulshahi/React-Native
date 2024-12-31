import { useState, useEffect } from 'react';

// Import the JSON file
import placesData from '../places.json'; //'./place.json';

export const useItemViewModel = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching local JSON data
    setTimeout(() => {
      setItems(placesData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const toggleVisited = (id, visited) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, visited } : item
    );
    setItems(updatedItems);
  };

  return {
    items,
    isLoading,
    toggleVisited,
  };
};