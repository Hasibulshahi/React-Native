// __tests__/AppHeader.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import { AppHeader } from '../components/AppHeader';

test('renders AppHeader correctly', () => {
  const { getByText } = render(<AppHeader />);
  expect(getByText('Historical Places')).toBeTruthy();
});
