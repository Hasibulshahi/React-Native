**1. How to Run the Project:**
  1. Clone Git Repo in VSCode.
  2. Install the dependencies if needed.
  3. In terminal go to the project directory.
  4. Run this command npx expo start and follow the instructions.
**2. Data Management**
     1. Read data from get API in placesSlice.js using fetchPlaces function. But for now as there no real API there so after getting exception it gets data from the local json file places.json.
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
        2. Each place is displayed with its name, image, and description.
    **3. Visited Places Functionality**
        1. On the HomeScreen we have a toggle button. When we mark any place as visited it reflects on UI immediately and after clicking on the items we can see the details where we find the toggle is updated.
        2. Same thing done for unvisited when it unmarks.
        3. All the visited state has been managed with the Redux that is using React Hooks.
    **4. How Redux Works Here**
             **1. Overview of Redux Flow**
                1. State Management: Redux manages the global state of places (items) and their properties, such as visited.
                2. Action Dispatching: Actions like fetchPlaces and toggleVisited update the state.
                3. Reducers: Reducers handle state transformations based on dispatched actions.
                4. Selectors: Access specific slices of the state in components.
                5. Persistence Across Screens: Ensures consistency and avoids redundant API calls.
             **2. Key Redux Components**
                1. Redux Slice: **placesSlice.js**: Manages the items array and state updates.
                2. Redux Store: **store.js:** Configures the Redux store.
                3. Action Usage in Components: Used in both HomeScreen and SuggestionScreen to load data.
                      const dispatch = useDispatch();
                      const items = useSelector((state) => state.places.items);                    
                      useEffect(() => {
                        if (items.length === 0) {
                          dispatch(fetchPlaces());
                        }
                      }, [dispatch, items]);
                 4. **Toggle Visited** State Used in the **ItemCard** component to update the visited property.
                     const dispatch = useDispatch();
                     const toggleSwitch = () => {
                       dispatch(toggleVisited({ id: item.id, visited: !item.visited }));
                     };
           **3. How Redux Works Together**
                  1. Data Fetching:
                       1. **fetchPlaces** is dispatched when the items array is empty.
                       2. The items state is populated with data from the API response.
                  2. State Updates:
                       1. The **toggleVisited** action updates the visited property of a specific place in the items array.
                  3. Cross-Screen Consistency:
                       1. Both **HomeScreen** and **SuggestionScreen** read from the same Redux state.
                       2. Changes in one screen (like toggling visited) are immediately reflected on the other screen.
    **5. Fun Feature**
          1. On the HomeScreen there is an imageViewer which will show some places images from the url that is taken either from API or local Json file.
          2. The images are changing after every 5 sec.
          3. If user clicks on that image it will redirect to the itemDetailsScreen to show the item details.
               The following useEffect is responsible for chosing an image randomly
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
             
               The following handeller is used for navigation
                     const handleImageClick = () => {
                      if (randomPlace) {
                        navigation.navigate('ItemDetails', { item: randomPlace });
                      }
                    };
             
               Finally to show the imageViewer
                      {randomPlace && (
                        <TouchableOpacity onPress={handleImageClick} style={styles.imageContainer}>
                          <Image
                            source={{ uri: randomPlace.imageLink }}
                            style={styles.image}
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      )}
             
    **6. Routes and Navigation**
