import React, { useContext, useState } from "react";
import todoContext from "../../context/todoContext";
import { useDispatch } from "react-redux";

function AddTodo() {

  const dispatch = useDispatch()

  const [todoText, setTodoText] = useState("");

  function addNewTodo(text) {
    dispatch({ type: "add_todo", payload: { todoText: text } });
  }

  return (
    <form className="addTodo">
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Enter todo here ..."
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          addNewTodo(todoText);
          setTodoText("");
        }}
      >
        Add Todo
      </button>
    </form>
  );
}

export default AddTodo;
