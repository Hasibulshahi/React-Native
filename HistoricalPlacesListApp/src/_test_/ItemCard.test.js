import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ItemCard } from '../components/ItemCard';

const mockStore = configureStore([]);
const mockItem = {
  id: 1,
  title: 'Test Place',
  visited: false,
  imageLink: 'https://raw.githubusercontent.com/Hasibulshahi/React-Native/main/HistoricalPlacesListApp/assets/images/malaka%20palace%20museum.png',
};

describe('ItemCard', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      places: { items: [mockItem] },
    });
  });

  it('renders the item correctly', () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <ItemCard item={mockItem} />
      </Provider>
    );

    expect(getByText('Test Place')).toBeTruthy();
    expect(getByRole('switch')).toBeTruthy();
  });

  it('dispatches toggleVisited action when switch is toggled', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <ItemCard item={mockItem} />
      </Provider>
    );

    fireEvent(getByRole('switch'), 'valueChange', true);

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'places/toggleVisited',
      payload: { id: mockItem.id, visited: true },
    });
  });
});
