// __tests__/HomeScreen.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import { HomeScreen } from '../screens/HomeScreen';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

test('renders HomeScreen with loading state', () => {
  const store = mockStore({
    places: {
      items: [],
      isLoading: true,
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <HomeScreen navigation={{ navigate: jest.fn() }} />
    </Provider>
  );

  expect(getByText('Loading...')).toBeTruthy();
});
