# Project Overview

The project uses the React Native framework with a Redux architecture for state management. Here's how the architecture can be described:

## Key Architectural Elements

### UI Components (Presentation Layer)
- Components like `AppHeader`, `ItemCard`, and screens (e.g., `HomeScreen`, `ItemDetailsScreen`) focus on rendering the UI and interacting with user actions.
- These components are styled using `StyleSheet`.

### State Management (Redux)
- Redux manages the global state of the application.
- The `placesSlice.js` file defines a slice of the state (`places`) with its reducers (`toggleVisited`) and asynchronous actions (`fetchPlaces`).

### ViewModel (Custom Hooks)
- Hooks like `useItemViewModel` and `suggestionItemViewModel` abstract state management logic, making the components lean and focused on the UI.

### Data Layer
- The project uses `createAsyncThunk` to fetch data, which can either come from an external API or fall back to local JSON (`places.json`) in case of errors.

### Navigation (React Navigation)
- Screens like `HomeScreen` and `ItemDetailsScreen` use navigation to move between different parts of the app.

## Design Pattern

The project loosely follows the **MVVM** (Model-View-ViewModel) pattern:
- **Model**: Represents the data (e.g., `places.json` or API responses).
- **ViewModel**: Hooks like `useItemViewModel` serve as intermediaries between UI components and the Redux store.
- **View**: Components and screens that render the UI.

This architecture ensures a modular, testable, and scalable structure. It separates concerns by keeping business logic in the Redux store and hooks, while UI components handle presentation and user interactions.

## How to Run the Project

1. Clone the Git Repo in VSCode.
2. Install the dependencies if needed.
3. In terminal, go to the project directory.
4. Run the command `npx expo start` and follow the instructions.

## Data Management

1. Read data from the `get` API in `placesSlice.js` using the `fetchPlaces` function. But for now, as there is no real API, it gets data from the local JSON file `places.json` after an exception occurs.

```javascript
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
```javascript

2. Each place is displayed with its name, image, and description.

# Visited Places Functionality

## Overview

The "Visited Places" feature allows users to mark places as visited or unvisited with immediate UI reflection. This functionality is implemented using Redux for global state management, ensuring the visited/unvisited state persists across different screens of the app.

## Features

- **Home Screen Toggle**: 
  - A toggle button on the HomeScreen allows users to mark places as visited or unvisited.
  - The UI updates instantly after toggling a place's state, and clicking on an item will show the details with the toggle's updated state.
  
- **Unvisited Toggle**: 
  - The same process applies when a place is unmarked as visited.

- **State Management with Redux**:
  - Redux manages the global state for places and their visited/unvisited status using React hooks.

## How Redux Works Here

### 1. Overview of Redux Flow
- **State Management**: Redux manages the global state of places and their properties, including the `visited` status.
- **Action Dispatching**: Actions like `fetchPlaces` and `toggleVisited` update the state accordingly.
- **Reducers**: Reducers handle the transformation of state based on dispatched actions.
- **Selectors**: Components access specific slices of the state.
- **Persistence Across Screens**: Redux ensures consistency and avoids redundant API calls, maintaining the visited state across the app.

### 2. Key Redux Components

#### a. Redux Slice (`placesSlice.js`)
- Manages the `items` array and updates the state of visited/unvisited places.

#### b. Redux Store (`store.js`)
- Configures the Redux store to handle the application's state.

#### c. Action Usage in Components

- **Dispatching Action in Components**:
  In the `HomeScreen` and `SuggestionScreen`, Redux actions are dispatched to load the data:
  ```javascript
  const dispatch = useDispatch();
  const items = useSelector((state) => state.places.items);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchPlaces());
    }
  }, [dispatch, items]);

