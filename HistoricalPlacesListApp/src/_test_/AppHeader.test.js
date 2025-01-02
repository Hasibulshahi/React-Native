import React from 'react';
import { render } from '@testing-library/react-native';
import { AppHeader } from '../components/AppHeader';

describe('AppHeader', () => {
  it('renders the header title correctly', () => {
    const { getByText } = render(<AppHeader />);
    const title = getByText('Historical Places');
    expect(title).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const { toJSON } = render(<AppHeader />);
    expect(toJSON()).toMatchSnapshot();
  });
});
