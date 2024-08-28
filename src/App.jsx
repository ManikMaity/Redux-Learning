
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AllProducts from './components/AllProducts'
import Counter from './components/Counter'
import Layout from './components/Layout'
import SingleProduct from './components/SingleProduct'

const style = {
  display : "flex",
  flexDirection : "column",
  gap : "10px"
}

const router = createBrowserRouter([
  {
    element : <Layout/>,
    children : [
      {
        path : "/",
        element : <AllProducts/>
      },
      {
        path : "/product/:id",
        element : <SingleProduct/>
      },
      {
        path : "/counter",
        element : <Counter/>
      }
    ]
  }
])

function App() {
  

  return (
    <div style={style}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
