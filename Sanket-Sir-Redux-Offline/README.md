# Redux + Context API

## Context api
To use the Context API in React effectively, you can follow these steps to create a Context, provide it to your component tree, and consume it in the child components.

### Step 1: Create a Context
Start by creating a folder named context inside your src directory. Inside this folder, create a new file, e.g., TodoContext.js, where you'll define the context.

```javascript
// src/context/TodoContext.js
import { createContext } from 'react';

// Create a Context with a default value of null
const TodoContext = createContext(null);

export default TodoContext;
```


### Step 2: Provide the Context in a Parent Component
Next, go to the parent component, typically App.jsx, where you want to provide the context to its child components. Import the TodoContext and wrap the relevant components with TodoContext.Provider. Pass the state values you want to share as the value prop.

```javascript
// src/App.jsx
import React, { useState } from 'react';
import TodoContext from './context/TodoContext';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

const App = () => {
    // Define the state you want to share
    const [todos, setTodos] = useState([]);

    return (
        // Wrap the components with TodoContext.Provider and pass the state as value
        <TodoContext.Provider value={{ todos, setTodos }}>
            <AddTodo />
            <TodoList />
        </TodoContext.Provider>
    );
};

export default App;
```


### Step 3: Consume the Context in Child Components
In any child component that needs access to the context, use the useContext hook from React and pass your context object to it.

```javascript
// src/components/TodoList.jsx
import React, { useContext } from 'react';
import TodoContext from '../context/TodoContext';

const TodoList = () => {
    // Use useContext to consume the context
    const { todos } = useContext(TodoContext);

    return (
        <ul>
            {todos.map((todo, index) => (
                <li key={index}>{todo}</li>
            ))}
        </ul>
    );
};

export default TodoList;
```


```javascript
// src/components/AddTodo.jsx
import React, { useState, useContext } from 'react';
import TodoContext from '../context/TodoContext';

const AddTodo = () => {
    const [newTodo, setNewTodo] = useState('');
    const { todos, setTodos } = useContext(TodoContext);

    const addTodo = () => {
        setTodos([...todos, newTodo]);
        setNewTodo('');
    };

    return (
        <div>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={addTodo}>Add Todo</button>
        </div>
    );
};

export default AddTodo;
```


### Summary

1. *Create a Context:* Define a context using createContext in a separate file.
2. *Provide the Context:* Wrap the parent component with Context.Provider and pass the state you want to share as a value.
3. *Consume the Context:* Use the useContext hook in child components to access the provided state.


### Step-by-Step Guide to Using `useReducer` in React

This guide will explain how to use the `useReducer` hook in React to manage complex state logic in a step-by-step manner. We'll cover the concepts of actions, payloads, and how `useReducer` works with a detailed example.

---

### Step 1: **Understanding `useReducer`**

- **What is `useReducer`?**  
  `useReducer` is a hook that lets you manage state in React, similar to `useState`, but with more complex logic. It’s especially useful when the state logic involves multiple sub-values or when the next state depends on the previous state.

- **Key Concepts:**
  - **Reducer Function:** A pure function that determines the new state based on the current state and the action dispatched.
  - **State:** The current state of your component.
  - **Action:** An object that describes the change you want to make. It typically has a `type` (what kind of action it is) and a `payload` (any data the action needs).

### Step 2: **Creating the Reducer Function**

The reducer function is where you define how your state should change based on actions.

```javascript
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        { id: Date.now(), text: action.payload.text, isCompleted: false },
      ];
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload.id);
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
    default:
      return state;
  }
}
```

- **State:** The current list of todos.
- **Action:** An object with a `type` (like `ADD_TODO`) and a `payload` containing additional data (like the todo text).
- **Switch Statement:** Determines what action to perform based on `action.type`.

### Step 3: **Using the `useReducer` Hook**

Now, let's use the reducer in a React component.

```javascript
import React, { useReducer } from 'react';

function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <div>
      {/* Components will go here */}
    </div>
  );
}
```

- **Initial State:** `useReducer(todoReducer, []);` initializes `todos` as an empty array.
- **Dispatch:** The `dispatch` function is used to send actions to the reducer.

### Step 4: **Dispatching Actions**

You dispatch actions from your components to update the state.

```javascript
import React, { useState, useContext } from 'react';
import TodoContext from './TodoContext';

function AddTodo() {
  const { dispatch } = useContext(TodoContext);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TODO', payload: { text } });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}
```

- **Dispatching an Action:**  
  `dispatch({ type: 'ADD_TODO', payload: { text } })` sends the action to the reducer.
- **Payload:** The data you need to pass to update the state, like `text` for a new todo.

### Step 5: **Accessing the State**

To display the todos, you need to access the state managed by the reducer.

```javascript
import React, { useContext } from 'react';
import TodoContext from './TodoContext';

function TodoList() {
  const { todos, dispatch } = useContext(TodoContext);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } })}>
            Delete
          </button>
          <button onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: { id: todo.id } })}>
            {todo.isCompleted ? 'Undo' : 'Complete'}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

- **Mapping Over State:** Use `todos.map` to iterate over each todo and display it.
- **Action Buttons:** Trigger `DELETE_TODO` and `TOGGLE_TODO` actions to delete or mark todos as completed.

### Step 6: **Context Setup (Optional)**

To avoid prop drilling, you can use React Context to share the state and dispatch function across components.

```javascript
import React, { createContext } from 'react';

const TodoContext = createContext();

export default TodoContext;
```

Wrap your components with `TodoContext.Provider`.

```javascript
import React from 'react';
import TodoContext from './TodoContext';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import { useReducer } from 'react';

function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      <AddTodo />
      <TodoList />
    </TodoContext.Provider>
  );
}

export default App;
```

### Step 7: **Final Review**

With everything in place, you've now set up a basic Todo application using `useReducer`. The main takeaways are:

1. **Reducer Function:** Centralizes the state logic.
2. **Actions:** Objects that specify what change to make.
3. **Dispatch:** The function used to send actions to the reducer.
4. **State Management:** `useReducer` is ideal for managing more complex state than `useState`.

This approach provides a clean and scalable way to manage state in React, especially as your application grows in complexity.