import React, { useContext, useState } from 'react'
import todoContext from '../../context/todoContext';

function AddTodo() {

    const [todoText, setTodoText] = useState("");
    const {todos, setTodos} = useContext(todoContext)
    
    function addNewTodo (e) {
        e.preventDefault();
        if (todoText.trim() === ""){
            return;
        }
        setTodos([...todos, {id: todos.length + 1, text : todoText, isComplete: false}]);
        setTodoText("");
    }

  return (
    <form className='addTodo'>
      <input type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} placeholder='Enter todo here ...'/>
      <button type='submit' onClick={addNewTodo}>Add Todo</button>
    </form>
  )
}

export default AddTodo
