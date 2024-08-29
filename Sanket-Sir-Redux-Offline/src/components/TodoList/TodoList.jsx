import React, { useContext, useEffect, useState } from 'react'
import Todo from '../Todo/Todo'
import TodoContext from '../../context/todoContext';

function TodoList() {

    const {todos : Todos, setTodos} = useContext(TodoContext)
    const deleteTodo = (id) => {
        setTodos(Todos.filter(todo => todo.id != id));
    }

    const markTodoDone = (id) => {
        setTodos(Todos.map(todo => {
            if (todo.id == id){
                todo.isCompleted = !todo.isCompleted;
            }
            return todo;
        }))
    }

    const editTodo = (id, newText) => {
        const newTodos = Todos.map(todo => {
            if (todo.id == id){
                todo.text = newText;
            }
            return todo;
        })

        setTodos(newTodos);

    }

  return (
    <div>
      Todo List
      {Todo && Todos.map((todo, i) => <Todo markTodoDone={markTodoDone} editTodoFn={editTodo} deleteTodoFn={deleteTodo} key={i} todo={todo}/>)}
    </div>
  )
}

export default TodoList
