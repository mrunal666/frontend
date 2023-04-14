import React, { createContext, useState } from "react";
export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [items, setItems] = useState([]);

  async function addItemToCart(id) {
    // Fetch data from external API
    const res = await fetch(`http://localhost:8080/api/product/${id}`);
    const product = await res.json();
    const productObj = product.pop();
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id == id);

      if (!item) {
        return [
          ...prevItems,
          {
            id,
            qty: 1,
            name: productObj.name,
            description: productObj.description,
            image: productObj.product_img,
            totalPrice: parseInt(productObj.price),
          },
        ];
      } else {
        return prevItems.map((item) => {
          if (item.id == id) {
            item.qty++;
            item.totalPrice += parseInt(productObj.price);
          }
          return item;
        });
      }
    });
  }
  function getItemsCount() {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }

  function getTotalPrice() {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  function getQuantity() {
    return items.length;
  }

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        getItemsCount,
        addItemToCart,
        getTotalPrice,
        getQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
