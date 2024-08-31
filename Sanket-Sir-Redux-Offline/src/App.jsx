import "./App.css";
import TodoList from "./components/TodoList/TodoList";
import AddTodo from "./components/AddTodo/AddTodo";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {

  return (
    <>
    <Provider store={store}>
        <AddTodo />
        <TodoList />
      </Provider>
    </>
  );
}

export default App;
