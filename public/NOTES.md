# Redux - (Toolkit + Core)

## Resouces 
- [HuXn WebDev Yt - Redux](https://www.youtube.com/watch?v=CI8VeG0GI-M)


## Notes + Key Concept

### Redux Toolkit

#### Installing redux toolkit & React Redux
```
npm install @reduxjs/toolkit react-redux
```
#### Store
Store is the central place where the app sate is strored. 

#### Creating a store
- Make a `app` folder inside the src and make `store.js` file.
- We have to import `configureStore` fn from redux toolkit and pass an obj with reducer as a argument.
- We can store it in a variable and export it.

```js
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer : {

    }
})
```
#### Providing the store to react componets 
- Go to main component
- import the `store` you made and `<Provider>` component of react-redux and wrap the app with `Provider` componet and pass the store value in it;
```js
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

```

#### Slice
- Piece of store state
- smaller part of antire state and instuction how to change that specific state.
- Make a folder named `features` inside the `app` and inside features make `counter` folder.
- Inside `counter` folder make the slice `counterSlice.js` file.
- we have to import `createSlice` fn and pass a obj.
- the obj have name, initialState, and reducers
- Initial state is a obj with `key(name)` and `value(inital value, all types)`
- reduers will take function to `change or updated` the value, it called `actions`
- we have to export counterSlice which store the createSlice fn return.
- have to export action functions using `counterSlice.actions` destrucring.
- defoult export `counterSlice.reducers`

```js
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
```

#### Binding the slice to store
- We have to import default export of `counterSlice` which is `counterSlice.reducer` as counterReducer inside store.
- Then we have pass it with a key (counter) inside reducer obj.

```js
import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./features/counter/counterSlice"

export const store = configureStore({
    reducer : {
        counter : counterReducer,
    },
})
```

#### Using Redux state and actions in react component
- import `useSelector and useDepatch` hook form react-redux inside component
- import `increment and decrement` from the counterSlice
- `useSelector` help us to read the data from redux store.
- `useDepatch` .... change data in redux store using actions.
- we have to get the initial value using useSelector which take a fn.


```js
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

```
### RTK Query
1. Install Redux Toolkit and React Redux.
2. Create a store and configure it using `configureStore`.
3. Provide the store to the entire application using the `<Provider>` component.
- (Same As before)

#### Create a service 
- Inside the app make `service` make a `dummyData.js` file.
- Wite a code like this --
```js
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath : "products",
    baseQuery : fetchBaseQuery({baseUrl : 'https://dummyjson.com'}),
    endpoints : (builder) => ({
        // get all the products (Reading the data thatwhy .query)
        getAllProducts : builder.query({
            query : () => "/products"
        }),
    }),
})

export const {useGetAllProductsQuery} = productApi;
```

#### Register service inside Store
```js
import { configureStore } from "@reduxjs/toolkit"
// import counterReducer from "./features/counter/counterSlice"
import { setupListeners } from "@reduxjs/toolkit/query"
import { productApi } from "./service/dummyData"

export const store = configureStore({
    reducer : {
        [productApi.reducerPath] : productApi.reducer,
        // counter : counterReducer,
    },

    // dont worry about
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productApi.middleware),
})


setupListeners(store.dispatch);
```
#### Using RTX query inside compoent 
```js
import React from 'react'
import { useGetAllProductsQuery } from '../app/service/dummyData'

function AllProducts() {

    const {data, isError, isLoading} = useGetAllProductsQuery();


  return (
    <div>
      <p>All products</p>
      {isError && <div>Error!</div>}
      {isLoading && <div>Loading...</div>}
      {data && data?.products.map((product, index)  => <li key={product.id || index}>{product?.title}</li>)}
    </div>
  )
}

export default AllProducts

```
#### Creating another endpoint in productApi

```js
export const productApi = createApi({
    reducerPath : "products",
    baseQuery : fetchBaseQuery({baseUrl : 'https://dummyjson.com'}),
    endpoints : (builder) => ({
        // get all the products (Reading the data thatwhy .query)
        getAllProducts : builder.query({
            query : () => "/products"
        }),

        // anoter endpoint
        getProductById : builder.query({
            query : (id) => `/products/${id}`
        })
    }),
})

export const {useGetAllProductsQuery, useLazyGetProductByIdQuery} = productApi;
```

#### use new Query to get single product data
```js
import React from 'react'
import { useParams } from 'react-router-dom';
import {useGetProductByIdQuery} from "../app/service/dummyData"

function SingleProduct() {

  const {id} = useParams();
  const {data, isLoading, isError} = useGetProductByIdQuery(id);
  console.log(data?.images[0])
  return (
    <div>
      <img style={{height: "100px", width : "100px"}} src={data?.images[0]} alt="my" />
      {data?.title}
    </div>
  )
}

export default SingleProduct;

```
## Projects