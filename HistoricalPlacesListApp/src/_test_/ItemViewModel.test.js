// __tests__/useItemViewModel.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import { useItemViewModel } from '../viewmodels/ItemViewModel';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

test('ItemViewModel fetches places and toggles visited', () => {
  const store = mockStore({
    places: {
      items: [],
      isLoading: false,
    },
  });

  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  const { result } = renderHook(() => useItemViewModel(), { wrapper });

  act(() => {
    result.current.toggleVisited(1, true);
  });

  const actions = store.getActions();
  expect(actions).toContainEqual({ type: 'places/toggleVisited', payload: { id: 1, visited: true } });
});
