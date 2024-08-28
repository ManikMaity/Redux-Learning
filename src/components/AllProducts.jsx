import React, { useState } from 'react'
import { useGetAllProductsQuery } from '../app/service/dummyData'
import { useNavigate, useNavigation } from 'react-router-dom';

function AllProducts() {

    const {data, isError, isLoading} = useGetAllProductsQuery();
    const navigator = useNavigate();

    function handleProductClick(id) {
      navigator(`product/${id}`);
    }


  return (
    <div>
      <p>All products</p>
      {isError && <div>Error!</div>}
      {isLoading && <div>Loading...</div>}
      {data && data?.products.map((product, index)  => <li onClick={() => handleProductClick(product.id)} key={product.id || index}>{product?.title}</li>)}
    </div>
  )
}

export default AllProducts
