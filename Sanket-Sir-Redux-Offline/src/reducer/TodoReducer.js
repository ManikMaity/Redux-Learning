export default function TodoReducer(state = [], action) {
  if (action.type == "add_todo") {
    if (action.payload.todoText.trim() === "") {
      return;
    }
    return [
      ...state,
      {
        id: state.length + 1,
        text: action.payload.todoText,
        isComplete: false,
      },
    ];
  } else if (action.type == "edit_todo") {
    const newTodos = state.map((todo) => {
      if (todo.id == action.payload.id) {
        todo.text = action.payload.newText;
      }
      return todo;
    });

    return newTodos;
  } else if (action.type == "delete_todo") {
    return state.filter((todo) => todo.id != action.payload.id);
  } else if (action.type == "mark_todo") {
    const newTodos = state.map((todo) => {
      if (todo.id == action.payload.id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    return newTodos;
  }

  return state;
}
