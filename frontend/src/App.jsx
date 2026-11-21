import "./App.css"
import Layout from "./components/Layout/Layout"
import ProductListContainer from "./components/Products/ProductListContainer/ProductListContainer"
import ProductFormContainer from "./components/Products/ProductFormContainer/ProductFormContainer"
import ProductDetail from "./components/Products/ProductDetail/ProductDetail"
import Cart from "./components/Cart/Cart"
import GestionCupones from "./components/GestionCupones/GestionCupones"
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
        className="toast-container"
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductListContainer />} />
          <Route path="/addProduct" element={<ProductFormContainer />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/cupones" element={<GestionCupones />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
