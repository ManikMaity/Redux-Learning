
import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList/TodoList'
import AddTodo from './components/AddTodo/AddTodo';
import TodoContext from './context/todoContext';

function App() {

  const [todos, setTodos] = useState([
    {id: 1, text : "Whats Up", isCompleted : false},
    {id: 2, text : "Todo 2", isCompleted : true}
  ]);
  

  return (
    <>
    
    <TodoContext.Provider value={{todos, setTodos}}>
    <AddTodo/>
      <TodoList/>
    </TodoContext.Provider>
      
    </>
  )
}

export default App
