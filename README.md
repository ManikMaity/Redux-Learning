# Redux Toolkit + Core

## Resources 
- [HuXn WebDev YT - Redux](https://www.youtube.com/watch?v=CI8VeG0GI-M)

## Notes + Key Concepts

### 1. Installing Redux Toolkit & React Redux
To get started with Redux in your React application, you'll need to install the necessary packages. You can do this by running the following command in your project directory:

```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Creating the Redux Store
The store is the central place where the application's state is stored. It is essentially an object that holds the entire state tree of your app.

#### 2.1 Creating the Store File
- Inside your `src` folder, create a new folder named `app`.
- Within the `app` folder, create a new file called `store.js`.

```bash
mkdir src/app
touch src/app/store.js
```

#### 2.2 Configuring the Store
- In the `store.js` file, import the `configureStore` function from `@reduxjs/toolkit`.
- Use the `configureStore` function to create the store. This function takes an object with a `reducer` key as its argument.
- Store the result in a variable and export it.

```js
// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        // reducers will go here
    }
});
```

### 3. Providing the Store to React Components
To make the store accessible to all components in your React application, you'll need to use the `<Provider>` component from `react-redux`.

#### 3.1 Wrapping the App with the Provider
- In your main entry file (typically `index.js` or `main.jsx`), import the `store` you created and the `<Provider>` component.
- Wrap your `<App />` component with the `<Provider>` and pass the `store` as a prop.

```js
// src/index.js or src/main.jsx
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store } from './app/store.js';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### 4. Creating a Slice
A slice is a specific part of the Redux state along with the reducers that determine how that state changes.

#### 4.1 Setting Up the Slice
- Create a `features` folder inside the `app` folder.
- Inside `features`, create a folder named `counter` (or any other name for the feature you're working on).
- Within the `counter` folder, create a file named `counterSlice.js`.

```bash
mkdir src/app/features
mkdir src/app/features/counter
touch src/app/features/counter/counterSlice.js
```

#### 4.2 Defining the Slice
- Import `createSlice` from `@reduxjs/toolkit`.
- Define the slice using `createSlice` by passing an object that includes the slice name, initial state, and reducers.
- The `initialState` is an object that holds the initial value of the state.
- Reducers are functions that define how to update the state.

```js
// src/app/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: { value: 0 },

    // Reducers: functions to handle state changes
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        }
    }
});

// Export the action creators
export const { increment, decrement } = counterSlice.actions;

// Export the reducer to be included in the store
export default counterSlice.reducer;
```

### 5. Binding the Slice to the Store
Now that you have created your slice, you need to bind it to the store so that it can be used within your application.

#### 5.1 Adding the Slice Reducer to the Store
- Import the default export from `counterSlice.js`, which is the reducer function.
- Inside `store.js`, add this reducer to the `reducer` object using a key (e.g., `counter`).

```js
// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});
```

### 6. Using Redux State and Actions in React Components
Finally, you can use Redux state and actions within your React components.

#### 6.1 Importing Necessary Functions
- In the component where you want to use Redux state, import `useSelector` and `useDispatch` from `react-redux`.
- Import the action creators (e.g., `increment`, `decrement`) from the `counterSlice`.

#### 6.2 Reading State with `useSelector`
- `useSelector` allows you to read data from the Redux store. It takes a function that returns the part of the state you want to access.

#### 6.3 Dispatching Actions with `useDispatch`
- `useDispatch` is used to send actions to the Redux store, which in turn updates the state.

```js
// src/components/Counter.js
import React from "react";
import "./counter.css";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../app/features/counter/counterSlice";

function Counter() {
    // Read the value from the store
    const count = useSelector((state) => state.counter.value);

    // Dispatch actions to change the store's state
    const dispatch = useDispatch();

    return (
        <div className="counter">
            <p>{count}</p>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
}

export default Counter;
```

### Summary of Steps
1. Install Redux Toolkit and React Redux.
2. Create a store and configure it using `configureStore`.
3. Provide the store to the entire application using the `<Provider>` component.
4. Create a slice using `createSlice` with name, initial state, and reducers.
5. Bind the slice reducer to the store.
6. Use `useSelector` to read from the Redux store and `useDispatch` to dispatch actions from your React components.

[Notes-NonFormated](./public/NOTES.md)