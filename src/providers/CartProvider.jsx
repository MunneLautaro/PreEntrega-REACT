import { useState } from "react"
import { CartContext } from "../contexts/CartContext"

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product, quantity) => {
    const itemInCart = cart.find((item) => item.id === product.id)
    if (itemInCart) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      )
      setCart(updatedCart)
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity }])
    }
  }

  const removeOneFromCart = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
    )
    setCart(updatedCart.filter((item) => item.quantity > 0))
  }

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId)
    setCart(updatedCart)
  }

  const clearCart = () => setCart([])
  const getCartQuantity = () =>
    cart.reduce((acc, item) => acc + item.quantity, 0)
  const getCartTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        getCartQuantity,
        getCartTotal,
        removeFromCart,
        removeOneFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
