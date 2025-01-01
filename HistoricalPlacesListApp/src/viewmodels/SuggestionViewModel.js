import { useState, useEffect } from 'react';

// Import the JSON file
import placesData from '../places.json';

export const useItemViewModel = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // API URL
        const response = await fetch('https://api.example.com/places');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        setItems(placesData); // Fallback to local JSON
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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