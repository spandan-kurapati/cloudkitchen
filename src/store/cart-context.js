import React from "react";

// Creating a context for managing the cart state
const CartContext = React.createContext({
    items:[],
    totalAmount : 0,
    addItem : (item)=>{},
    removeItem:(id)=>{},
   // cartCtx:(CartContext)=>{},
})

export default CartContext;