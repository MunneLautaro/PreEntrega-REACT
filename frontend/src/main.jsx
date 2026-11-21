import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "./providers/CartProvider.jsx"
import { ConfirmProvider } from "./providers/ConfirmProvider.jsx"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </CartProvider>
  </BrowserRouter>,
)
