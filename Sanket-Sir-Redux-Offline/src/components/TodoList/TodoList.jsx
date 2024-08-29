import React, { useContext, useEffect, useState } from "react";
import Todo from "../Todo/Todo";
import TodoContext from "../../context/todoContext";

function TodoList() {
  const { todos: Todos, dispatch } = useContext(TodoContext);
  const deleteTodo = (id) => {
    dispatch({ type: "delete_todo", payload: { id } });
  };

  const markTodoDone = (id) => {
    dispatch({ type: "mark_todo", payload: { id } });
  };

  const editTodo = (id, newText) => {
    dispatch({ type: "edit_todo", payload: { id, newText } });
  };

  return (
    <div>
      Todo List
      {Todo &&
        Todos.map((todo, i) => (
          <Todo
            markTodoDone={markTodoDone}
            editTodoFn={editTodo}
            deleteTodoFn={deleteTodo}
            key={i}
            todo={todo}
          />
        ))}
    </div>
  );
}

export default TodoList;
