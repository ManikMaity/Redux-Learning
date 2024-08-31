import { combineReducers, createStore } from "redux";
import TodoReducer from "../reducer/TodoReducer";


const reducer = combineReducers({todos : TodoReducer});
const store = createStore(reducer);

export default store;