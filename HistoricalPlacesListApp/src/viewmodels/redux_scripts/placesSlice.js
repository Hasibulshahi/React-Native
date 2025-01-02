import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import placesData from '../redux_scripts/places.json';

export const fetchPlaces = createAsyncThunk('places/fetchPlaces', async () => {
  try {
    const response = await fetch('https://api.example.com/places');
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return placesData; // Fallback to local JSON
  }
});

const placesSlice = createSlice({
  name: 'places',
  initialState: {
    items: [],
    isLoading: false,
  },
  reducers: {
    toggleVisited: (state, action) => {
      const { id, visited } = action.payload;
      state.items = state.items.map((item) =>
        item.id === id ? { ...item, visited } : item
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPlaces.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { toggleVisited } = placesSlice.actions;

export default placesSlice.reducer;
