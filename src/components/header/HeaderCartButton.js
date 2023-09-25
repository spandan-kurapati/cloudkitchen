import React, { useContext } from 'react'
import './HeaderCartButton.css'
import CartIcon from '../cart/CartIcon'

import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {

// Access the cart context
  const cartCtx = useContext(CartContext)

// Calculating the total number of items in the cart
  const numeberOfCartItems = cartCtx.items.reduce((accumalator,item)=>{
    return accumalator + item.amount
  },0)

  // Rendering the cart button with the cart icon and item count
  return (
   <button onClick={props.onClick} className='button'>
    <span className='icon'>
       <CartIcon/>
    </span>
    <span>
        Your Cart
    </span>
    <span className='badge'>{numeberOfCartItems}</span>
   </button>
  )
}

export default HeaderCartButton