import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import "./Cart.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import axios from 'axios';
import App from "../../App";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const [isOrdering, setIsOrdering] = useState(false);
  const [errors, setErrors] = useState({});
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);
 // const cartIsShown = useContext(App);
 //const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const handleCustomerDetailsChange = (event) => {
    const { name, value } = event.target;
    setCustomerDetails((prevCustomerDetails) => ({
      ...prevCustomerDetails,
      [name]: value,
    }));
  };

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const orderHandler = () => {
    setIsOrdering(true);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // Validate the form
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Prepare the data to be sent to the database
    const orderData = {
      customerDetails: customerDetails,
      orderedItems: cartCtx.items,
    };

    try {
      // Send a POST request to your Firebase database
      const response = await axios.post(
        'https://cloud-kitchen-9d689-default-rtdb.firebaseio.com/order.json',
        orderData
      );

      console.log('Order successfully submitted:', response.data);

      // Clear the form and cart after successful submission
      setCustomerDetails({
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });
      
      // Clear the cart items
    // cartCtx.clearCart();

    // Set the numberOfCartItems to zero to reset the cart count
    props.resetCartCount(0);
      setIsOrdering(false);
      setIsOrderSuccessful(true);
       //close cart after Show success message
      setTimeout(() => {
      
      props.cartStatus();
      },2000)
      //cartIsShown.hideCartHandler();
      

      // Close the order form after a few seconds
      // setTimeout(() => {
      //   setIsOrdering(false);
      //   setIsOrderSuccessful(false);
      // }, 3000); // Hide the success message after 3 seconds
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!/^[A-Za-z\s]+$/.test(customerDetails.name)) {
      validationErrors.name = "Name should contain only Alphabets.";
    }

    if (!/^[A-Za-z\s]+$/.test(customerDetails.city)) {
      validationErrors.city = "City should contain only Alphabets.";
    }

    if (!/^[A-Za-z\s]+$/.test(customerDetails.state)) {
      validationErrors.state = "State should contain only Alphabets.";
    }

    if (!/^\d{6}$/.test(customerDetails.pincode)) {
      validationErrors.pincode = "Pincode should be 6 digits.";
    }

    return validationErrors;
  };

  return (
    <div>
      
        <Modal onClose={props.onClose}>
          {cartItems}
          <div className="total">
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className="actions">
            <button onClick={props.onClose} className="button--alt">
              Close
            </button>
            {cartCtx.items.length > 0 && (
              <button onClick={orderHandler} className="button">
                Order
              </button>
            )}
          </div>

          {isOrdering && (
            <form className="order-form" onSubmit={submitHandler}>
              <div className="form-control">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customerDetails.name}
                  onChange={handleCustomerDetailsChange}
                  required
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className="form-control">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={customerDetails.address}
                  onChange={handleCustomerDetailsChange}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={customerDetails.city}
                  onChange={handleCustomerDetailsChange}
                  required
                />
                {errors.city && <p className="error">{errors.city}</p>}
              </div>
              <div className="form-control">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={customerDetails.state}
                  onChange={handleCustomerDetailsChange}
                  required
                />
                {errors.state && <p className="error">{errors.state}</p>}
              </div>
              <div className="form-control">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={customerDetails.pincode}
                  onChange={handleCustomerDetailsChange}
                  required
                />
                {errors.pincode && <p className="error">{errors.pincode}</p>}
              </div>
              <div className="form-actions">
                <button type="submit" className="button">
                  Confirm Order
                </button>
              </div>
            </form>
          )}

          {isOrderSuccessful && (
            <div className="success-message">
            <p>Successfully ordered!</p>
            <span className="checkmark">&#10004;</span>
            </div>
          )}
        </Modal>
     
    </div>
  );
};

export default Cart;
