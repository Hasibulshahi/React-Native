import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaces, toggleVisited } from './redux_scripts/placesSlice';

export const suggestionItemViewModel = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.places.items);
  const isLoading = useSelector((state) => state.places.isLoading);

  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  const handleToggleVisited = (id, visited) => {
    dispatch(toggleVisited({ id, visited }));
  };

  return {
    items,
    isLoading,
    toggleVisited: handleToggleVisited,
  };
};
