import React from "react";
import "./counter.css";

// import for redux
import {useSelector, useDispatch} from "react-redux"
import {increment, decrement} from "../app/features/counter/counterSlice"


function Counter() {

    // Read the value from the store
    const count = useSelector((state) => state.counter.value);

    // changing the data by sending `actions` to the store
    const dispatch = useDispatch();

  return (
    <div className="counter">
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default Counter;
