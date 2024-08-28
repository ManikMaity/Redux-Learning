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
