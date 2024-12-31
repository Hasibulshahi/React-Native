import { useState, useEffect } from 'react';

export const useItemViewModel = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      const fetchedItems = [
        { id: 1, title: 'Item 1', description: 'Description for item 1', visited: false },
        { id: 2, title: 'Item 2', description: 'Description for item 2', visited: true },
        { id: 3, title: 'Item 3', description: 'Description for item 3', visited: false },
        { id: 4, title: 'Item 4', description: 'Description for item 4', visited: true },
      ];
      setItems(fetchedItems);
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

