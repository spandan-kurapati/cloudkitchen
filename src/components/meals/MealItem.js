import React, { useCallback, useContext } from 'react'
import './MealItem.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../store/cart-context'

const MealItem = (props) => {

   // Access the cart context
   const cartCtx = useContext(CartContext)
   
   // Handler to add an item to the cart
const addToCartHandler =(amount)=>{
  cartCtx.addItem({
    id :props.id,
    name:props.name,
    amount : amount,
    price : props.price
   })

}
   
// Formats the price
  const price = `Rs ${props.price.toFixed(2)} /-`

  // Render a meal item with its details and a form for adding to the cart
  return (
    <li className='meal'>
        <div>
            <h3>{props.name}</h3>
            <div className='description'>{props.description}</div>
            <div className='price'>{price}</div>
        </div>
        <MealItemForm onAddToCart={addToCartHandler}/>
    </li>
    
  )
}

export default MealItem