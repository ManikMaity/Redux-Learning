import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./features/counter/counterSlice"
import { setupListeners } from "@reduxjs/toolkit/query"
import { productApi } from "./service/dummyData"

export const store = configureStore({
    reducer : {
        [productApi.reducerPath] : productApi.reducer,
        counter : counterReducer,
    },

    // dont worry about
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productApi.middleware),
})


setupListeners(store.dispatch);