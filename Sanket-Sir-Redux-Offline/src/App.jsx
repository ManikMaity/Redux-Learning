import { useReducer, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList/TodoList";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoContext from "./context/todoContext";
import TodoReducer from "./reducer/TodoReducer";

function App() {
  const [todos, dispatch] = useReducer(TodoReducer, []);

  return (
    <>
      <TodoContext.Provider value={{ todos, dispatch }}>
        <AddTodo />
        <TodoList />
      </TodoContext.Provider>
    </>
  );
}

export default App;
