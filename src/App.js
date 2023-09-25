import { useState } from 'react';
import './App.css';
import Cart from './components/cart/Cart';
import Header from './components/header/Header';
import Meals from './components/meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
// Managing the cart visibility state with a state variable
  const [cartIsShown,setCartIsShown] = useState(false)
const [numberOfCartItems, setNumberOfCartItems]= useState()
// Handlers for showing and hiding the cart
  const showCartHandler = ()=>{
    setCartIsShown(true)
  }
  const hideCartHandler = ()=>{
    setCartIsShown(false)
  }

  // Function to reset the cart count
  const resetCartCount = (count) => {
    setNumberOfCartItems(count);
    console.log();
  };


  // Return the main layout with header, meals, and cart components
  return (
    <CartProvider>
    {cartIsShown && <Cart onClose={hideCartHandler} resetCartCount={resetCartCount} cartStatus={hideCartHandler}/>}
    <Header onShowCart={showCartHandler} numberOfCartItems={numberOfCartItems} />
    <main>
      <Meals/>
    </main>
    </CartProvider>
  );
}

export default App;
