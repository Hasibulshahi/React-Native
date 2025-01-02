import React from 'react';
import { render, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { HomeScreen } from '../screens/HomeScreen';

const mockStore = configureStore([]);
const mockNavigation = { navigate: jest.fn() };

describe('HomeScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      places: { items: [], isLoading: false },
    });
  });

  it('renders the loading state', () => {
    store = mockStore({
      places: { items: [], isLoading: true },
    });

    const { getByText } = render(
      <Provider store={store}>
        <HomeScreen navigation={mockNavigation} />
      </Provider>
    );

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders the list of items when loaded', () => {
    store = mockStore({
      places: {
        items: [{ id: 1, title: 'Test Place', visited: false }],
        isLoading: false,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <HomeScreen navigation={mockNavigation} />
      </Provider>
    );

    expect(getByText('Places you can visit')).toBeTruthy();
    expect(getByText('Test Place')).toBeTruthy();
  });
});
