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
