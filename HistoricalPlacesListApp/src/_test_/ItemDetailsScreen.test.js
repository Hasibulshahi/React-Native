import React from 'react';
import { render } from '@testing-library/react-native';
import { ItemDetailsScreen } from '../screens/ItemDetailsScreen';

describe('ItemDetailsScreen', () => {
  const mockItem = {
    id: 1,
    title: 'Test Place',
    visited: false,
    description: 'This is a test description.',
    imageLink: 'https://example.com/test.jpg',
  };

  it('renders item details correctly', () => {
    const { getByText, getByRole } = render(
      <ItemDetailsScreen route={{ params: { item: mockItem } }} />
    );

    expect(getByText('Test Place')).toBeTruthy();
    expect(getByText('Visited: No')).toBeTruthy();
    expect(getByText('This is a test description.')).toBeTruthy();
    expect(getByRole('image')).toBeTruthy();
  });
});
