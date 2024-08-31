# Redux Core Documentation

## Introduction to Redux

Redux is a predictable state container for JavaScript applications. It helps you manage the state of your application in a consistent and easy-to-debug way. Redux is commonly used with React but can be used with any other JavaScript framework or even vanilla JavaScript.

## Key Concepts

### 1. **Store**
   - The store holds the entire state of your application. It's a plain JavaScript object that contains the data you want to manage.
   - You can only have a single store in a Redux application.

### 2. **Actions**
   - Actions are plain JavaScript objects that have a `type` property and may include a `payload`. 
   - They describe what should happen in the application, but they don't specify how the state changes.

   ```javascript
   const addTodo = { type: "ADD_TODO", payload: { todoText: "Learn Redux" } };
   ```

### 3. **Action Creators**
   - These are functions that return an action object. They help you avoid hardcoding action objects throughout your application.

   ```javascript
   const addTodo = (text) => ({ type: "ADD_TODO", payload: { todoText: text } });
   ```

### 4. **Reducers**
   - Reducers specify how the state changes in response to an action. They are pure functions that take the current state and an action as arguments and return a new state.

   ```javascript
   function TodoReducer(state = [], action) {
       switch (action.type) {
           case "ADD_TODO":
               return [...state, { id: state.length + 1, text: action.payload.todoText, isComplete: false }];
           // other cases
           default:
               return state;
       }
   }
   ```

### 5. **Store Methods**
   - `store.dispatch(action)`: Dispatches an action to change the state.
   - `store.getState()`: Retrieves the current state.
   - `store.subscribe(listener)`: Adds a listener function that will be called whenever the state changes.

### 6. **Combine Reducers**
   - When you have multiple reducers handling different parts of the state, you can combine them using `combineReducers`.

   ```javascript
   import { combineReducers } from "redux";

   const rootReducer = combineReducers({
       todos: TodoReducer,
       users: UserReducer
   });
   ```

### 7. **Bind Action Creators**
   - `bindActionCreators` automatically binds the action creators to the `dispatch` function, making it easier to call them directly.

   ```javascript
   import { bindActionCreators } from "redux";

   const actions = bindActionCreators({ addTodo, deleteTodo }, store.dispatch);
   actions.addTodo("New Todo");
   ```

## Basic Implementation Example

```javascript
import { bindActionCreators, combineReducers, createStore } from "redux";

// Action Types
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const ADD_USER = "ADD_USER";

// Reducers
function TodoReducer(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [...state, { id: state.length + 1, text: action.payload.todoText, isComplete: false }];
        case DELETE_TODO:
            return state.filter(todo => todo.id !== action.payload.id);
        default:
            return state;
    }
}

function UserReducer(state = [], action) {
    switch (action.type) {
        case ADD_USER:
            return [...state, action.payload.user];
        default:
            return state;
    }
}

// Combine Reducers
const rootReducer = combineReducers({ todos: TodoReducer, users: UserReducer });

// Create Store
const store = createStore(rootReducer);

// Action Creators
const addTodo = (text) => ({ type: ADD_TODO, payload: { todoText: text } });
const deleteTodo = (id) => ({ type: DELETE_TODO, payload: { id } });
const addUser = (user) => ({ type: ADD_USER, payload: { user } });

// Bind Action Creators
const actions = bindActionCreators({ addTodo, deleteTodo, addUser }, store.dispatch);

// Dispatch Actions
actions.addTodo("Learn Redux");
actions.addUser("John Doe");
store.dispatch(deleteTodo(1));

// Get State
console.log(store.getState());
```

### Features

- **State Management**: Centralized state makes your application predictable and easier to debug.
- **Middleware Support**: Easily extend the functionality of Redux with middleware like `redux-thunk` for asynchronous actions.
- **Time Travel Debugging**: Tools like Redux DevTools enable you to trace changes and even revert to previous states.

### Conclusion

Redux is a powerful tool for managing application state, especially in large applications where state management becomes complex. With its clear structure and predictability, Redux is a great choice for maintaining the consistency and reliability of your application's state.