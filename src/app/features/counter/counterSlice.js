import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name : "counter",

    initialState : {value : 0},

    // Althugh we are mutating our state but it will trigger render
    reducers : {
        increment : (state) => {
            state.value += 1;
        },
        decrement : (state) => {
            state.value -= 1;
        }
    }
});

export const {increment, decrement} = counterSlice.actions;
export default counterSlice.reducer;