import React, { useState } from "react";

function Todo({ todo, deleteTodoFn, editTodoFn, markTodoDone }) {
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(todo.text);

  function handleEditClick() {
    setIsEditing(!isEditing);
    editTodoFn(todo.id, todoText);
  }

  return (
    <div>
      <input
        type="checkbox"
        onChange={() => markTodoDone(todo.id)}
        checked={todo.isCompleted}
      />
      {isEditing ? (
        <input
          type="text"
          onChange={(e) => setTodoText(e.target.value)}
          value={todoText}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      <button onClick={() => deleteTodoFn(todo.id)}>Delete</button>
    </div>
  );
}

export default Todo;
