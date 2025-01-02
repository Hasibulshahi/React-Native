// __tests__/ItemCard.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ItemCard } from '../src/components/ItemCard';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

test('renders ItemCard and toggles visited state', () => {
  const item = {
    id: 1,
    title: 'Sample Place',
    visited: false,
    imageLink: 'https://example.com/image.png',
  };

  const store = mockStore({});
  const { getByText, getByTestId } = render(
    <Provider store={store}>
      <ItemCard item={item} />
    </Provider>
  );

  expect(getByText('Sample Place')).toBeTruthy();

  const switchComponent = getByTestId('toggle-switch');
  fireEvent(switchComponent, 'valueChange', true);

  const actions = store.getActions();
  expect(actions).toEqual([
    { type: 'places/toggleVisited', payload: { id: 1, visited: true } },
  ]);
});
