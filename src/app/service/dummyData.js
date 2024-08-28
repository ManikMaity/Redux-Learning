import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath : "products",
    baseQuery : fetchBaseQuery({baseUrl : 'https://dummyjson.com'}),
    endpoints : (builder) => ({
        // get all the products (Reading the data thatwhy .query)
        getAllProducts : builder.query({
            query : () => "/products"
        }),

        // anoter endpoint
        
    }),
})

export const {useGetAllProductsQuery} = productApi;