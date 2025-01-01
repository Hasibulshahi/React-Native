import { renderHook, act } from '@testing-library/react';
import { useItemViewModel } from '../viewmodels/SuggestionViewModel';
import placesData from '../places.json';

// Mock the fetch API to simulate different scenarios
global.fetch = jest.fn();

describe('useItemViewModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useItemViewModel());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.items).toEqual([]);
  });

  it('should fetch data from API and update items', async () => {
    const mockData = [
      { id: 1, name: 'Test Place 1', visited: false },
      { id: 2, name: 'Test Place 2', visited: false },
    ];

    // Mock successful API response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { result, waitFor } = renderHook(() => useItemViewModel());

    // Wait for the hook to update after fetching data
    await waitFor(() => !result.current.isLoading);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.current.items).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  it('should fallback to local data when the API fails', async () => {
    // Mock the fetch call to simulate an API error
    fetch.mockRejectedValueOnce(new Error('API error'));

    const { result, waitFor } = renderHook(() => useItemViewModel());

    // Wait for the hook to update after trying to fetch data
    await waitFor(() => !result.current.isLoading);

    // Check that the fallback data (local JSON) is used
    expect(result.current.items).toEqual(placesData);
    expect(result.current.isLoading).toBe(false);
  });

  it('should toggle visited status correctly', () => {
    const { result } = renderHook(() => useItemViewModel());

    // Initially, items are empty
    expect(result.current.items).toEqual([]);

    // Add a mock item to items manually
    act(() => {
      result.current.toggleVisited(1, true);
    });

    // Verify that the visited status of the item is updated
    expect(result.current.items).toEqual([
      { id: 1, name: 'Place 1', visited: true },
    ]);
  });

  it('should handle empty items list when API returns no data', async () => {
    // Mock the API to return an empty array
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    });

    const { result, waitFor } = renderHook(() => useItemViewModel());

    await waitFor(() => !result.current.isLoading);

    expect(result.current.items).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });
});
