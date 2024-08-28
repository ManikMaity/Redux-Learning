
import './App.css'
import AllProducts from './components/AllProducts'
import Counter from './components/Counter'

const style = {
  display : "flex",
  flexDirection : "column",
  gap : "10px"
}

function App() {

  return (
    <div style={style}>
      <Counter/>
      <AllProducts/>
    </div>
  )
}

export default App
