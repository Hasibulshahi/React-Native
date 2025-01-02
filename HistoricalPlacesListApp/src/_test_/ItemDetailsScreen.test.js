// __tests__/ItemDetailsScreen.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import { ItemDetailsScreen } from '../src/screens/ItemDetailsScreen';

test('renders ItemDetailsScreen correctly', () => {
  const item = {
    title: 'Sample Place',
    visited: true,
    description: 'This is a sample description.',
    imageLink: 'https://example.com/image.png',
  };

  const { getByText, getByAltText } = render(
    <ItemDetailsScreen route={{ params: { item } }} navigation={{ goBack: jest.fn() }} />
  );

  expect(getByText('Sample Place')).toBeTruthy();
  expect(getByText('Visited: Yes')).toBeTruthy();
  expect(getByText('This is a sample description.')).toBeTruthy();
});
