import React, { useRef, useState } from 'react'
import Input from '../UI/Input'

const MealItemForm = (props) => {
  const amountInputRef = useRef()
  const [amountIsValid,setAmountIsValid] = useState(true)

  // Handler for submitting the form and adding an item to the cart
  const submitHandler=(event)=>{
    event.preventDefault()
    const enteredAmount = amountInputRef.current.value ;
    const enteredAmountNumber = +enteredAmount
    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber >5){
      setAmountIsValid(false);
      return ;
    }
    props.onAddToCart(enteredAmountNumber)

  }

  // Rendering a form with an input for the quantity and an "Add" button
  return (
    <>
    {!amountInputRef && <p>Entered amount is not valid</p> }
   <form className='form' onSubmit={submitHandler}>
   <Input ref={amountInputRef} label='Amount' input={{
    id:Math.random(), type:'number' , min:'1' ,max:'50',step:'1',defaultValue:'1'
   }} />
    <button>+Add</button>
   </form>
   </>
  )
}

export default MealItemForm

//This component represents the form used to specify the quantity of a meal item before adding it to the cart. It includes an input field for the quantity and an "Add" button.