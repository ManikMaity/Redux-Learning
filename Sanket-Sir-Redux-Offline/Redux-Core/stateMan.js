import { bindActionCreators, combineReducers, createStore } from "redux";

// making variable for each action type make code more readable and prevent error
const ADD_TODO = "ADD_TODO";
const EDIT_TODO = "EDIT_TODO";
const DELETE_TODO = "DELETE_TODO";
const MARK_TODO = "MARK_TODO";
const ADD_USER = "ADD_USER";



function TodoReducer(state = [], action) {
  if (action.type == ADD_TODO) {
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
  } else if (action.type == EDIT_TODO) {
    const newTodos = state.map((todo) => {
      if (todo.id == action.payload.id) {
        todo.text = action.payload.newText;
      }
      return todo;
    });

    return newTodos;
  } else if (action.type == DELETE_TODO) {
    return state.filter((todo) => todo.id != action.payload.id);
  } else if (action.type == MARK_TODO) {
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

function UserReducer (state = [], action){
    if (action.type == ADD_USER){
        return [...state, action.payload.user];
    }

    return state;
}

// combine reducers 
const reducer = combineReducers({users : UserReducer, todos : TodoReducer});


const store = createStore(reducer); //create a store
console.log(store);

store.dispatch({type : ADD_TODO, payload : {todoText : "Todo1"}}); // same as usereducer dispatch

//wraping the action obj inside the fn ---> action creator
const addTodo = (text = "") => {
    return {type : ADD_TODO, payload : {todoText : text}};
}

const deleteTodo = (id) => {
    return {type : DELETE_TODO, payload : {id : id}}
}

const addUser = (user) => {
    return {type : ADD_USER, payload : {user : user}}
}


// it bind the addTodo and delete todo with store dispatch to action obj
const action = bindActionCreators({addTodo, deleteTodo, addUser}, store.dispatch);
action.addTodo("Todo 3");
action.addUser("Manik")


store.dispatch(addTodo("Todo2"))
store.dispatch(deleteTodo(1));



console.log(store.getState()); // get the state

