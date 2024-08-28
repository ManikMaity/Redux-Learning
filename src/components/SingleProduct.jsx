import React from 'react'
import { useParams } from 'react-router-dom';
import {useGetProductByIdQuery} from "../app/service/dummyData"

function SingleProduct() {

  const {id} = useParams();
  const {data, isLoading, isError} = useGetProductByIdQuery(id);
  console.log(data?.images[0])
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <div>
      <img style={{height: "100px", width : "100px"}} src={data?.images[0]} alt="my" />
      {data?.title}
    </div>
  )
}

export default SingleProduct;
