import { Routes,Route } from "react-router-dom"
import Layout from "./Layout"
import ProductForm from "./ProductForm"
import ProductsList from "./ProductsList"
import Success from "./Components/Success"
import Cancel from "./Components/Cancel"
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>} >
        <Route index element={<ProductForm/>} />
        <Route path="/list" element={<ProductsList/>}  /> 
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
