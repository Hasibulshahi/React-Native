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
```

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
```
### How Redux Works Together

## Data Fetching

- `fetchPlaces` is dispatched when the `items` array is empty.
- The `items` state is populated with data fetched from the API response.

## State Updates

- The `toggleVisited` action updates the `visited` property of a specific place in the `items` array.

## Cross-Screen Consistency

- Both `HomeScreen` and `SuggestionScreen` read from the same Redux state.
- Changes in one screen (like toggling the visited status) are immediately reflected on the other screen.

## Fun Feature

### Image Viewer on HomeScreen

- An image viewer on the `HomeScreen` displays images from the API or a local JSON file.
- The images change every 5 seconds.
- When a user clicks on an image, they are redirected to the `ItemDetailsScreen` to view more information about the item.

### Random Image Selection with `useEffect`

The following `useEffect` hook is responsible for selecting a random image from the `items` array every 5 seconds:

```javascript
useEffect(() => {
  const changeRandomPlace = () => {
    if (items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length);
      setRandomPlace(items[randomIndex]);
    }
  }; 

  changeRandomPlace();

  const interval = setInterval(changeRandomPlace, 5000); 

  return () => clearInterval(interval);
}, [items]);
```
### Navigation Handeller
The following handeller is used for navigation
```javascript
 const handleImageClick = () => {
 if (randomPlace) {
 navigation.navigate('ItemDetails', { item: randomPlace });
 }
 };
 ```
### Finally to show the imageViewer
```javascript
 {randomPlace && (
 <TouchableOpacity onPress={handleImageClick} style={styles.imageContainer}>
 <Image
 source={{ uri: randomPlace.imageLink }}
 style={styles.image}
 resizeMode="cover"
 />
 </TouchableOpacity>
 )}
```
# Routes and Navigation

## 1. Navigation Between Screens

- Tap on an item in the list to view its details on the `ItemDetailsScreen`.
- Users can navigate back to the `HomeScreen` while retaining the correct state of the data.

## 2. Direct Navigation (Deep Linking)

The following `linking` configuration ensures Deep Linking functionality for the `Home`, `Suggestion`, and `Not-Visited` screens. It allows users to navigate directly to specific screens via URLs.

```javascript
const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Home: {
        screens: {
          HomeScreen: 'home',
          ItemDetails: 'item/:id',
        },
      },
      Suggestion: {
        screens: {
          SuggestionScreen: 'suggestion',
          ItemDetails: 'item/:id',
        },
      },
      NotVisited: 'not-visited',
      Settings: 'settings',
    },
  },
};
```
## 3. Navigation Behavior After Marking a Place
- After marking or unmarking a place on either the `HomeScreen` or `SuggestionScreen`, the state change is preserved across all screens.
- Since the same `places.json` file is used for both the `HomeScreen` and `SuggestionScreen`, any update to the visited status of a place will be reflected in both screens.
- This behaviour demonstrates how Redux state management ensures that changes are consistent across different screens of the app.
## 4. Redux State Management Integration
The navigation logic is tightly integrated with Redux state management, ensuring that the visited status of places is maintained consistently across screens. The same data is shared and updated across `HomeScreen` and `SuggestionScreen`, demonstrating the power of Redux in managing global state.
