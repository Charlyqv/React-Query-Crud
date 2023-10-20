import Products from "./components/Products";
// import { Products, updateProductMutation } from "./components/Products";
import ProductForm from "./components/ProductForm";
import { useState } from "react";

const App = () => {
  const [valor, setValor] = useState(null);
  return (
    <>
      <ProductForm valor={valor}/>
      <Products setValor={setValor}/>
    </>
  )
}

export default App